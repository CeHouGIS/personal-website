# 需求文档：城市视觉基因组 (Urban Visual Genome) 自动化流水线实现

## 1. 项目概况
**目标**：构建一个端到端的地理空间视觉分析流水线，利用 Google Street View (GSV) 图像提取城市“视觉基因”，并通过多级聚类、空间插值和主题建模（LDA）揭示城市空间结构。
**执行环境**：
- **Language**: Python 3.10
- **OS**: Linux (Ubuntu)
- **Hardware**: NVIDIA GPU (RTX 3060 12GB) 必选
- **Core Stack**: PyTorch, GeoPandas, Scikit-Learn, libpysal, Shapely, Plotly

---

## 2. 全局技术规范
1. **代码风格**：严格遵守 PEP8 规范，所有函数需包含 Type Hints 及详细的中文 Docstring。
2. **显存管理**：在切换深度学习模型或处理大规模数据时，必须显式调用 `del model` 和 `torch.cuda.empty_cache()`。
3. **工程化结构**：
   - 根目录：`/workplace/urban_visual_gene/`
   - 结果目录：`/workplace/urban_visual_gene/results/`
   - 脚本命名：`stageX_description.py`
4. **异常处理**：所有文件 IO 需包含 `try-except` 逻辑，且在程序启动时自动创建不存在的输出目录。

---

## 3. 阶段性开发任务

### 阶段一：多模型深度特征提取 (Feature Extraction)
**目标**：集成 5 种基础模型，提取 GSV 图像的全局特征向量。
1. **模型库集成**：
   - `ResNet-50` / `ViT-B/16`: 使用 torchvision 官方权重。
   - `STCL`: 需手动加载权重路径 `/workplace/urban_visual_gene/models/STCL/Mocov3VITB-lr-self.pth.tar`，并处理 MoCo-v3 前缀。
   - `DINOv2` / `DINOv3`: 使用 `torch.hub` 加载。
2. **功能要求**：
   - 实现 `--model all` 或指定单个模型的 CLI 参数。
   - 默认使用 **DINOv3** 作为下游任务输入。
   - 每 5000 张图像保存一个 Part CSV，格式：`{City}_SV-{Model}_angle_{angle}_part{X}.csv`。
   - 输出维度：768 (或模型特定) + 1 (Index)。
   - 依次使用五种模型完成测试，提取出来的特征分别保存。

### 阶段二：空间匹配、特征融合与视觉碱基 (Spatial Fusion & Point/N-gram Analysis)

**任务 A：四种特征融合模块实现 (`svi_spatial_fusion.py`)**
实现以下 4 种 `nn.Module`，统一输入 Shape `[B, 4, D]`，输出 `[B, D]`：
1. `ConcatFusion`: 在特征维度拼接后，通过包含 LayerNorm 和 ReLU 的 MLP 降维回 `D` 维。
2. `BiLSTMFusion`: 将 4 个视角视为序列，输入双向 LSTM，提取最后的隐藏层状态并映射。
3. `TransformerPEFusion`: 加入可学习的绝对位置编码（代表 0°/90°/180°/270°），通过 TransformerEncoder 进行自注意力聚合。
4. `CircularConvFusion`: 使用 **环形卷积 (Circular Padding)** 处理 270° 与 0° 视角的物理空间首尾邻接性，后接全局池化。
*验收*：必须生成测试报告并写入 `/workplace/urban_visual_gene/results/fusion_test_results.txt`，记录各模块的 Trainable Parameters 数量和输出维度验证。

**任务 B：点级聚类分析与空间分布可视化**
1. **降维**：使用 `IncrementalPCA` 将 23,047 个街景点的融合特征降至 96 维。
2. **软聚类**：随机采样 15% 的特征训练 GMM (K=20)，随后对全量点调用 `.predict_proba()` 输出软分配概率 (Soft Assignment)。
3. **可视化绘图**：绘制点级聚类结果的地理分布图。
   - **图层结构**：底层垫入全量路网（线条设为灰色 `color='gray'`, `alpha=0.3`, `linewidth=0.5`）；上层叠加街景点。
   - **视觉映射**：提取每个点概率分布的最大值（`argmax`）作为其主要类别（用于决定点的颜色分类 `cmap='tab20'`）；提取该最大概率的具体数值作为权重（用于决定点的透明度 `alpha` 或大小 `markersize`，概率越高越清晰/越大）。
   - **保存路径**：程序需检查并创建目录，将高分辨率图像保存至 `/workplace/urban_visual_gene/results/figs/point_clusters_map.png`（及 `.pdf` 格式）。

