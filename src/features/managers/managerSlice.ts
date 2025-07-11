// //import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

// import api from '../../services/api';

// export interface Manager {
//     _id: string;
//     name: string;
//     email: string;
//     isValid: boolean;
// }

// interface ManagerState {
//     managers: Manager[];
//     loading: boolean;
//     error: string | null;
// }

// const initialState: ManagerState = {
//     managers: [],
//     loading: false,
//     error: null,
// };

// export const fetchManagers = createAsyncThunk('managers/fetchAll', async (_, thunkAPI) => {
//     try {
//         const response = await api.get('/managers');
//         return response.data;
//     } catch (err: any) {
//         return thunkAPI.rejectWithValue(err.response.data.message || 'Failed to fetch managers');
//     }
// });

// export const toggleValidation = createAsyncThunk(
//     'managers/toggleValidation',
//     async (id: string, thunkAPI) => {
//         try {
//             const response = await api.patch(`/managers/${id}/toggle-validation`);
//             return response.data;
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response.data.message || 'Failed to update manager');
//         }
//     }
// );

// export const deleteManager = createAsyncThunk(
//     'managers/delete',
//     async (id: string, thunkAPI) => {
//         try {
//             await api.delete(`/managers/${id}`);
//             return id;
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(err.response.data.message || 'Failed to delete manager');
//         }
//     }
// );

// const managerSlice = createSlice({
//     name: 'managers',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchManagers.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchManagers.fulfilled, (state, action: PayloadAction<Manager[]>) => {
//                 state.managers = action.payload;
//                 state.loading = false;
//             })
//             .addCase(fetchManagers.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             .addCase(toggleValidation.fulfilled, (state, action: PayloadAction<Manager>) => {
//                 const index = state.managers.findIndex((m) => m._id === action.payload._id);
//                 if (index !== -1) {
//                     state.managers[index] = action.payload;
//                 }
//             })
//             .addCase(deleteManager.fulfilled, (state, action: PayloadAction<string>) => {
//                 state.managers = state.managers.filter((m) => m._id !== action.payload);
//             });
//     },
// });

// export default managerSlice.reducer;









// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import api from '../../services/api';

// export interface Manager {
//     _id: string;
//     name: string;
//     email: string;
//     isValid: boolean;
// }

// interface ManagerState {
//     managers: Manager[];
//     loading: boolean;
//     error: string | null;
// }

// const initialState: ManagerState = {
//     managers: [],
//     loading: false,
//     error: null,
// };

// // Fetch all managers
// export const fetchManagers = createAsyncThunk('managers/fetchAll', async (_, thunkAPI) => {
//     try {
//         const response = await api.get('/managers');
//         return response.data;
//     } catch (err: any) {
//         return thunkAPI.rejectWithValue(err.response.data.message || 'Failed to fetch managers');
//     }
// });

// // Toggle validation status
// export const toggleValidation = createAsyncThunk('managers/toggleValidation', async (id: string, thunkAPI) => {
//     try {
//         const response = await api.patch(`/managers/${id}/toggle-validation`);
//         return response.data;
//     } catch (err: any) {
//         return thunkAPI.rejectWithValue(err.response.data.message || 'Failed to update manager');
//     }
// });

// // Delete a manager
// export const deleteManager = createAsyncThunk('managers/delete', async (id: string, thunkAPI) => {
//     try {
//         await api.delete(`/managers/${id}`);
//         return id;
//     } catch (err: any) {
//         return thunkAPI.rejectWithValue(err.response.data.message || 'Failed to delete manager');
//     }
// });

// // ✅ Invalidate a manager (new addition)
// export const invalidateManager = createAsyncThunk('managers/invalidate', async (id: string, thunkAPI) => {
//     try {
//         const response = await api.patch(`/managers/invalidate/${id}`);
//         return response.data;
//     } catch (err: any) {
//         return thunkAPI.rejectWithValue(err.response.data.message || 'Failed to invalidate manager');
//     }
// });
// export const validateManager = createAsyncThunk('managers/validate', async (id: string, thunkAPI) => {
//     try {
//         const response = await api.patch(`/managers/validate/${id}`);
//         return response.data;
//     } catch (err: any) {
//         return thunkAPI.rejectWithValue(err.response?.data?.message || 'Validation failed');
//     }
// });

