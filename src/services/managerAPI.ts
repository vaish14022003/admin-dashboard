// import api from './api';

// export const fetchManagers = async () => {
//     const response = await api.get('/admin/managers');
//     return response.data;
// };

// export const validateManager = async (id: string) => {
//     const response = await api.patch(`/admin/managers/${id}/validate`);
//     return response.data;
// };

// export const invalidateManager = async (id: string) => {
//     const response = await api.patch(`/admin/managers/${id}/invalidate`);
//     return response.data;
// };

// export const blockManager = async (id: string) => {
//     const response = await api.patch(`/admin/managers/${id}/block`);
//     return response.data;
// };

// export const deleteManager = async (id: string) => {
//     const response = await api.delete(`/admin/managers/${id}`);
//     return response.data;
// };




// import api from './api';

// // Fetch all managers (with optional pagination params if needed)
// export const fetchManagers = async () => {
//   return await api.get('/manager/list?page=1&limit=100');
// };

// // Validate a manager by ID
// export const validateManager = async (id: string) => {
//   return await api.patch(`/manager/Validate?managerId=${id}`);
// };

// // Invalidate a manager by ID
// export const invalidateManager = async (id: string) => {
//   return await api.patch(`/manager/Invalidate?managerId=${id}`);
// };

// // Block a manager by ID
// export const blockManager = async (id: string) => {
//   return await api.patch(`/manager/block?managerId=${id}`);
// };

// // Delete a manager by ID
// export const deleteManager = async (id: string) => {
//   return await api.delete(`/manager/${id}`);
// };




import api from './api';

export const fetchManagers = async () =>
  await api.get('/manager/list?page=1&limit=10');

export const validateManager = async (managerId: string, restaurantId: string) =>
  await api.patch(`/manager/Validate?managerId=${managerId}&restaurantId=${restaurantId}`);

export const invalidateManager = async (managerId: string, restaurantId: string) =>
  await api.patch(`/manager/Invalidate?managerId=${managerId}&restaurantId=${restaurantId}`);

export const blockManager = async (managerId: string, restaurantId: string) =>
  await api.patch(`/manager/Block?managerId=${managerId}&restaurantId=${restaurantId}`);

export const deleteManager = async (managerId: string) =>
  await api.delete(`/manager/${managerId}`);



