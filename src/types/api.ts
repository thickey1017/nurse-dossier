export interface ClinicianDossierResponse {
  executive_summary: string;
  new_user: boolean;
  tiles: {
    label: string;
    value: string | number;
  }[];
  most_recent_impressions: {
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
    } | null;
    impression_type: 'new_external_application' | 'new_application' | 'view' | 'application_submitted' | 'app_start';
    timestamp: string;
  }[];
}

export interface RecruiterEngagement {
  client_name: string;
  recruiter_name: string;
  engagement_period: string;
  highlights: Array<{
    date: string;
    highlight_type: 'First Contact' | 'Application Progress' | 'First Call' | 'Job Search Update' | 'Document Exchange' | 'Recent Activity';
    description: string;
  }>;
} 