**任务 C：地理挂载与 N-gram 序列提取**
1. **空间挂载**：将 23,047 个全景点通过 `gpd.sjoin_nearest` 挂载至路网（`edges.shp`），最大容差限值设定为 50m。
2. **视觉碱基定义**：
   - 采样 10% 数据训练 `MiniBatchKMeans(n_clusters=50)`，作为城市的“视觉碱基”。
   - 预测全量挂载点的 `base_id` (范围 0~49)。
3. **N-gram 特征生成**：
   - 对于每条路段，提取其挂载的所有街景点。
   - 取每个点 GMM 软分配概率的最大值（`argmax`）对应的类别作为该点的硬标签。
   - 按照点在路段上的几何投影顺序（空间序列），统计相邻点类别的 **共现频率 (Co-occurrence Frequency)**。
   - 生成展平后的 2500 维（50 × 50 转移矩阵）特征向量，作为该路段的聚合视觉特征。

---

### 阶段三：多级聚类分析 (Multi-level Clustering)

**3A：路段级聚类与平滑**
1. **预处理**：对路段的 2500 维 N-gram 特征使用 `StandardScaler` 标准化，并通过 **PCA 降维至 50 维**，以解决高维全协方差矩阵奇异问题。
2. **模型寻优**：在 K ∈ {5, 10, 15, 20} 中分别训练 GMM，严格基于 **BIC 准则 (Bayesian Information Criterion)** 自动选定最优 K 值，并输出评估对比报告。
3. **空间概率平滑**：利用 `libpysal.weights` 构建路段的 KNN (k=10) 空间权重矩阵（需行归一化），执行马尔可夫空间概率传播：$P_{smooth} = (1-\alpha)P_{raw} + \alpha(W \cdot P_{raw})$。
4. **可视化绘图**：绘制平滑后的路段级聚类地图。
   - **图层结构**：以全量未匹配路网作为底图垫底（设定为淡灰色 `alpha=0.3`）。
   - **上层覆盖**：将有聚类标签的路段叠加在上方，按最优 K 的硬标签分类着色（赋予鲜明的定性 Colormap）。
   - **保存路径**：保存至 `/workplace/urban_visual_gene/results/figs/street_clusters_map.png`。

### 阶段四：空间插值传播 (Spatial Interpolation & GNN Imputation)
**目标**：在避免“特征过度平滑”的前提下，利用路网拓扑和（未来的）多源观测数据，将视觉聚类概率传播至全量未覆盖路网。

**方案 A：基于拓扑与阻尼的标签传播 (Label Spreading) —— 【当前执行方案】**
1. **Step 4A.1 提取质心与基础邻接**：计算全量路段（33,010条）的几何质心（Centroid）。使用 `libpysal.weights.Rook.from_dataframe` 或基于 Buffer 相交构建初始邻接关系。
2. **Step 4A.2 构建高斯距离权重矩阵 (RBF Kernel)**：
   - 计算相邻路段质心间的欧氏距离 $d_{ij}$。
   - 利用高斯核函数 $W_{ij} = \exp(-d_{ij}^2 / 2\sigma^2)$ 转化为权重（建议带宽 $\sigma=100m$），并进行行归一化。
3. **Step 4A.3 道路等级衰减 (可选)**：若 shp 文件含道路等级字段，对不同等级道路间的边权重 $W_{ij}$ 乘以 0.5 惩罚系数，降低跨等级语义污染。
4. **Step 4A.4 带有阻尼的标签传播 (Label Spreading)**：
   - 采用半监督标签传播阻尼迭代逻辑：`P_new = alpha * (W @ P_old) + (1 - alpha) * P_initial`。
   - 设定 `alpha = 0.8`，迭代至前后两次矩阵的 Frobenius 范数误差 `< 1e-4` 或达到最大迭代次数（50 轮）时收敛。

**方案 B：基于多源遥感与图神经网络 (GNN) 的特征补全 —— 【Future Work / 暂缓执行】**
*注意：此为预留方案，代码编写时请在此处预留抽象类或接口，但在本次自动化流程中不要主动调用，待 Sentinel-2 数据就位后激活。*
1. **Step 4B.1 遥感特征提取 (Node Features)**：对所有路段生成 50m 缓冲区，裁剪对应区域的 Sentinel-2 多光谱遥感影像。提取地表覆盖特征（如 NDVI, NDBI）或通过预训练视觉模型提取宏观表征。
2. **Step 4B.2 多模态构图 (Graph Construction)**：以路段为图节点，以空间邻接性和“遥感特征相似度（Cosine Similarity）”共同作为边的权重，构建包含宏观地块关联的异构图。
3. **Step 4B.3 GNN 训练与推断**：构建 GraphSAGE 或 GAT (Graph Attention Network) 模型。将 Phase 3 获得的有 SVI 覆盖的 3,717 条路段的标签作为监督信号，通过消息传递机制，推断全网其余无街景覆盖路段的视觉碱基概率分布。