// const managerSlice = createSlice({
//     name: 'managers',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchManagers.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchManagers.fulfilled, (state, action: PayloadAction<Manager[]>) => {
//                 state.managers = action.payload;
//                 state.loading = false;
//             })
//             .addCase(fetchManagers.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             .addCase(toggleValidation.fulfilled, (state, action: PayloadAction<Manager>) => {
//                 const index = state.managers.findIndex((m) => m._id === action.payload._id);
//                 if (index !== -1) {
//                     state.managers[index] = action.payload;
//                 }
//             })
//             .addCase(deleteManager.fulfilled, (state, action: PayloadAction<string>) => {
//                 state.managers = state.managers.filter((m) => m._id !== action.payload);
//             })
//             .addCase(invalidateManager.fulfilled, (state, action: PayloadAction<Manager>) => {
//                 const index = state.managers.findIndex((m) => m._id === action.payload._id);
//                 if (index !== -1) {
//                     state.managers[index] = action.payload;
//                 }
//             })
//             .addCase(validateManager.fulfilled, (state, action: PayloadAction<Manager>) => {
//                 const index = state.managers.findIndex((m) => m._id === action.payload._id);
//                 if (index !== -1) {
//                     state.managers[index] = action.payload;
//                 }
//               })
//     },
// });

// export default managerSlice.reducer;







// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import api from '../../services/api';

// export interface Manager {
//   _id: string;
//   name: string;
//   email: string;
//   isValid: boolean;
// }

// interface ManagerState {
//   managers: Manager[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ManagerState = {
//   managers: [],
//   loading: false,
//   error: null,
// };

// // ✅ Fetch all managers (using /manager/list)
// export const fetchManagers = createAsyncThunk(
//   'managers/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       const response = await api.get('/manager/list?page=1&limit=50'); // you can make page & limit dynamic too
//       return response.data.data; // assuming response has { data: [...] }
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to fetch managers'
//       );
//     }
//   }
// );

// // ✅ Validate a manager
// export const validateManager = createAsyncThunk(
//   'managers/validate',
//   async (id: string, thunkAPI) => {
//     try {
//       const response = await api.patch(`/manager/Validate?managerId=${id}`);
//       return response.data.data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Validation failed'
//       );
//     }
//   }
// );

// // ✅ Invalidate a manager
// export const invalidateManager = createAsyncThunk(
//   'managers/invalidate',
//   async (id: string, thunkAPI) => {
//     try {
//       const response = await api.patch(`/manager/Invalidate?managerId=${id}`);
//       return response.data.data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to invalidate manager'
//       );
//     }
//   }
// );

// // ✅ Delete a manager (via restaurantId)
// export const deleteManager = createAsyncThunk(
//   'managers/delete',
//   async (restaurantId: string, thunkAPI) => {
//     try {
//       await api.delete(`/manager/${restaurantId}`);
//       return restaurantId;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to delete manager'
//       );
//     }
//   }
// );

// const managerSlice = createSlice({
//   name: 'managers',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchManagers.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchManagers.fulfilled, (state, action: PayloadAction<Manager[]>) => {
//         state.managers = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchManagers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(validateManager.fulfilled, (state, action: PayloadAction<Manager>) => {
//         const index = state.managers.findIndex((m) => m._id === action.payload._id);
//         if (index !== -1) state.managers[index] = action.payload;
//       })
//       .addCase(invalidateManager.fulfilled, (state, action: PayloadAction<Manager>) => {
//         const index = state.managers.findIndex((m) => m._id === action.payload._id);
//         if (index !== -1) state.managers[index] = action.payload;
//       })
//       .addCase(deleteManager.fulfilled, (state, action: PayloadAction<string>) => {
//         state.managers = state.managers.filter((m) => m._id !== action.payload);
//       });
//   },
// });

