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









import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as managerAPI from '../../services/managerAPI';

export interface Manager {
  isBlocked: any;
  _id: string;
  name: string;
  email: string;
  isValidated: boolean;
  restaurants?: any[];
}

interface ManagerState {
  managers: Manager[];
  loading: boolean;
  error: string | null;
}

const initialState: ManagerState = {
  managers: [],
  loading: false,
  error: null,
};

export const fetchManagers = createAsyncThunk(
  'managers/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await managerAPI.fetchManagers();
      return response.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch managers'
      );
    }
  }
);
export const validateManager = createAsyncThunk(
    'managers/validate',
    async ({ managerId, restaurantId }: { managerId: string; restaurantId: string }, thunkAPI) => {
      const response = await api.patch(`/admin/managers/${managerId}/validate?restaurantId=${restaurantId}`);
      return response.data;
    }
  );
  
  export const invalidateManager = createAsyncThunk(
    'managers/invalidate',
    async ({ managerId, restaurantId }: { managerId: string; restaurantId: string }, thunkAPI) => {
      const response = await api.patch(`/admin/managers/${managerId}/invalidate?restaurantId=${restaurantId}`);
      return response.data;
    }
  );
  
  export const blockManager = createAsyncThunk(
    'managers/block',
    async ({ managerId, restaurantId }: { managerId: string; restaurantId: string }, thunkAPI) => {
      const response = await api.patch(`/admin/managers/${managerId}/block?restaurantId=${restaurantId}`);
      return response.data;
    }
  );
  
  export const deleteManager = createAsyncThunk(
    'managers/delete',
    async ({ managerId, restaurantId }: { managerId: string; restaurantId: string }, thunkAPI) => {
      const response = await api.delete(`/admin/managers/${managerId}?restaurantId=${restaurantId}`);
      return { managerId };
    }
  );
  

const managerSlice = createSlice({
  name: 'managers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchManagers.fulfilled, (state, action: PayloadAction<Manager[]>) => {
        state.managers = action.payload;
        state.loading = false;
      })
      .addCase(fetchManagers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(validateManager.fulfilled, (state, action: PayloadAction<Manager>) => {
        const index = state.managers.findIndex((m) => m._id === action.payload._id);
        if (index !== -1) state.managers[index] = action.payload;
      })
      .addCase(invalidateManager.fulfilled, (state, action: PayloadAction<Manager>) => {
        const index = state.managers.findIndex((m) => m._id === action.payload._id);
        if (index !== -1) state.managers[index] = action.payload;
      })
      .addCase(deleteManager.fulfilled, (state, action: PayloadAction<string>) => {
        state.managers = state.managers.filter((m) => m._id !== action.payload);
      });
  },
});

export default managerSlice.reducer;


