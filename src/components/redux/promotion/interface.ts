import { PromotionInterface, PromotionPost } from "../../promotionServices/type";

export interface ApiResponse {
  success: boolean;
  status: number;
  message: string;
}


export interface PromotionState {
  isFetchingPromotions: boolean;
  promotionsFetched: boolean;
  fetchError: string;
  promotions: Array<PromotionInterface> | null;
  isCreatingPromotion: boolean;
  promotionCreated: boolean;
  createError: string;
  isUpdatingPromotion: boolean;
  promotionUpdated: boolean;
  updateError: string;
  isDeletingPromotion: boolean;
  promotionDeleted: boolean;
  deleteError: string;
}

export interface PromotionApiResponse extends ApiResponse {
  promotion: PromotionInterface;
}

export interface AllPromotionsApiResponse extends ApiResponse {
  promotions: Array<PromotionInterface>;
}
