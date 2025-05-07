
import { Badge } from "@/components/ui/badge";

type JobPreference = {
  category: string;
  values: string[];
};

interface JobPreferencesProps {
  preferences: JobPreference[];
}

const JobPreferences = ({ preferences }: JobPreferencesProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="font-medium text-nomad-black">Job Activity</h2>
      </div>
      <div className="p-6 space-y-6">
        {preferences.map((preference) => (
          <div key={preference.category}>
            <h3 className="text-sm font-medium text-nomad-darkGray mb-2">{preference.category}</h3>
            <div className="flex flex-wrap gap-2">
              {preference.values.map((value, index) => (
                <Badge key={index} variant="outline" className="bg-nomad-lightBlue text-nomad-blue border-transparent py-1">
                  {value}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPreferences;
