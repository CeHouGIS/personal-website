import { Icons } from "@/components/icons";

export const BLUR_FADE_DELAY = 0.05;

export const DATA = {
  // Website data
  url: "https://www.zangwei.dev", // Use 'www' for vercel recommendation
  lastUpdated: "Oct 2025",
  avatarUrl: "/me.png",
  navbar: [
    { href: "/", icon: Icons.home, label: "Home" },
    { href: "/blog", icon: Icons.notebook, label: "Blog" },
    { href: "/resume.pdf", icon: Icons.fileuser, label: "CV" },
  ],
  // Blog info
  blogDescription:
    "Thoughts on AI, software, life and more. Short notes and longer write-ups.",
  blogCharacter: "Z",
  blogInfo: {
    // For OpenGraph image generation
    "bp-deduction": {
      title: "A Detailed Derivation of Backpropagation",
    },
    "proj-came": {
      title:
        "CAME Optimizer: Adam Performance with Adafactor Memory Requirements",
    },
    "proj-infobatch": {
      title: "InfoBatch: Dataset Pruning on the Fly",
    },
    "proj-sequence-schedule": {
      title: "Can We Use LLMs Itself to Speed Up LLM Inference?",
    },
    "proj-zscl": {
      title:
        "ZSCL: Fine-tuning Vision-Language Models without Zero‑Shot Transfer Degradation",
    },
    "note-aievaluation": {
      title: "Evaluation as Creation: How AI is Redefining Human Productivity",
    },
  },
  // Generel data
  name: "Zangwei Zheng",
  subtitle: "郑奘巍, Ph.D.",
  description: "Full Stack Developer & AI Researcher\nTech Lead at HPC-AI Tech",
  summary:
    "Hi, I'm Zangwei👋, founder of [Open-Sora](https://github.com/hpcaitech/Open-Sora) and [VideoOcean](https://video-ocean.com/). I'm working on AI-powered video generation and SaaS products that bridge research and real-world creativity.\n\nI earned my Ph.D. from ![NUS Logo](/icon/nus.png) [National University of Singapore](https://nus.edu.sg/) (NUS), advised by Prof. [Yang You](https://scholar.google.com/citations?user=jF4dPZwAAAAJ&hl=en). I had my research intern in ![Bytedance Logo](/icon/bytedance.png) [Bytedance](https://bytedance.com/), mentored by [Xuan Zhou](https://scholar.google.com/citations?user=gSqwyvsAAAAJ&hl=en) and [Youlong Cheng](https://scholar.google.com/citations?user=CSTk_LMAAAAJ&hl=en). I received my B.Sc. in Computer Science from ![NJU Logo](/icon/nju.png) [Nanjing University](https://www.nju.edu.cn/en/) (NJU). I worked remotely as a research intern at ![UC Berkeley Logo](/icon/ucb.png) [UC Berkeley](https://www.berkeley.edu/) for a year, mentored by Dr. [Xiangyu Yue](https://scholar.google.com/citations?user=-xQ-C1sAAAAJ&hl=en&authuser=1) and Prof. [Alberto L. Sangiovanni-Vincentelli](https://www2.eecs.berkeley.edu/Faculty/Homepages/sangiovanni-vicentelli.html). You can find more about my background in my [CV](./resume.pdf).\n\n🔬 **Research Interests:** Video Generation, Efficient ML and DL (Deep Learning) Optimization.",
  surname: "Zheng",
  firstName: "Zangwei",
  initials: "ZZ",
  location: "Singapore",
  locationLink: "https://www.google.com/maps/place/singapore",
  // Chinese general data
  chinese: {
    name: "郑奘巍",
    subtitle: "博士",
    description: "全栈开发者 & AI 研究员\n潞晨科技技术负责人",
    summary:
      "你好，我是郑奘巍👋，[Open-Sora](https://github.com/hpcaitech/Open-Sora) 和 [VideoOcean](https://video-ocean.com/) 的创始人，专注于 AI 视频生成和融合研究与实际创意的 AI SaaS 产品。\n\n我博士毕业于 ![NUS Logo](/icon/nus.png) [新加坡国立大学](https://nus.edu.sg/)，师从 [尤洋教授](https://scholar.google.com/citations?user=jF4dPZwAAAAJ&hl=zh-CN)。曾于 ![Bytedance Logo](/icon/bytedance.png) [字节跳动](https://bytedance.com/) 担任科研实习生。本科毕业于 ![NJU Logo](/icon/nju.png) [南京大学](https://www.nju.edu.cn/en/) 计算机科学与技术专业（拔尖计划）。我还曾在 ![UC Berkeley Logo](/icon/ucb.png) [加州大学伯克利分校](https://www.berkeley.edu/) 远程科研实习一年，合作导师包括 [岳翔宇博士](https://scholar.google.com/citations?user=-xQ-C1sAAAAJ&hl=zh-CN&authuser=1) 和 [Alberto Sangiovanni-Vincentelli 教授](https://www2.eecs.berkeley.edu/Faculty/Homepages/sangiovanni-vicentelli.html)。更多背景信息欢迎查阅我的 [简历](./resume.pdf)。\n\n🔬 **研究方向：** 视频生成、高效机器学习与深度学习优化。",
    blogDescription: "关于AI、软件、生活等的思考。短篇笔记和长篇写作。",
    blogInfo: {
      "note-aievaluation": {
        title: "评价即创造：AI时代将重新定义人类的生产力",
      },
    },
  },
  // Contact
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/zhengzangw",
        icon: Icons.github,
        navbar: false,
        content: true,
        footer: true,
      },
      GoogleScholar: {
        name: "Google Scholar",
        url: "https://scholar.google.com/citations?user=FTqutJEAAAAJ&hl=en",
        icon: Icons.googlescholar,
        navbar: false,
        content: true,
        footer: true,
      },
      orcid: {
        name: "ORCID",
        url: "https://orcid.org/0000-0001-7818-9534",
        icon: Icons.orcid,
        navbar: false,
        content: false,
        footer: true,
      },
      dblp: {
        name: "DBLP",
        url: "https://dblp.org/pid/289/0376.html",
        icon: Icons.dblp,
        navbar: false,
        content: false,
        footer: true,
      },
      researchgate: {
        name: "ResearchGate",
        url: "https://www.researchgate.net/profile/Zangwei-Zheng",
        icon: Icons.researchgate,
        navbar: false,
        content: false,
        footer: true,
      },
      semanticScholar: {
        name: "Semantic Scholar",
        url: "https://www.semanticscholar.org/author/Zangwei-Zheng/2109654065",
        icon: Icons.semanticScholar,
        navbar: false,
        content: false,
        footer: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/zangweizheng/",
        icon: Icons.linkedin,

        navbar: false,
        content: true,
        footer: true,
      },
      X: {
        name: "X",
        url: "https://x.com/zangweizheng",
        icon: Icons.x,

        navbar: false,
        content: true,
        footer: true,
      },
      facebook: {
        name: "Facebook",
        url: "https://www.facebook.com/zangweizheng",
        icon: Icons.facebook,
        navbar: false,
        content: false,
        footer: true,
      },
      instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/zangweizheng",
        icon: Icons.instagram,
        navbar: false,
        content: false,
        footer: true,
      },
      medium: {
        name: "Medium",
        url: "https://medium.com/@zangwei",
        icon: Icons.medium,
        navbar: false,
        content: false,
        footer: true,
      },
      substack: {
        name: "Substack",
        url: "https://substack.com/@zangwei",
        icon: Icons.substack,
        navbar: false,
        content: false,
        footer: true,
      },
      Zhihu: {
        name: "Zhihu",
        url: "https://www.zhihu.com/people/zheng-zang-wei",
        icon: Icons.zhihu,

        navbar: false,
        content: true,
        footer: true,
      },
      Xiaohongshu: {
        name: "Xiaohongshu",
        url: "https://xhslink.com/m/50gKYz1lKlC",
        icon: Icons.xiaohongshu,
        navbar: false,
        content: false,
        footer: true,
      },
      weibo: {
        name: "Weibo",
        url: "https://weibo.com/zhengzangwei",
        icon: Icons.weibo,
        navbar: false,
        content: false,
        footer: true,
      },
      wechat: {
        name: "WeChat",
        url: "/wechat-qrcode.jpg",
        icon: Icons.wechat,
        navbar: false,
        content: false,
        footer: true,
      },
      email: {
        name: "Email",
        url: "mailto:zhengzangwei@gmail.com",
        icon: Icons.email,
        navbar: false,
        content: true,
        footer: false,
      },
      rss: {
        name: "RSS",
        url: "/api/feed/atom.xml",
        icon: Icons.rss,
        navbar: false,
        content: false,
        footer: true,
      },
      calendly: {
        name: "Calendly",
        url: "https://calendly.com/zhengzangw/coffee-chat",
        icon: Icons.calendly,
        navbar: false,
        content: false,
        footer: false,
      },
    },
  },
  // News
  news: [
    {
      date: "2025.8",
      title: "[VideoOcean Agent](https://video-ocean.com/en/agent) Online",
      content:
        "🌊 VideoOcean Agent is now online! Generate videos up to minutes with a few clicks.",
    },
    {
      date: "2025.5",
      title: "Ph.D. Graduated",
      content:
        "🎓 Graduated from [HPC-AI @ NUS](https://ai.comp.nus.edu.sg/). Thanks to my supervisor and friends' help!",
    },
    {
      date: "2025.3",
      title:
        "[Open-Sora 2.0](https://arxiv.org/abs/2503.09642) [![GitHub Repo stars](https://img.shields.io/github/stars/hpcaitech/Open-Sora?style=social)](https://github.com/hpcaitech/Open-Sora) Released!",
      content:
        "🚀 Despite constrained computational resources, it achieves Sora-level metrics, fulfilling our goal of providing an open-source implementation of Sora.",
    },
    {
      date: "2024.9",
      title:
        "Paper Accepted ([MSIER](https://arxiv.org/abs/2404.12866), EMNLP 2024)",
      content:
        "📘 Got one paper accepted to EMNLP 2024. Congratulations to [Yang Luo](https://yangluo7.github.io/)!",
    },
    {
      date: "2024.9",
      title: "[VideoOcean](https://video-ocean.com/en/app) Online",
      content:
        "🌊 VideoOcean is now online! Generate your own video with a few clicks.",
    },
    {
      date: "2024.6",
      title:
        "Paper Accepted ([Dataset Growth](https://arxiv.org/pdf/2405.18347), ECCV 2024)",
      content:
        "📘 Got one paper accepted to ECCV 2024. Congratulations to [Ziheng Qin](https://scholar.google.com/citations?user=I04VhPMAAAAJ)!",
    },
    {
      date: "2024.6",
      title: "[Open-Sora 1.2](https://github.com/hpcaitech/Open-Sora) Released",
      content: "🚀 A 1.1B model on >30M data with improved performance.",
    },
    {
      date: "2024.5",
      title:
        "Paper Accepted ([Token Crisis](https://arxiv.org/pdf/2305.13230), ICML 2024)",
      content:
        "📘 Got one paper accepted to ICML 2024. Congratulations to [Fuzhao Xue](https://xuefuzhao.github.io/)!",
    },
    {
      date: "2024.4",
      title: "[Open-Sora 1.1](https://github.com/hpcaitech/Open-Sora) Released",
      content:
        "🚀 Support 0s~15s, 144p to 720p, various aspect ratios videos generation, plus a data processing pipeline.",
    },
    {
      date: "2024.4",
      title:
        "Paper Accepted ([Helen optimizer](https://arxiv.org/pdf/2403.00798), WWW 2024)",
      content:
        "📘 Got one paper accepted to WWW 2024. Congratulations to [Zirui Zhu](https://scholar.google.com/citations?user=eCAzecoAAAAJ&hl)!",
    },
    {
      date: "2024.3",
      title: "[Open-Sora 1.0](https://github.com/hpcaitech/Open-Sora) Released",
      content: "🎥 The first open-source Sora-like video generation model.",
    },
    {
      date: "2024.1",
      title:
        "Paper Accepted ([InfoBatch](https://arxiv.org/pdf/2303.04947), ICLR 2024 Oral)",
      content:
        "🎉 Got one paper accepted to ICLR 2024 (oral). Congratulations to [Ziheng Qin](https://scholar.google.com/citations?user=I04VhPMAAAAJ) and [Kai Wang](https://kaiwang960112.github.io/)!",
    },
    {
      date: "2023.9",
      title:
        "Papers Accepted (first-authored [Sequence-Scheduling](https://arxiv.org/pdf/2305.13144), NeurIPS 2023)",
      content:
        "🔥 Got two papers accepted to NeurIPS 2023. Cong to [Fuzhao Xue](https://xuefuzhao.github.io/) and myself. So many thanks to my collaborators!",
    },
    {
      date: "2023.7",
      title:
        "Paper Accepted (first-authored  [ZSCL](https://arxiv.org/pdf/2303.06628), ICCV 2023)",
      content:
        "📄 Got one first-authored paper accepted to ICCV 2023. Thanks to all my collaborators!",
    },
    {
      date: "2023.7",
      title:
        "Award ([CAME optimizer](https://arxiv.org/abs/2307.02047), [ACL Outstanding Paper](https://2023.aclweb.org/program/best_papers/))",
      content: "🏅 The CAME paper won the ACL Outstanding Paper Award!",
    },
    {
      date: "2023.5",
      title:
        "Paper Accepted ([CAME optimizer](https://arxiv.org/abs/2307.02047), ACL 2023)",
      content:
        "📘 Got one paper accepted to ACL 2023. Congratulations to [Yang Luo](https://yangluo7.github.io/)!",
    },
    {
      date: "2023.4",
      title:
        "Paper Accepted ([Bamboo](https://proceedings.mlr.press/v202/xue23b.html), ICML 2023)",
      content:
        "📘 Got one paper accepted to ICML 2023. Congratulations to [Fuzhao Xue](https://xuefuzhao.github.io/)!",
    },
    {
      date: "2023.3",
      title:
        "[ColossalChat](https://github.com/hpcaitech/ColossalAI/tree/main/applications/Chat) [![GitHub Repo Stars](https://img.shields.io/github/stars/hpcaitech/ColossalAI?style=social)](https://github.com/hpcaitech/ColossalAI/tree/main/applications/ColossalChat) Released",
      content:
        "🤖 Open-sourced LLM training framework for you to train your own version of ChatGPT. Congratulations to colleagues at HPC-AI-Tech!",
    },
    {
      date: "2023.2",
      title:
        "Award ([CowClip optimizer](https://arxiv.org/abs/2204.06240), [AAAI Distinguished Paper](https://aaai-23.aaai.org/wp-content/uploads/2023/02/AAAI-23-Paper-Awards-1.pdf))",
      content: "🥇 The CowClip paper won the AAAI Distinguished Paper Award!",
    },
    {
      date: "2022.12",
      title: "Ph.D. Qualifying Exam Passed",
      content:
        "🎓 Passed the qualifying exam. Cong to myself :) and thanks for my supervisor and friends’ help!",
    },
    {
      date: "2022.11",
      title:
        "Paper Accepted (first-authored [CowClip optimizer](https://arxiv.org/abs/2204.06240), AAAI 2023)",
      content:
        "📑 Got one first-authored paper accepted to AAAI 2023. Thanks to all my collaborators!",
    },
    {
      date: "2021.8",
      title:
        "[NJU-CSE-Flyers Handbook](https://nju-cse-flyers.github.io/) Published",
      content: "📘 The NJU-CSE-Flyers Handbook 2021 has been published.",
    },
    {
      date: "2021.7",
      title: "Internship at ByteDance",
      content: "💼 Happy to start my internship in ByteDance.",
    },
    {
      date: "2021.6",
      title: "Graduated from [Nanjing University](https://www.nju.edu.cn/)",
      content:
        "🎓 Bacheror's degree from Nanjing University. Thanks and good luck to all my teachers and classmates.",
    },
    {
      date: "2021.3",
      title: "Joined [HPC-AI @ NUS](https://ai.comp.nus.edu.sg/) Ph.D. Program",
      content:
        "📚 I will join HPC-AI @ NUS to start my Ph.D. degree under the supervision of Presidential Young Prof. [Yang You](https://www.comp.nus.edu.sg/~youy/)!",
    },
    {
      date: "2021.2",
      title:
        "Paper Accepted (co-first-authored [PCS-FUDA](https://arxiv.org/pdf/2103.16765), CVPR 2021)",
      content:
        "📑 Got one co-first-authored paper accepted to CVPR 2021. Thanks to all my collaborators!",
    },
  ],
  // Projects
  projects: [
    {
      title: "Open-Sora",
      href: "https://github.com/hpcaitech/Open-Sora",
      dates: "Mar. 2024 - Mar. 2025",
      active: true,
      description:
        "The world’s first open-source Sora-like video generation model — bringing efficient, high-quality video production to everyone.",
      technologies: [],
      authors: "",
      links: [
        {
          type: "Github",
          href: "https://github.com/hpcaitech/Open-Sora",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Open-Sora 1.2",
          href: "https://arxiv.org/abs/2412.20404",
          icon: <Icons.paper className="size-3" />,
        },
        {
          type: "Open-Sora 2.0",
          href: "https://arxiv.org/abs/2503.09642",
          icon: <Icons.paper className="size-3" />,
        },
      ],
      image: "/proj-open-sora.png",
      video: "",
    },
    {
      title: "VideoOcean Video Agent",
      href: "https://video-ocean.com/en/agent",
      dates: "Jun. 2025 - Present",
      active: true,
      description:
        "VideoOcean Video Agent generates videos up to minutes with a few clicks, including voice and face.",
      technologies: [],
      authors: "",
      links: [
        {
          type: "Website",
          href: "https://video-ocean.com/en/agent",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "https://files.zangwei.dev/proj-video-agent.mp4",
    },
    {
      title: "VideoOcean",
      href: "https://video-ocean.com/app",
      dates: "April 2025 - Present",
      active: true,
      description:
        "VideoOcean is a video generation platform that allows you to generate videos, images and audios with state-of-the-art models.",
      technologies: [],
      authors: "",
      links: [
        {
          type: "Website",
          href: "https://video-ocean.com/app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/proj-video-ocean.png",
      video: "",
    },
    {
      title: "ColossalChat",
      href: "https://github.com/hpcaitech/ColossalAI/tree/main/applications/ColossalChat",
      dates: "Mar. 2023",
      active: true,
      description:
        "ColossalChat is a project to implement LLM with RLHF, powered by the Colossal-AI.",
      technologies: [],
      authors: "",
      links: [
        {
          type: "Github",
          href: "https://github.com/hpcaitech/ColossalAI/tree/main/applications/ColossalChat",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Blog",
          href: "https://medium.com/pytorch/colossalchat-an-open-source-solution-for-cloning-chatgpt-with-a-complete-rlhf-pipeline-5edf08fb538b",
          icon: <Icons.newspaper className="size-3" />,
        },
      ],
      image: "/proj-colossalchat.png",
      video: "",
    },
    {
      title: "Instruction in the Wild",
      href: "https://github.com/XueFuzhao/InstructionWild",
      dates: "Apr. 2024",
      active: true,
      description:
        "This project focuses on building a larger and more diverse instruction dataset by collecting 110K instructions from shared ChatGPT usage.",
      technologies: [],
      authors: "",
      links: [
        {
          type: "Github",
          href: "https://github.com/XueFuzhao/InstructionWild",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/proj-inst-wild.png",
      video: "",
    },
    {
      title: "Sequence Schedule",
      href: "https://arxiv.org/abs/2305.13144",
      dates: "NeurIPS 2023",
      active: true,
      description:
        "Discovered that LLMs can foresee their response length — leading to Sequence Scheduling, an efficient LLM batch inference technique.",
      technologies: [],
      authors:
        "**Authors:** **Zangwei Zheng**, Xiaozhe Ren, Fuzhao Xue, Yang Luo, Xin Jiang, Yang You",
      links: [
        {
          type: "Paper",
          href: "https://arxiv.org/abs/2305.13144",
          icon: <Icons.paper className="size-3" />,
        },
        {
          type: "Github",
          href: "https://github.com/zhengzangw/Sequence-Scheduling",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/proj-sequence-schedule.png",
      video: "",
    },
    {
      title: "Zero-Shot Continual Learning",
      href: "https://arxiv.org/abs/2303.06628",
      dates: "ICCV 2023",
      active: true,
      description:
        "A new benchmark and method to mitigate forgetting problem existed in the continual learning of large pretrained vision-language models.",
      technologies: [],
      authors:
        "**Authors:** **Zangwei Zheng**, Mingyuan Ma, Kai Wang, Ziheng Qin, Xiangyu Yue, Yang You",
      links: [
        {
          type: "Paper",
          href: "https://arxiv.org/abs/2303.06628",
          icon: <Icons.paper className="size-3" />,
        },
        {
          type: "Github",
          href: "https://github.com/Thunderbeee/ZSCL",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/proj-zscl.png",
      video: "",
    },
    {
      title: "CowClip Optimizer",
      href: "https://arxiv.org/abs/2204.06240",
      dates: "AAAI 2023",
      active: true,
      description:
        "An optimizer that can train CTR prediction models with large batch (~128k)",
      technologies: [],
      authors:
        "**Authors:** **Zangwei Zheng**, Pengtai Xu, Xuan Zou, Da Tang, Zhen Li, Chenguang Xi, Peng Wu, Leqi Zou, Yijie Zhu, Ming Chen, Xiangzhuo Ding, Fuzhao Xue, Ziheng Qin, Youlong Cheng, Yang You",
      links: [
        {
          type: "Paper",
          href: "https://arxiv.org/abs/2204.06240",
          icon: <Icons.paper className="size-3" />,
        },
        {
          type: "Github",
          href: "https://github.com/bytedance/LargeBatchCTR",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/proj-cowclip.png",
      video: "",
    },
    {
      title: "PCS Learning",
      href: "https://arxiv.org/abs/2103.16765",
      dates: "CVPR 2021",
      active: true,
      description:
        "An end-to-end Prototypical Cross-domain Self-Supervised Learning (PCS) framework for Few-shot Unsupervised Domain Adaptation (FUDA).",
      technologies: [],
      authors:
        "**Authors:** Xiangyu Yue, **Zangwei Zheng** (co-first-author), Shanghang Zhang, Yang Gao, Trevor Darrell, Kurt Keutzer, Alberto Sangiovanni Vincentelli",
      links: [
        {
          type: "Paper",
          href: "https://arxiv.org/abs/2103.16765",
          icon: <Icons.paper className="size-3" />,
        },
        {
          type: "Blog",
          href: "https://xyue.io/pcs-fuda/index.html",
          icon: <Icons.newspaper className="size-3" />,
        },
        {
          type: "Github",
          href: "https://github.com/zhengzangw/PCS-FUDA",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/proj-pcs-fuda.png",
      video: "",
    },
  ],
  // Skills
  skills: [
    "Python",
    "PyTorch",
    "TensorFlow",
    "ColossalAI",
    "vLLM",
    "LangGraph",
    "OpenAI API",
    "FastMCP",
    "FastAPI",
    "PostgreSQL",
    "TypeScript",
    "React",
    "Next.js",
    "Docker",
    "Terraform",
    "GitHub Actions",
    "GitLab CI/CD",
    "Grafana",
    "Vercel",
    "Figma",
    "Cursor",
    "C/C++",
    "FFmpeg",
  ],
  // Education
  education: [
    {
      school: "National University of Singapore",
      href: "https://nus.edu.sg/",
      degree: "Ph.D. in Computer Science",
      logoUrl: "/icon/nus.png",
      start: "2021",
      end: "2025",
    },
    {
      school: "Nanjing University",
      href: "https://www.nju.edu.cn/en/",
      degree: "Bachelor's Degree of Computer Science (top 2%)",
      logoUrl: "/icon/nju.png",
      start: "2017",
      end: "2021",
    },
    {
      school: "Jiangsu Xishan Senior High School",
      href: "https://en.wikipedia.org/wiki/Xishan_Senior_High_School#:~:text=Jiangsu%20Xishan%20Senior%20High%20School,in%20computing%20and%20network%20facilities.",
      degree: "High School Diploma",
      logoUrl: "/icon/xishan.png",
      start: "2014",
      end: "2017",
    },
  ],
  // Work
  work: [
    {
      company: "HPC-AI Tech",
      href: "https://www.hpcaitech.com/",
      badges: [],
      location: "Singapore",
      title: "Tech Lead",
      logoUrl: "/icon/hpc-ai.png",
      start: "Dec. 2024",
      end: "Present",
      description: "Founder of Open-Sora and VideoOcean.",
    },
    {
      company: "Bytedance",
      href: "https://bytedance.com/",
      badges: [],
      location: "Singapore",
      title: "Research Intern",
      logoUrl: "/icon/bytedance.png",
      start: "Jun. 2021",
      end: "Jun. 2022",
      description:
        "Work on large batch training for click-through rate prediction model, mentored by Xuan Zhou and Youlong Cheng.",
    },
    {
      company: "UC Berkeley",
      href: "https://berkeley.edu/",
      badges: [],
      location: "(Remote) Berkeley, CA",
      title: "Research Intern",
      logoUrl: "/icon/ucb.png",
      start: "Apr. 2020",
      end: "May. 2021",
      description:
        "Work on self-supervised learning and domain adaptation, mentored by Xiangyu Yue and Alberto Sangiovanni-Vincentelli.",
    },
  ],
  // Awards
  awards: [
    { year: 2023, title: "Research Achievement Award of NUS" },
    { year: 2023, title: "ACL 2023 Outstanding Paper Award" },
    { year: 2023, title: "AAAI 2023 Distinguished Paper Award" },
    { year: 2022, title: "Papers with Code Contributor Award" },
    { year: 2021, title: "Outstanding Graduates of Nanjing University" },
    { year: 2020, title: "Outstanding Student of Nanjing University" },
    {
      year: 2019,
      title:
        "National Elite Program First-Class Scholarship (2 times, 2018–2019)",
    },
    { year: 2019, title: "Zheng Gang Overseas Study Scholarship" },
  ],
  // Academic Services
  reviewerConferences: ["NeurIPS", "ICLR", "CVPR", "ECCV", "AAAI"],
  reviewerJournals: ["Pattern Recognition", "TIP", "TSMC-S"],
  teaching: [
    {
      date: "Fall 2022",
      location: "National University of Singapore",
      title: "CS5242: Neural Networks and Deep Learning",
    },
    {
      date: "Fall 2020",
      location: "Nanjing University",
      title: "Algorithm Analysis & Design",
    },
  ],
  // Invited Talks
  invitedTalks: [
    {
      host: "QbitAI",
      url: "https://zhuanlan.zhihu.com/p/605329331",
      date: "2023.02",
      title: "Large Batch Training for CTR Prediction Model",
      logoUrl: "/icon/qbitai.png",
    },
    {
      host: "TechBeat",
      url: "https://www.techbeat.net/talk-info?id=762",
      date: "2023.03",
      title: "Large Batch Training for Recommendation Model",
      logoUrl: "/icon/techbeat.png",
    },
    {
      host: "Distributed AI (DAI) Conference, invited by *Wenbin Li*",
      url: "https://docs.google.com/presentation/d/123kehRyZqkr21ZWxjPyMU8_lMx6ki3g9vWIT3E1glQo/edit?usp=sharing",
      date: "2023.12",
      title: "Continual Learning on Pretrained Foundation Models",
      logoUrl: "/icon/dai.png",
    },
    {
      host: "National University of Singapore",
      url: "",
      date: "2024.03",
      title: "Video Generation Model",
      logoUrl: "/icon/nus.png",
    },
    {
      host: "Nvidia, invited by *Yuyang Zhao*",
      url: "",
      date: "2025.03",
      title: "Efficient Training with Open-Sora",
      logoUrl: "/icon/nvidia.png",
    },
    {
      host: "Tencent, invited by *Kai Wang*",
      url: "https://docs.google.com/presentation/d/1-ds5dfFZARYxN60Q_4fjcDV-GFwYpOcCoJzSLIyak-Q/edit?usp=sharing",
      date: "2025.09",
      title: "AI Video Gen Model From Scratch",
      logoUrl: "/icon/tencent.png",
    },
  ],
  // Discover (footer)
  discover: [
    {
      name: "HPC-AI Lab",
      url: "https://ai.comp.nus.edu.sg/",
    },
    {
      name: "NJU-CSE-Flyers",
      url: "https://nju-cse-flyers.github.io/",
    },
    {
      name: "Open-Sora",
      url: "https://github.com/hpcaitech/Open-Sora",
    },
    {
      name: "Video Ocean",
      url: "https://video-ocean.com/en/app",
    },
  ],
  // Fun facts
  aiTools: {
    description:
      "The AI models and services I use are handpicked for their performance and reliability.",
    tools: [
      { category: "General", name: "GPT-5" },
      { category: "Code", name: "Cursor (Auto)" },
      { category: "Image", name: "Seedream-4" },
      { category: "Video", name: "Seedance-1" },
    ],
  },
} as const;

export function getEmail(): string {
  return Object.values(DATA.contact.social)
    .filter((social) => social.name === "Email")
    .map((social) => social.url)[0];
}
