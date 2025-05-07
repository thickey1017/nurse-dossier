import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail, TrendingUp, Clock, MapPin, DollarSign, MessageSquare } from "lucide-react";

import Timeline from "./Timeline";
import JobPreferences from "./JobPreferences";
import JobRecommendations from "./JobRecommendations";
import OutreachMessages from "./OutreachMessages";
import TileInsights from "./TileInsights";
import AskClara from "./AskClara";
import { useToast } from "@/hooks/use-toast";
import impressionsData from "../impressions.json";

// Mock data
const insights = {
  tiles: [
    {
      description: "Most recent activity",
      value: "The most recent activity was on 2025-05-06, where the nurse submitted an application for a PACU position in Farmington, CT"
    },
    {
      description: "Bursts of viewing",
      value: "There were bursts of activity on February 18, 2024 and February 28, 2025"
    },
    {
      description: "Preferred Specializations",
      value: "The nurse seems most interested in Post-Anesthesia Care Unit (PACU)"
    },
    {
      description: "Pay Preferences",
      value: "The nurse has viewed jobs with weekly gross compensation ranging from $1980 to $3920, indicating a willingness to consider a broad range of pay rates. However, they applied for jobs ranging from $2160 to $3000."
    },
    {
      description: "Shift Preferences",
      value: "The nurse seems to prefer day shifts and 4x10 or 5x8 hour shifts, but has also shown interest in 3x12 shifts and night shifts."
    },
    {
      description: "Location Preferences",
      value: "The nurse has viewed jobs in VA, CT, MA, NE, AK, PA, ID, NJ, ME, IA, IN, DC, AZ, and CA. They seem open to opportunities across the country, but have submitted applications to jobs primarily in CT, MA, VT, and AZ"
    },
    {
      description: "Notable Patterns",
      value: "The nurse has applied to a number of PACU positions. The nurse frequently views the same job multiple times before applying. They often start applications, and then submit them later. They seem to prefer travel positions. They are applying to jobs with start dates approximately 1-2 months out."
    }
  ]
};

const nurseSummary = {
  name: "Matt Littlehale, RN, BSN",
  phone: "+1 (555) 123-4567",
  email: "i_love_ninja_turtles@email.com",
  summary: insights.tiles.find(tile => tile.description === "Notable Patterns")?.value || "",
  avatarUrl: "https://ca.slack-edge.com/T0996AW94-U03NN0D5F61-0e34f408f8ba-512",
};

const timelineEvents = [
  {
    id: "1",
    date: "May 5, 2025 • 2:15 PM",
    title: "Applied to ICU Position at Providence Hospital",
    description: "Sarah submitted her application for the 13-week ICU position in Seattle.",
    type: "application" as const,
  },
  {
    id: "2",
    date: "May 4, 2025 • 11:30 AM",
    title: "Viewed ER Position at UCSF Medical Center",
    description: "Spent 4 minutes reviewing job details.",
    type: "view" as const,
  },
  {
    id: "3",
    date: "May 2, 2025 • 9:45 AM",
    title: "Message Sent by Recruiter Jane",
    description: "Follow-up on application status for Kaiser Permanente position.",
    type: "message" as const,
  },
  {
    id: "4",
    date: "Apr 28, 2025 • 3:20 PM",
    title: "Applied to PACU Role at Stanford Hospital",
    description: "Sarah submitted her application for the 8-week PACU position.",
    type: "application" as const,
  },
  {
    id: "5",
    date: "Apr 25, 2025 • 10:15 AM",
    title: "Phone Interview Scheduled",
    description: "For UCLA Medical Center ICU position on May 7th at 2PM.",
    type: "interview" as const,
  },
];

const jobPreferences = [
  {
    category: "Specialties",
    values: ["Med Surg (16 views)", "ICU (10 views)", "ED (2 views)"],
  },
  {
    category: "Locations",
    values: ["California (15 views)", "Washington (8 views)", "Oregon (5 views)"],
  },
  {
    category: "Shift Type",
    values: ["Night Shift (28 views)"],
  },
  {
    category: "Contract Length",
    values: ["13 weeks (14 views)", "8 weeks (14 views)"],
  }
];

const jobRecommendations = [
  {
    id: "job1",
    title: "ICU Registered Nurse",
    facility: "UCSF Medical Center",
    location: "San Francisco, CA",
    pay: "$5,200/week",
    shift: "Night Shift",
    duration: "13 weeks",
    matchScore: 94,
    tags: ["ICU", "Level I Trauma", "Teaching"],
  },
  {
    id: "job2",
    title: "ER Registered Nurse",
    facility: "Providence Swedish Medical Center",
    location: "Seattle, WA",
    pay: "$4,800/week",
    shift: "Day Shift",
    duration: "13 weeks",
    matchScore: 90,
    tags: ["Med Surg", "Level I Trauma"],
  },
  {
    id: "job3",
    title: "PACU Registered Nurse",
    facility: "OHSU Hospital",
    location: "Portland, OR",
    pay: "$4,600/week",
    shift: "Day/Night Rotation",
    duration: "8 weeks",
    matchScore: 85,
    tags: ["Med Surg", "Signing Bouns"],
  },
];

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

          {/* TPH - Not showing for now
          <JobPreferences preferences={jobPreferences} />
          <JobRecommendations recommendations={jobRecommendations} />
          */}

          <OutreachMessages 
            messages={outreachMessages}
            onEdit={handleEditMessage}
            onSend={handleSendMessage}
          />
        </div>

        {/* Right Column */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-6">
          {/* TPH - saving in case referencing JSON fails
          <Timeline events={timelineEvents} />
           */}
          <Timeline impressions={impressionsData.impressions} />
        </div>
      </div>
    </div>
  );
};

export default NurseDossier;
