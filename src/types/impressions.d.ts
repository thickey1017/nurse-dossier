declare module "*/impressions.json" {
  interface Impression {
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
  }

  interface ImpressionsData {
    impressions: Impression[];
  }

  const data: ImpressionsData;
  export default data;
} 