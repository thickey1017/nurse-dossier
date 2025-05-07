
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Clock } from "lucide-react";

type JobRecommendation = {
  id: string;
  title: string;
  facility: string;
  location: string;
  pay: string;
  shift: string;
  duration: string;
  matchScore: number;
  tags: string[];
};

interface JobRecommendationsProps {
  recommendations: JobRecommendation[];
}

const JobRecommendations = ({ recommendations }: JobRecommendationsProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
        <h2 className="font-medium text-nomad-black">Recommended Jobs</h2>
        <Button variant="outline" className="h-8 text-xs">View All</Button>
      </div>
      <div className="divide-y divide-gray-100">
        {recommendations.map((job) => (
          <Card key={job.id} className="rounded-none shadow-none border-0">
            <CardContent className="p-6 pb-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <h3 className="font-medium text-nomad-black">{job.title}</h3>
                  <Badge className="bg-nomad-lightGreen text-nomad-green hover:bg-nomad-lightGreen">{job.matchScore}% Match</Badge>
                </div>
                <p className="text-sm text-nomad-darkGray">{job.facility}</p>
                <div className="flex flex-wrap gap-y-2">
                  <div className="flex items-center gap-1 pr-3 text-xs">
                    <MapPin className="h-3.5 w-3.5 text-nomad-darkGray" />
                    <span className="text-nomad-darkGray">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 pr-3 text-xs">
                    <DollarSign className="h-3.5 w-3.5 text-nomad-darkGray" />
                    <span className="text-nomad-darkGray">{job.pay}</span>
                  </div>
                  <div className="flex items-center gap-1 pr-3 text-xs">
                    <Clock className="h-3.5 w-3.5 text-nomad-darkGray" />
                    <span className="text-nomad-darkGray">{job.duration}, {job.shift}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-nomad-gray text-nomad-darkGray border-transparent text-xs py-0.5">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0">
              <Button size="sm" className="bg-nomad-blue hover:bg-nomad-darkBlue text-white">Share Job</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobRecommendations;
