import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ClinicianDossierResponse, RecruiterEngagement } from "@/types/api";

type Impression = NonNullable<ClinicianDossierResponse['most_recent_impressions'][0]>;
type Highlight = RecruiterEngagement['highlights'][0];

type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'impression' | 'highlight';
  impressionType?: Impression['impression_type'];
  highlightType?: Highlight['highlight_type'];
};

interface TimelineProps {
  impressions?: Impression[];
  highlights?: Highlight[];
}

const Timeline = ({ impressions = [], highlights = [] }: TimelineProps) => {
  const getEventColor = (type: TimelineEvent['type'], subType?: string) => {
    if (type === 'highlight') {
      switch (subType) {
        case 'First Contact':
        case 'First Call':
          return 'bg-nomad-lightBlue text-nomad-blue';
        case 'Application Progress':
        case 'Document Exchange':
          return 'bg-nomad-lightGreen text-nomad-green';
        case 'Job Search Update':
        case 'Recent Activity':
          return 'bg-nomad-lightYellow text-nomad-yellow';
        default:
          return 'bg-nomad-lightBlue text-nomad-blue';
      }
    } else {
      switch (subType) {
        case 'view':
          return 'bg-nomad-lightBlue text-nomad-blue';
        case 'new_application':
        case 'new_external_application':
        case 'application_submitted':
          return 'bg-nomad-lightGreen text-nomad-green';
        case 'app_start':
          return 'bg-nomad-lightYellow text-nomad-yellow';
        default:
          return 'bg-nomad-lightBlue text-nomad-blue';
      }
    }
  };

  const getEventTitle = (event: TimelineEvent) => {
    if (event.type === 'highlight') {
      return event.title;
    } else {
      const impression = impressions.find(i => `${i.job_post?.code || 'unknown'}-${i.timestamp}` === event.id);
      if (!impression?.job_post) return 'Unknown Activity';
      
      const job = impression.job_post;
      const specialization = job.specializations[0]?.name || '';
      
      switch (impression.impression_type) {
        case 'new_application':
        case 'new_external_application':
        case 'application_submitted':
          return `Applied to ${specialization} Position at ${job.facility.name}`;
        case 'app_start':
          return `Started Application for ${specialization} Position at ${job.facility.name}`;
        case 'view':
          return `Viewed ${specialization} Position at ${job.facility.name}`;
        default:
          return `Activity for ${specialization} Position at ${job.facility.name}`;
      }
    }
  };

  const getEventDescription = (event: TimelineEvent) => {
    if (event.type === 'highlight') {
      return event.description;
    } else {
      const impression = impressions.find(i => `${i.job_post?.code || 'unknown'}-${i.timestamp}` === event.id);
      if (!impression?.job_post) return 'No job details available';
      
      const job = impression.job_post;
      const details = [
        `${job.contract_length}-week contract`,
        `${job.shift_hours_and_days} hours`,
        job.shift_types.join(', '),
        `$${job.weekly_gross_compensation}/week`
      ].join(' • ');

      switch (impression.impression_type) {
        case 'new_application':
        case 'new_external_application':
        case 'application_submitted':
          return `Submitted application for ${job.code} in ${job.facility.city}, ${job.facility.state}. ${details}`;
        case 'app_start':
          return `Started application process for ${job.code}. ${details}`;
        case 'view':
          return `Spent time reviewing job details for ${job.code}. ${details}`;
        default:
          return `Activity for ${job.code}. ${details}`;
      }
    }
  };

  const events: TimelineEvent[] = [
    ...impressions.map(impression => ({
      id: `${impression.job_post?.code || 'unknown'}-${impression.timestamp}`,
      date: impression.timestamp,
      title: '', // Will be filled by getEventTitle
      description: '', // Will be filled by getEventDescription
      type: 'impression' as const,
      impressionType: impression.impression_type
    })),
    ...highlights.map(highlight => ({
      id: `highlight-${highlight.date}`,
      date: highlight.date,
      title: highlight.highlight_type,
      description: highlight.description,
      type: 'highlight' as const,
      highlightType: highlight.highlight_type
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-nomad-black">Timeline</h2>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={event.id} className="relative pl-6">
            {index !== events.length - 1 && (
              <div className="absolute left-[9px] top-[24px] h-full w-[2px] bg-gray-200" />
            )}
            <div className="flex gap-4">
              <div className={cn(
                "mt-1.5 h-4 w-4 rounded-full border-2 border-white",
                getEventColor(event.type, event.type === 'highlight' ? event.highlightType : event.impressionType)
              )} />
              <div className="flex flex-col">
                <span className="text-xs text-nomad-darkGray">
                  {format(new Date(event.date), "MMM d, yyyy • h:mm a")}
                </span>
                <span className="font-medium text-nomad-black">{getEventTitle(event)}</span>
                <p className="text-sm text-nomad-darkGray">{getEventDescription(event)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
