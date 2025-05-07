import { Card, CardContent } from "@/components/ui/card";
import { Activity, Calendar, Stethoscope, DollarSign, Clock, MapPin, Lightbulb } from "lucide-react";
import { ClinicianDossierResponse } from "@/types/api";

type Tile = ClinicianDossierResponse['tiles'][0];

interface TileInsightsProps {
  tiles: Tile[];
}

const TileInsights = ({ tiles }: TileInsightsProps) => {
  const getIconForDescription = (label: string) => {
    if (label.toLowerCase().includes("recent activity")) return <Activity className="h-5 w-5" />;
    if (label.toLowerCase().includes("bursts")) return <Calendar className="h-5 w-5" />;
    if (label.toLowerCase().includes("specializations")) return <Stethoscope className="h-5 w-5" />;
    if (label.toLowerCase().includes("pay")) return <DollarSign className="h-5 w-5" />;
    if (label.toLowerCase().includes("shift")) return <Clock className="h-5 w-5" />;
    if (label.toLowerCase().includes("location")) return <MapPin className="h-5 w-5" />;
    if (label.toLowerCase().includes("patterns")) return <Lightbulb className="h-5 w-5" />;
    return null;
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="font-medium text-nomad-black">Insights</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {tiles
          .filter(tile => tile.label !== "Notable Patterns")
          .map((tile, index) => (
            <Card key={index} className="border border-gray-200 hover:border-nomad-blue transition-colors">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="text-nomad-blue">
                    {getIconForDescription(tile.label)}
                  </div>
                  <h3 className="font-medium text-nomad-black">{tile.label}</h3>
                  <p className="text-sm text-nomad-darkGray">{tile.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default TileInsights; 