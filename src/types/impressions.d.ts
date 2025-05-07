import { ClinicianDossierResponse } from "./api";

declare module "*/impressions.json" {
  const data: {
    impressions: ClinicianDossierResponse['most_recent_impressions'];
  };
  export default data;
} 