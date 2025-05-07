import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Impression = {
  job_post: {
    id: string;
    facility: {
      id: string;
      name: string;
      city: string;
      state: string;
      zip: string;
      photos: any;
      facility_type: any;
      health_system_name: any;
      address: string;
    };
    roi_score: any;
    title: string;
    code: string;
    pay_rate: number;
    discipline: string;
    contract_length: number;
    job_type: string;
    shift_types: string[];
    shift_hours_and_days: string;
    specializations: Array<{
      id: string;
      name: string;
    }>;
    weekly_gross_compensation: number;
    last_published: any;
    attributes: Record<string, any>;
    start_date: string;
    required_certifications: any;
    user: any;
    ml: any;
    score: any;
    pagination_token: any;
  };
  impression_type: string;
  timestamp: string;
};

interface TimelineProps {
  impressions: Impression[];
}

const Timeline = ({ impressions }: TimelineProps) => {
  const getEventColor = (type: string) => {
    switch (type) {
      case 'view':
        return 'bg-nomad-lightBlue text-nomad-blue';
      case 'new_application':
        return 'bg-nomad-lightGreen text-nomad-green';
      case 'app_start':
        return 'bg-nomad-lightYellow text-nomad-yellow';
      default:
        return 'bg-nomad-lightBlue text-nomad-blue';
    }
  };

  const getEventTitle = (impression: Impression) => {
    const job = impression.job_post;
    const specialization = job.specializations[0]?.name || '';
    const location = `${job.facility.city}, ${job.facility.state}`;
    
    switch (impression.impression_type) {
      case 'new_application':
        return `Applied to ${specialization} Position at ${job.facility.name}`;
      case 'app_start':
        return `Started Application for ${specialization} Position at ${job.facility.name}`;
      case 'view':
        return `Viewed ${specialization} Position at ${job.facility.name}`;
      default:
        return `Activity for ${specialization} Position at ${job.facility.name}`;
    }
  };

  const getEventDescription = (impression: Impression) => {
    const job = impression.job_post;
    const details = [
      `${job.contract_length}-week contract`,
      `${job.shift_hours_and_days} hours`,
      job.shift_types.join(', '),
      `$${job.weekly_gross_compensation}/week`
    ].join(' • ');

    switch (impression.impression_type) {
      case 'new_application':
        return `Submitted application for ${job.code} in ${job.facility.city}, ${job.facility.state}. ${details}`;
      case 'app_start':
        return `Started application process for ${job.code}. ${details}`;
      case 'view':
        return `Spent time reviewing job details for ${job.code}. ${details}`;
      default:
        return `Activity for ${job.code}. ${details}`;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-nomad-black">Timeline</h2>
      <div className="space-y-4">
        {impressions.map((impression, index) => (
          <div key={`${impression.job_post.code}-${impression.timestamp}`} className="relative pl-6">
            {index !== impressions.length - 1 && (
              <div className="absolute left-[9px] top-[24px] h-full w-[2px] bg-gray-200" />
            )}
            <div className="flex gap-4">
              <div className={cn("mt-1.5 h-4 w-4 rounded-full border-2 border-white", getEventColor(impression.impression_type))} />
              <div className="flex flex-col">
                <span className="text-xs text-nomad-darkGray">
                  {format(new Date(impression.timestamp), "MMM d, yyyy • h:mm a")}
                </span>
                <span className="font-medium text-nomad-black">{getEventTitle(impression)}</span>
                <p className="text-sm text-nomad-darkGray">{getEventDescription(impression)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
