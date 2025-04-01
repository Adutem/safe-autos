import { AnalyticsState } from "./analytics/analyticsSlice";
import { LoginState } from "./auth/login/loginSlice";
import { HolidayState } from "./holiday/interface";
import { JobState } from "./job/interface";
import { LayoutState } from "./layout/interface";
import { BlogState } from "./blog/interface";
import { ContactState } from "./contact/interface";
import { PromotionState } from "./promotion/interface";

export interface StoreInterface {
  Layout: LayoutState;
  Login: LoginState;
  Analytics: AnalyticsState;
  Holiday: HolidayState;
  Jobs: JobState;
  Blog: BlogState;
  Promotion: PromotionState;
  Contact: ContactState;
}

export type RootState = {
  Layout: StoreInterface["Layout"];
  Login: StoreInterface["Login"];
  Analytics: StoreInterface["Analytics"];
  Holiday: StoreInterface["Holiday"];
  Jobs: StoreInterface["Jobs"];
  Blog: StoreInterface["Blog"];
  Promotion: StoreInterface["Promotion"];
  Contact: StoreInterface["Contact"];
};