// export default managerSlice.reducer;









// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import * as managerAPI from '../../services/managerAPI';


// export interface Manager {
//   isBlocked: any;
//   _id: string;
//   name: string;
//   email: string;
//   isValidated: boolean;
//   restaurants?: any[];
// }

// interface ManagerState {
//   managers: Manager[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ManagerState = {
//   managers: [],
//   loading: false,
//   error: null,
// };

// export const fetchManagers = createAsyncThunk(
//   'managers/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       const response = await managerAPI.fetchManagers();
//       return response.data.data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to fetch managers'
//       );
//     }
//   }
// );
// export const validateManager = createAsyncThunk(
//     'managers/validate',
//     async ({ managerId, restaurantId }: { managerId: string; restaurantId: string }, thunkAPI) => {
//       const response = await api.patch(`/managers/Validate?managerId=${managerId}`);
//       return response.data;
//     }
//   );
  
//   export const invalidateManager = createAsyncThunk(
//     'managers/invalidate',
//     async ({ managerId, restaurantId }: { managerId: string; restaurantId: string }, thunkAPI) => {
//       const response = await api.patch(`/managers/Invalidate?managerId=${managerId}`);
//       return response.data;
//     }
//   );
  
//   export const blockManager = createAsyncThunk(
//     'managers/block',
//     async ({ managerId, restaurantId }: { managerId: string; restaurantId: string }, thunkAPI) => {
//       const response = await api.patch(`/admin/managers/${managerId}/block?restaurantId=${restaurantId}`);
//       return response.data;
//     }
//   );
  
//   export const deleteManager = createAsyncThunk(
//     'managers/delete',
//     async ({ managerId, restaurantId }: { managerId: string; restaurantId: string }, thunkAPI) => {
//       const response = await api.delete(`/admin/managers/${managerId}?restaurantId=${restaurantId}`);
//       return { managerId };
//     }
//   );
  

// const managerSlice = createSlice({
//   name: 'managers',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchManagers.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchManagers.fulfilled, (state, action: PayloadAction<Manager[]>) => {
//         state.managers = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchManagers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(validateManager.fulfilled, (state, action: PayloadAction<Manager>) => {
//         const index = state.managers.findIndex((m) => m._id === action.payload._id);
//         if (index !== -1) state.managers[index] = action.payload;
//       })
//       .addCase(invalidateManager.fulfilled, (state, action: PayloadAction<Manager>) => {
//         const index = state.managers.findIndex((m) => m._id === action.payload._id);
//         if (index !== -1) state.managers[index] = action.payload;
//       })
//       .addCase(deleteManager.fulfilled, (state, action: PayloadAction<string>) => {
//         state.managers = state.managers.filter((m) => m._id !== action.payload);
//       });
//   },
// });

// export default managerSlice.reducer;




// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../services/api";

// // Interfaces for type safety
// interface Manager {
//   isInValidated: boolean;
//   status: any;
//   isBlocked: any;
//   isValidated: boolean;
//   _id: string;
//   email: string;
//   restaurantId?: string; // Added to support blockRestaurant action
// }

// interface ManagersState {
//   managers: Manager[];
//   total: number;
//   currentPage: number;
//   totalPages: number; // Added for complete pagination
//   loading: boolean;
//   error: string | null;
//   actionStatus: string | null;
// }

// interface ManagersListResponse {
//   data: Manager[];
//   pagination: {
//     currentPage: number;
//     totalPages: number;
//     totalItems: number;
//     limit: number;
//   };
// }

// interface GetManagersParams {
//   page?: number;
//   limit?: number;
// }

// interface ActionParams {
//   restaurantId?: string;
//   managerId?: string;
// }

// // Initial state
// const initialState: ManagersState = {
//   managers: [],
//   total: 0,
//   currentPage: 1,
//   totalPages: 1,
//   loading: false,
//   error: null,
//   actionStatus: null,
// };

