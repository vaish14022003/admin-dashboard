// import api from './api';

// export const fetchUsers = async () => {
//     const response = await api.get('/admin/users');
//     return response.data;
// };

// export const blockUserById = async (id: string) => {
//     const response = await api.patch(`/admin/users/${id}/block`);
//     return response.data;
// };

// export const unblockUserById = async (id: string) => {
//     const response = await api.patch(`/admin/users/${id}/unblock`);
//     return response.data;
// };



import api from './api';

// GET Users (with pagination)
export const fetchUsers = async (page: number, limit: number) => {
  const response = await api.get('/user/list', {
    params: { page, limit },
  });
  return response.data;
};

// Block user by ID
export const blockUserById = async (id: string) => {
  const response = await api.patch(`/user/block/${id}`);
  return response.data;
};

// Unblock user by ID
export const unblockUserById = async (id: string) => {
  const response = await api.patch(`/user/unblock/${id}`);
  return response.data;
};
