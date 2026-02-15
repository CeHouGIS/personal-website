import { Badge } from "@/components/ui/badge";
import { ResumeCard } from "@/components/portfolio/resume-card";

interface AssociationProps {
  company: string;    // 协会名称
  title: string;      // 职位 (e.g. Member, Chair)
  logoUrl: string;
  start: string;
  end?: string;
  location?: string;
  description?: string;
  href?: string;
  badges?: readonly string[];
}

interface ServicesProps {
  associations?: readonly AssociationProps[];
  reviewerConferences: readonly string[];
  reviewerJournals: readonly string[];
  teaching: readonly {
    date: string;
    title: string;
    location: string;
  }[];

  associationsLabel?: string;
  reviewerConferencesLabel?: string;
  reviewerJournalsLabel?: string;
  teachingLabel?: string;
}



export default function Services({
  associations,
  reviewerConferences,
  reviewerJournals,
  teaching,
  associationsLabel = "Professional Memberships & Service:", // 默认标题
  reviewerConferencesLabel = "Reviewer of Conferences:",
  reviewerJournalsLabel = "Reviewer of Journals:",
  teachingLabel = "Teaching Assistant:",
}: ServicesProps) {
  return (
    <div className="flex flex-col gap-y-3">
      {Array.isArray(associations) && associations.length > 0 && (
        <div className="flex flex-col gap-y-2">
          <span className="text-muted-foreground text-sm">
            {associationsLabel}
          </span>
          {associations.map((item) => (
            <ResumeCard
              key={item.company}
              logoUrl={item.logoUrl}
              altText={item.company}
              title={item.company}      // 对应协会名
              subtitle={item.title}     // 对应你的职位
              href={item.href}
              badges={item.badges}
              period={`${item.start} - ${item.end ?? "Present"}`}
              description={item.description}
              location={item.location}
            />
          ))}
        </div>
      )}
      {Array.isArray(reviewerConferences) &&
        reviewerConferences.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground text-sm">
              {reviewerConferencesLabel}
            </span>
            {reviewerConferences.map((venue) => (
              <Badge key={venue}>{venue}</Badge>
            ))}
          </div>
        )}
      {Array.isArray(reviewerJournals) && reviewerJournals.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground text-sm">
            {reviewerJournalsLabel}
          </span>
          {reviewerJournals.map((venue) => (
            <Badge key={venue}>{venue}</Badge>
          ))}
        </div>
      )}
      {Array.isArray(teaching) && teaching.length > 0 && (
        <div className="flex flex-col gap-y-2">
          <span className="text-muted-foreground text-sm">
            {teachingLabel}
          </span>
          <div className="space-y-0.5">
            {teaching.map((teaching) => (
              <div
                key={teaching.date + teaching.title}
                className="hover:bg-accent/50 rounded-md px-3 py-1 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-muted-foreground mt-0.5 text-xs font-medium whitespace-nowrap">
                    {teaching.date}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-0.5 text-sm leading-tight font-semibold">
                      {teaching.title}
                    </h3>
                    <div className="text-muted-foreground text-xs leading-relaxed">
                      {teaching.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