// // Async thunk for getting paginated list of managers
// export const getManagersList = createAsyncThunk<
//   ManagersListResponse,
//   GetManagersParams,
//   { rejectValue: string }
// >(
//   "manager/getManagersList",
//   async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
//     try {
//       const response = await api.get<ManagersListResponse>("/manager/list", {
//         params: { page, limit },
//       });
//       console.log(response)
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Async thunk for blocking a restaurant
// export const blockRestaurant = createAsyncThunk<
//   void,
//   ActionParams,
//   { rejectValue: string }
// >("manager/blockRestaurant", async ({ managerId }, { rejectWithValue }) => {
//   try {
//     await api.patch(`/manager/block?managerId=${managerId}`);
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || error.message);
//   }
// });

// // Async thunk for validating a manager
// export const validateManager = createAsyncThunk<
//   void,
//   ActionParams,
//   { rejectValue: string }
// >("manager/validateManager", async ({ managerId }, { rejectWithValue }) => {
//   try {
//     await api.patch(`/manager/Validate?managerId=${managerId}`);
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || error.message);
//   }
// });

// // Async thunk for invalidating a manager
// export const invalidateManager = createAsyncThunk<
//   void,
//   ActionParams,
//   { rejectValue: string }
// >("manager/invalidateManager", async ({ managerId }, { rejectWithValue }) => {
//   try {
//     await api.patch(`/manager/Invalidate?managerId=${managerId}`);
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || error.message);
//   }
// });

// // Async thunk for deleting a manager
// export const deleteManager = createAsyncThunk<
//   void,                          
//   ActionParams,                  
//   { rejectValue: string }        
// >("manager/deleteManager", 
  
//   async ({ managerId }, { rejectWithValue }) => {
//   try {
//     await api.delete(`/manager/${managerId}`);
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || error.message);
//   }
// });

// const managerSlice = createSlice({
//   name: "manager",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearActionStatus: (state) => {
//       state.actionStatus = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // Get Managers List
//     builder
//       .addCase(getManagersList.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getManagersList.fulfilled, (state, action) => {
//         state.loading = false;
//         state.managers = action.payload.data || [];
//         state.total = action.payload.pagination.totalItems || 0;
//         state.currentPage = action.payload.pagination.currentPage || 1;
//         state.totalPages = action.payload.pagination.totalPages || 1;
//       })
//       .addCase(getManagersList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch managers";
//       });

//     // Block Restaurant
//     builder
//       .addCase(blockRestaurant.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.actionStatus = null;
//       })
//       .addCase(blockRestaurant.fulfilled, (state) => {
//         state.loading = false;
//         state.actionStatus = "Restaurant blocked successfully";
//       })
//       .addCase(blockRestaurant.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to block restaurant";
//       });

//     // Validate Manager
//     builder
//       .addCase(validateManager.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.actionStatus = null;
//       })
//       .addCase(validateManager.fulfilled, (state) => {
//         state.loading = false;
//         state.actionStatus = "Manager validated successfully";
//       })
//       .addCase(validateManager.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to validate manager";
//       });

//     // Invalidate Manager
//     builder
//       .addCase(invalidateManager.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.actionStatus = null;
//       })
//       .addCase(invalidateManager.fulfilled, (state) => {
//         state.loading = false;
//         state.actionStatus = "Manager invalidated successfully";
//       })
//       .addCase(invalidateManager.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to invalidate manager";
//       });

//       // Delete Manager
// builder
// .addCase(deleteManager.pending, (state) => {
//   state.loading = true;
//   state.error = null;
//   state.actionStatus = null;
// })
// .addCase(deleteManager.fulfilled, (state) => {
//   state.loading = false;
//   state.actionStatus = "Manager deleted successfully";
// })
// .addCase(deleteManager.rejected, (state, action) => {
//   state.loading = false;
//   state.error = action.payload || "Failed to delete manager";
// });

// }

// });

// export const { clearError, clearActionStatus } = managerSlice.actions;
// export default managerSlice.reducer;




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