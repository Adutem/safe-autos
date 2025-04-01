import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getPromotion as getPromotionApi,
  getAllPromotions as getAllPromotionsApi,
  createPromotion as createPromotionApi,
  updatePromotion as updatePromotionApi,
  deletePromotion as deletePromotionApi,
} from "../../../api/promotion";
import { PromotionState, PromotionApiResponse, AllPromotionsApiResponse } from "./interface";

// initial promotion state
const INIT_STATE: PromotionState = {
  isFetchingPromotions: false,
  promotionsFetched: false,
  fetchError: "",
  promotions: null,
  isCreatingPromotion: false,
  promotionCreated: false,
  createError: "",
  isUpdatingPromotion: false,
  promotionUpdated: false,
  updateError: "",
  isDeletingPromotion: false,
  promotionDeleted: false,
  deleteError: "",
};

// Fetch promotions
export const fetchPromotions = createAsyncThunk(
  "fetchPromotions",
  async (data: void, thunkAPI) => {
    try {
      const promotionsResponse: Awaited<Promise<AllPromotionsApiResponse>> =
        (await getAllPromotionsApi()) as unknown as AllPromotionsApiResponse;
      return promotionsResponse.promotions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create promotion
export const createPromotion = createAsyncThunk(
  "createPromotion",
  async (data: any, thunkAPI) => {
    try {
      const promotionResponse: Awaited<Promise<PromotionApiResponse>> =
        (await createPromotionApi(data)) as unknown as PromotionApiResponse;
      return promotionResponse.promotion;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update promotion
export const updatePromotion = createAsyncThunk(
  "updatePromotion",
  async ({ promotionId, data }: any, thunkAPI) => {
    try {
      const promotionResponse: Awaited<Promise<PromotionApiResponse>> =
        (await updatePromotionApi(promotionId, data)) as unknown as PromotionApiResponse;
      return promotionResponse.promotion;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete promotion
export const deletePromotion = createAsyncThunk(
  "deletePromotion",
  async (promotionId: any, thunkAPI) => {
    try {
      const promotionResponse: Awaited<Promise<PromotionApiResponse>> =
        (await deletePromotionApi(promotionId)) as unknown as PromotionApiResponse;
      return promotionResponse.promotion;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const promotionSlice = createSlice({
  name: "Promotion",
  initialState: INIT_STATE,
  reducers: {
    resetFetchPromotions: (state) => {
      state.isFetchingPromotions = false;
      state.promotionsFetched = false;
      state.fetchError = "";
    },

    resetCreatePromotion: (state) => {
      state.isCreatingPromotion = false;
      state.promotionCreated = false;
      state.createError = "";
    },

    resetUpdatePromotion: (state) => {
      state.isUpdatingPromotion = false;
      state.promotionUpdated = false;
      state.updateError = "";
    },

    resetDeletePromotion: (state) => {
      state.isDeletingPromotion = false;
      state.promotionDeleted = false;
      state.deleteError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromotions.pending, (state) => {
        state.isFetchingPromotions = true;
        state.promotionsFetched = false;
        state.fetchError = "";
      })
      .addCase(fetchPromotions.fulfilled, (state, action) => {
        state.isFetchingPromotions = false;
        state.promotionsFetched = true;
        state.promotions = action.payload;
      })
      .addCase(fetchPromotions.rejected, (state, action) => {
        state.isFetchingPromotions = false;
        state.promotionsFetched = false;
        state.fetchError = action.payload as string;
      })
      .addCase(createPromotion.pending, (state) => {
        state.isCreatingPromotion = true;
        state.promotionCreated = false;
        state.createError = "";
      })
      .addCase(createPromotion.fulfilled, (state, action) => {
        state.isCreatingPromotion = false;
        state.promotionCreated = true;
        state.promotions
          ? state.promotions.push(action.payload)
          : (state.promotions = [action.payload]);
      })
      .addCase(createPromotion.rejected, (state, action) => {
        state.isCreatingPromotion = false;
        state.createError = action.error.message || "";
      })
      .addCase(updatePromotion.pending, (state) => {
        state.isUpdatingPromotion = true;
        state.promotionUpdated = false;
        state.updateError = "";
      })
      .addCase(updatePromotion.fulfilled, (state, action) => {
        state.isUpdatingPromotion = false;
        state.promotionUpdated = true;
        state.promotions = !state.promotions
          ? []
          : state.promotions.map((promotion) => {
              if (promotion._id === action.payload._id) {
                return action.payload;
              } else {
                return promotion;
              }
            });
      })
      .addCase(updatePromotion.rejected, (state, action) => {
        state.isUpdatingPromotion = false;
        state.updateError = action.error.message || "";
      })
      .addCase(deletePromotion.pending, (state) => {
        state.isDeletingPromotion = true;
      })
      .addCase(deletePromotion.fulfilled, (state, action) => {
        state.isDeletingPromotion = false;
        state.promotionDeleted = true;
        state.promotions = !state.promotions
          ? []
          : state.promotions.filter((promotion) => promotion._id !== action.payload._id);
      })
      .addCase(deletePromotion.rejected, (state, action) => {
        state.isDeletingPromotion = false;
        state.deleteError = action.error.message || "";
      });
  },
});

export default promotionSlice.reducer;
export const {
  resetCreatePromotion,
  resetFetchPromotions,
  resetUpdatePromotion,
  resetDeletePromotion,
} = promotionSlice.actions;
