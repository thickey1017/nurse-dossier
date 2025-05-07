import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail, TrendingUp, Clock, MapPin, DollarSign, MessageSquare } from "lucide-react";

import Timeline from "./Timeline";
import RecruiterTimeline from "./RecruiterTimeline";
import OutreachMessages from "./OutreachMessages";
import TileInsights from "./TileInsights";
import AskClara from "./AskClara";
import { useToast } from "@/hooks/use-toast";
import impressionsData from "../impressions.json";
import { ClinicianDossierResponse, RecruiterEngagement } from "@/types/api";

// Mock data
const insights: ClinicianDossierResponse = {
  executive_summary: "The nurse has shown consistent interest in PACU positions across multiple states, with a preference for day shifts and competitive compensation.",
  new_user: false,
  tiles: [
    {
      label: "Most recent activity",
      value: "The most recent activity was on 2025-05-06, where the nurse submitted an application for a PACU position in Farmington, CT"
    },
    {
      label: "Bursts of viewing",
      value: "There were bursts of activity on February 18, 2024 and February 28, 2025"
    },
    {
      label: "Preferred Specializations",
      value: "The nurse seems most interested in Post-Anesthesia Care Unit (PACU)"
    },
    {
      label: "Pay Preferences",
      value: "The nurse has viewed jobs with weekly gross compensation ranging from $1980 to $3920, indicating a willingness to consider a broad range of pay rates. However, they applied for jobs ranging from $2160 to $3000."
    },
    {
      label: "Shift Preferences",
      value: "The nurse seems to prefer day shifts and 4x10 or 5x8 hour shifts, but has also shown interest in 3x12 shifts and night shifts."
    },
    {
      label: "Location Preferences",
      value: "The nurse has viewed jobs in VA, CT, MA, NE, AK, PA, ID, NJ, ME, IA, IN, DC, AZ, and CA. They seem open to opportunities across the country, but have submitted applications to jobs primarily in CT, MA, VT, and AZ"
    },
    {
      label: "Notable Patterns",
      value: "The nurse has applied to a number of PACU positions. The nurse frequently views the same job multiple times before applying. They often start applications, and then submit them later. They seem to prefer travel positions. They are applying to jobs with start dates approximately 1-2 months out."
    }
  ],
  most_recent_impressions: []
};

const recruiterEngagement: RecruiterEngagement = {
  client_name: "Matt Littlehale",
  recruiter_name: "Sarah Johnson",
  engagement_period: "March 2024 - Present",
  highlights: [
    {
      date: "2024-03-15T10:00:00Z",
      highlight_type: "First Contact",
      description: "Initial outreach via email regarding PACU opportunities in the Northeast region."
    },
    {
      date: "2024-03-16T14:30:00Z",
      highlight_type: "First Call",
      description: "Scheduled and completed first phone call to discuss career goals and preferences."
    },
    {
      date: "2024-03-17T09:15:00Z",
      highlight_type: "Document Exchange",
      description: "Received and reviewed updated resume and certifications."
    },
    {
      date: "2024-03-18T11:45:00Z",
      highlight_type: "Job Search Update",
      description: "Shared three PACU positions matching preferences in CT and MA."
    },
    {
      date: "2024-03-19T16:20:00Z",
      highlight_type: "Application Progress",
      description: "Started application process for PACU position at Hartford Hospital."
    },
    {
      date: "2024-03-20T13:10:00Z",
      highlight_type: "Recent Activity",
      description: "Completed application for Hartford Hospital position and expressed interest in two other opportunities."
    }
  ]
};

const nurseSummary = {
  name: "Matt Littlehale, RN, BSN",
  phone: "+1 (555) 123-4567",
  email: "i_love_ninja_turtles@email.com",
  summary: insights.tiles.find(tile => tile.label === "Notable Patterns")?.value || "",
  avatarUrl: "https://ca.slack-edge.com/T0996AW94-U03NN0D5F61-0e34f408f8ba-512",
};

const outreachMessages = [
  {
    id: "msg1",
    title: "West Coast ICU Opportunity",
    message: "Hi Sarah, I noticed you're interested in ICU positions on the West Coast. We have a great opportunity at UCSF Medical Center with competitive pay ($5,200/week) that matches your preferred 13-week contract length and night shift preference. Would you like to discuss this position?",
  },
  {
    id: "msg2",
    title: "Follow-up on Application",
    message: "Hello Sarah, I wanted to check in regarding your application to the Providence Hospital ICU position. The hiring manager was impressed with your experience. Do you have time this week to discuss next steps in the interview process?",
  },
  {
    id: "msg3",
    title: "Personalized Opportunity",
    message: "Sarah, based on your experience in both ICU and ER settings, I think you'd be perfect for a position I just received at Stanford Hospital. It's a 13-week contract with potential for extension, paying $5,100/week. Would you be interested in learning more?",
  },
];

const NurseDossier = () => {
  const { toast } = useToast();
  
  const handleEditMessage = (message: {id: string; title: string; message: string}) => {
    console.log("Edit message:", message);
    // In a real app, this would open an editor modal
    toast({
      title: "Edit Message",
      description: `Opening editor for "${message.title}"`,
    });
  };

  const handleSendMessage = (message: {id: string; title: string; message: string}) => {
    console.log("Send message:", message);
    // In a real app, this would send the message
    toast({
      title: "Message Sent",
      description: `"${message.title}" has been sent to ${nurseSummary.name}`,
    });
  };

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8">
      {/* Nurse Summary Header */}
      <Card className="p-6 mb-8 bg-white">
        <div className="flex items-start gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={nurseSummary.avatarUrl} alt={nurseSummary.name} />
            <AvatarFallback className="bg-nomad-blue text-white text-xl">SJ</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-medium text-nomad-black mb-1">{nurseSummary.name}</h1>
            <div className="flex items-center gap-6 mb-3">
              <div className="flex items-center text-sm text-nomad-darkGray">
                <Phone className="h-4 w-4 mr-1" />
                {nurseSummary.phone}
              </div>
              <div className="flex items-center text-sm text-nomad-darkGray">
                <Mail className="h-4 w-4 mr-1" />
                {nurseSummary.email}
              </div>
              <a 
                href="https://nomadhealth.zendesk.com/agent/tickets/12345" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm text-nomad-darkGray hover:text-nomad-blue transition-colors"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Message in Zendesk
              </a>
            </div>
            <p className="text-nomad-darkGray">{nurseSummary.summary}</p>
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <TileInsights tiles={insights.tiles} />
          <AskClara />
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-6">
            <RecruiterTimeline engagement={recruiterEngagement} />
          </div>
          <OutreachMessages 
            messages={outreachMessages}
            onEdit={handleEditMessage}
            onSend={handleSendMessage}
          />
        </div>

        {/* Right Column */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-6">
          <Timeline impressions={impressionsData.impressions as ClinicianDossierResponse['most_recent_impressions']} />
        </div>
      </div>
    </div>
  );
};

export default NurseDossier;
