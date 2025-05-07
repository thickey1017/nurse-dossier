import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { RecruiterEngagement } from "@/types/api";

interface RecruiterTimelineProps {
  engagement: RecruiterEngagement;
}

const RecruiterTimeline = ({ engagement }: RecruiterTimelineProps) => {
  const getEventColor = (highlightType: RecruiterEngagement['highlights'][0]['highlight_type']) => {
    switch (highlightType) {
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
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-nomad-black">Recruiter Engagement</h2>
        <div className="text-sm text-nomad-darkGray">
          {engagement.recruiter_name} • {engagement.engagement_period}
        </div>
      </div>
      <div className="space-y-4">
        {engagement.highlights.map((highlight, index) => (
          <div key={`${highlight.date}-${index}`} className="relative pl-6">
            {index !== engagement.highlights.length - 1 && (
              <div className="absolute left-[9px] top-[24px] h-full w-[2px] bg-gray-200" />
            )}
            <div className="flex gap-4">
              <div className={cn(
                "mt-1.5 h-4 w-4 rounded-full border-2 border-white",
                getEventColor(highlight.highlight_type)
              )} />
              <div className="flex flex-col">
                <span className="text-xs text-nomad-darkGray">
                  {format(new Date(highlight.date), "MMM d, yyyy • h:mm a")}
                </span>
                <span className="font-medium text-nomad-black">{highlight.highlight_type}</span>
                <p className="text-sm text-nomad-darkGray">{highlight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterTimeline; 