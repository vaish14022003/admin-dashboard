



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Interfaces for type safety
interface Manager {
  _id: string;
  name: string;
  email: string;
  accountNumber: string;
  ifscCode: string;
  role: number;
  bankName: string;
  isActiveManager: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  restaurantId?: string;
  deletedAt?: string;
  resetToken?: string;
  resetTokenExpiry?: string;
}

interface ManagersState {
  managers: Manager[];
  total: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  actionStatus: string | null;
}

interface ManagersListResponse {
  totalBlocked: number;
  totalCount: number;
  managers: Manager[];
  totalManagers: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  filters: {
    sortBy: string;
    sortOrder: string;
    isDeleted?: boolean;
    isBlocked?: boolean;
  };
}

interface GetManagersParams {
  page?: number;
  limit?: number;
  isDeleted?: boolean;
  isBlocked?: boolean;
}

interface ActionParams {
  restaurantId?: string;
  managerId?: string;
}

// Initial state
const initialState: ManagersState = {
  managers: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  actionStatus: null,
};

// Async thunk for getting paginated list of managers
export const getManagersList = createAsyncThunk<
  ManagersListResponse,
  GetManagersParams,
  { rejectValue: string }
>(
  "manager/getManagersList",
  async ({ page = 1, limit = 10, isDeleted, isBlocked }, { rejectWithValue }) => {
    try {
      const response = await api.get<ManagersListResponse>(`/manager/managers?isblocked=${isBlocked}&isdeleted=false`, {
        params: { page, limit, isDeleted, isBlocked },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for blocking a restaurant
export const blockRestaurant = createAsyncThunk<
  void,
  ActionParams,
  { rejectValue: string }
>("manager/blockRestaurant", async ({ managerId }, { rejectWithValue }) => {
  try {
    await api.patch(`/manager/block?managerId=${managerId}`);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Async thunk for validating a manager
export const validateManager = createAsyncThunk<
  void,
  ActionParams,
  { rejectValue: string }
>("manager/validateManager", async ({ managerId }, { rejectWithValue }) => {
  try {
    await api.patch(`/manager/Validate?managerId=${managerId}`);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Async thunk for invalidating a manager
export const invalidateManager = createAsyncThunk<
  void,
  ActionParams,
  { rejectValue: string }
>("manager/invalidateManager", async ({ managerId }, { rejectWithValue }) => {
  try {
    await api.patch(`/manager/Invalidate?managerId=${managerId}`);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Async thunk for deleting a manager
export const deleteManager = createAsyncThunk<
  void,
  ActionParams,
  { rejectValue: string }
>("manager/deleteManager", 
  async ({ managerId }, { rejectWithValue }) => {
  try {
    await api.delete(`/manager/${managerId}`);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearActionStatus: (state) => {
      state.actionStatus = null;
    },
  },
  extraReducers: (builder) => {
    // Get Managers List
    builder
      .addCase(getManagersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getManagersList.fulfilled, (state, action) => {
        state.loading = false;
        state.managers = action.payload.managers || [];
        state.total = action.payload.totalManagers || 0;
        state.currentPage = action.payload.page || 1;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(getManagersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch managers";
      });

    // Block Restaurant
    builder
      .addCase(blockRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.actionStatus = null;
      })
      .addCase(blockRestaurant.fulfilled, (state) => {
        state.loading = false;
        state.actionStatus = "Restaurant blocked successfully";
      })
      .addCase(blockRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to block restaurant";
      });

    // Validate Manager
    builder
      .addCase(validateManager.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.actionStatus = null;
      })
      .addCase(validateManager.fulfilled, (state) => {
        state.loading = false;
        state.actionStatus = "Manager validated successfully";
      })
      .addCase(validateManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to validate manager";
      });

    // Invalidate Manager
    builder
      .addCase(invalidateManager.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.actionStatus = null;
      })
      .addCase(invalidateManager.fulfilled, (state) => {
        state.loading = false;
        state.actionStatus = "Manager invalidated successfully";
      })
      .addCase(invalidateManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to invalidate manager";
      });

    // Delete Manager
    builder
      .addCase(deleteManager.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.actionStatus = null;
      })
      .addCase(deleteManager.fulfilled, (state) => {
        state.loading = false;
        state.actionStatus = "Manager deleted successfully";
      })
      .addCase(deleteManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete manager";
      });
  },
});

export const { clearError, clearActionStatus } = managerSlice.actions;
export default managerSlice.reducer;