**输出**：`stage4_output/full_network_interpolated.geojson`（当前阶段由方案 A 输出），并将这个结果在地图上绘制。

### 阶段五：街区边界序列提取与主题建模 (LDA Blocks)
**目标**：将街区视为由周边道路围合而成的“句子”，提取构成街区物理边界的街道视觉聚类序列，构建空间词袋并进行 LDA 主题揭示。

1. **街区切分 (Polygonization)**：
   - 提取全量路网的端点（Nodes），对线段几何进行 5m 的 Buffer 延伸以闭合微小的拓扑悬缺。
   - 执行 `shapely.ops.polygonize` 将路网转化为闭合多边形。
   - 面积过滤：保留面积在 1,000 平方米到 5,000,000 平方米之间的有效物理街区，如果有太小的多边形，将他与相邻的多边形合并，直至有1000平方米。

2. **顺时针围合序列与空间二元词袋构建 (Boundary Sequence & Spatial Bigram BoW)**：
   - **边界提取**：遍历每个街区多边形，提取其外部边界环（`polygon.exterior`）。
   - **拓扑匹配**：通过空间相交，找出构成该街区边界的所有路段（Edges）。
   - **顺时针序列构建**：按照多边形外部环的几何坐标顺序，将匹配到的路段的聚类标签（`Cluster_ID`，0~14）提取出来，形成该街区的边界“视觉词汇序列”（例如：`[3, 7, 7, 2]`）。由于街区是闭合的，需将序列首尾相接处理为环形序列。
   - **频次统计（二元衔接关系 / Spatial Bigram Counts）**：为了捕捉路段间的位置衔接关系，放弃孤立统计单个路段。将当前路段与其**顺时针紧邻的下一条路段**组成一个“视觉特征对”（Pair/Bigram）。例如，环形序列 `[3, 7, 7, 2]` 将产生组合对：`(3,7), (7,7), (7,2), (2,3)`。
   - **生成整数矩阵**：统计每个街区边界上各类“相邻特征对”出现的绝对频次。此时，空间词汇表从 15 种单一路段，扩展为 $15 \times 15 = 225$ 种“衔接路段对”。由此生成的 `[N_blocks, 225]` 特征矩阵天然为非负整数矩阵，不仅完美符合 LDA 模型输入要求，更在底层数据结构中硬编码了街道的“空间句法（Spatial Syntax）”。
  
3. **LDA 建模与主题提取**：
   - **模型配置**：输入上述基于围合边界生成的整数词频矩阵。实例化 `LatentDirichletAllocation(n_components=8, max_iter=100, random_state=42)`。
   - **特征输出**：拟合后，获取每个街区在 8 个主题上的概率分布向量，并使用 `argmax` 提取概率最高的主题作为该街区的 `dominant_topic`。
   - **保存数据**：将主题分布矩阵、主导主题字段，以及**新生成的边界顺时针序列（以字符串或数组形式）**合并回街区 GeoDataFrame，统一保存至 `/workplace/urban_visual_gene/results/stage5_output/block_topics.geojson`。同时导出 `lda_topic_components.csv`（展示 8 个主题与 15 种边界路段聚类的权重对应关系），并帮我把结果画图绘制。
、
### 阶段六：可视化 (Sankey Diagram)
使用 `Plotly` 构建交互式 Sankey 图，展示：
- **层级 1**：点级聚类 (20个节点)
- **层级 2**：路段级聚类 (15个节点)
- **层级 3**：街区主题 (8个节点)
- 保存为 `interactive_sankey.html`。

---

## 4. 关键数据字典
- **输入数据**：
  - GSV 图像目录：`data/images/`
  - 路网文件：`data/network/edges.shp` (EPSG:4326)
  - 坐标参考系：需统一投影至 `EPSG:32633` (UTM Zone 33N)。
- **输出格式**：
  - 特征数据：CSV / `.pt`
  - 地理数据：GeoJSON (需包含 WGS84 经纬度便于可视化)
  - 模型文件：`.pkl` 或 `.pth`

---

## 5. 验收标准
1. **Phase 1**: 有效行数 23,047，特征维度正确。
2. **Phase 2**: 生成 1.3GB 的 N-gram GeoJSON，特征字段完整。
3. **Phase 4**: 插值后全量路段（33,010）标签覆盖率为 100%。
4. **Phase 6**: 生成可交互 HTML，且节点间流量逻辑符合空间归属关系。

---

**请 Claude Code 根据上述需求，逐阶段编写 Python 脚本并执行。**