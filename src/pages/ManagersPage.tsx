// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../app/store';
// import {
//     fetchManagers,
//     toggleValidation,
//     deleteManager,
// } from '../features/managers/managerSlice';

// const ManagersPage = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { managers, loading, error } = useSelector((state: RootState) => state.managers);

//     useEffect(() => {
//         dispatch(fetchManagers());
//     }, [dispatch]);

//     const handleToggle = (id: string) => {
//         dispatch(toggleValidation(id));
//     };

//     const handleDelete = (id: string) => {
//         if (confirm('Are you sure you want to delete this manager?')) {
//             dispatch(deleteManager(id));
//         }
//     };

//     return (
//         <div className="p-6 min-h-screen bg-gray-50">
//             <h1 className="text-2xl font-bold text-blue-800 mb-4">Managers</h1>
//             {loading ? (
//                 <p>Loading managers...</p>
//             ) : error ? (
//                 <p className="text-red-500">{error}</p>
//             ) : (
//                 <div className="overflow-x-auto rounded-lg shadow">
//                     <table className="min-w-full bg-white border border-gray-200 text-left">
//                         <thead className="bg-blue-100 text-blue-800">
//                             <tr>
//                                 <th className="py-3 px-4">Name</th>
//                                 <th className="py-3 px-4">Email</th>
//                                 <th className="py-3 px-4">Status</th>
//                                 <th className="py-3 px-4">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {managers.map((manager) => (
//                                 <tr key={manager._id} className="border-t">
//                                     <td className="py-2 px-4">{manager.name}</td>
//                                     <td className="py-2 px-4">{manager.email}</td>
//                                     <td className="py-2 px-4">
//                                         {manager.isValid ? (
//                                             <span className="text-green-600 font-semibold">Valid</span>
//                                         ) : (
//                                             <span className="text-red-600 font-semibold">Invalid</span>
//                                         )}
//                                     </td>
//                                     <td className="py-2 px-4 space-x-2">
//                                         <button
//                                             onClick={() => handleToggle(manager._id)}
//                                             className={`px-4 py-1 rounded-md text-white ${manager.isValid ? 'bg-yellow-500' : 'bg-green-500'
//                                                 }`}
//                                         >
//                                             {manager.isValid ? 'Invalidate' : 'Validate'}
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(manager._id)}
//                                             className="px-4 py-1 rounded-md text-white bg-red-500"
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ManagersPage;

// src/pages/ManagersPage.tsx

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "../app/store";
// import {
//   fetchManagers,
//   validateManager,
//   invalidateManager,
//   blockManager,
//   deleteManager,
// } from "../features/managers/managerSlice";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import Spinner from "../components/Spinner";
// import { showSuccess, showError } from "../utils/toastHelper";

// const ManagersPage = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { managers, loading } = useSelector(
//     (state: RootState) => state.managers
//   );

//   useEffect(() => {
//     dispatch(fetchManagers());
//   }, [dispatch]);

//   const handleValidateToggle = async (mgr: any) => {
//     // console.log(mgr);
//     // if (!mgr.restaurants || mgr.restaurants.length === 0) {
//     //   return showError("No restaurants assigned to this manager.");
//     // }

//     // const restaurantId = mgr.restaurants[0]._id;

//     // try {
//     //   if (mgr.isValidated) {
//     //     await dispatch(
//     //       invalidateManager({ managerId: mgr._id, restaurantId })
//     //     ).unwrap();
//     //     showSuccess("Manager invalidated");
//     //   } else {
//     //     await dispatch(
//     //       validateManager({ managerId: mgr._id, restaurantId })
//     //     ).unwrap();
//     //     showSuccess("Manager validated");
//     //   }
//     // } catch (err: any) {
//     //   showError(err);
//     // }
//     console.log(mgr._id);
//     dispatch(
//       validateManager({
//         managerId: mgr._id,
//         restaurantId: "",
//       })
//     );
//   };

//   const handleBlockToggle = async (mgr: any) => {
//     if (!mgr.restaurants || mgr.restaurants.length === 0) {
//       return showError("No restaurants assigned to this manager.");
//     }

//     const restaurantId = mgr.restaurants[0]._id;

//     try {
//       await dispatch(
//         blockManager({ managerId: mgr._id, restaurantId })
//       ).unwrap();
//       showSuccess(mgr.isBlocked ? "Manager unblocked" : "Manager blocked");
//     } catch (err: any) {
//       showError(err);
//     }
//   };

//   const handleDelete = async (mgr: any) => {
//     if (!mgr.restaurants || mgr.restaurants.length === 0) {
//       return showError("No restaurants assigned to this manager.");
//     }

//     const restaurantId = mgr.restaurants[0]._id;

//     try {
//       await dispatch(
//         deleteManager({ managerId: mgr._id, restaurantId })
//       ).unwrap();
//       showSuccess("Manager deleted");
//     } catch (err: any) {
//       showError(err);
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex flex-col flex-grow ml-64">
//         <Header />
//         <main className="p-6 bg-gray-50 min-h-screen">
//           <h2 className="text-2xl font-bold text-blue-800 mb-6">Managers</h2>
//           {loading ? (
//             <Spinner />
//           ) : (
//             <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
//               <thead className="bg-blue-100 text-blue-800">
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Validated</th>
//                   <th>Blocked</th>
//                   <th>Restaurants</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {managers.map((mgr) => (
//                   <tr key={mgr._id} className="border-t">
//                     <td className="px-4 py-3">{mgr.name}</td>
//                     <td className="px-4 py-3">{mgr.email}</td>
//                     <td className="px-4 py-3">
//                       {mgr.isValidated ? "Yes" : "No"}
//                     </td>
//                     <td className="px-4 py-3">
//                       {mgr.isBlocked ? "Yes" : "No"}
//                     </td>
//                     <td className="px-4 py-3">
//                       {mgr.restaurants?.length || 0}
//                     </td>
//                     <td className="px-4 py-3 flex gap-2">
//                       <button
//                         onClick={() => handleValidateToggle(mgr)}
//                         className={`px-3 py-1 rounded-md font-semibold ${
//                           mgr.isValidated
//                             ? "bg-yellow-500 hover:bg-yellow-600"
//                             : "bg-green-500 hover:bg-green-600"
//                         } text-white`}
//                       >
//                         {mgr.isValidated ? "Invalidate" : "Validate"}
//                       </button>

//                       <button
//                         onClick={() => handleBlockToggle(mgr)}
//                         className={`px-3 py-1 rounded-md font-semibold ${
//                           mgr.isBlocked
//                             ? "bg-green-500 hover:bg-green-600"
//                             : "bg-red-500 hover:bg-red-600"
//                         } text-white`}
//                       >
//                         {mgr.isBlocked ? "Unblock" : "Block"}
//                       </button>

//                       <button
//                         onClick={() => handleDelete(mgr)}
//                         className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md font-semibold"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ManagersPage;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "../app/store";
// import {
//   getManagersList,
//   validateManager,
//   invalidateManager,
//   blockRestaurant,
//   deleteManager,
//   clearError,
//   clearActionStatus,
// } from "../features/managers/managerSlice";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import Spinner from "../components/Spinner";
// import { showSuccess, showError } from "../utils/toastHelper";
// import AdminChart from "../components/managerCharts";

// // Define Manager interface to match the slice
// interface Manager {
//   _id: string;
//   email: string;
//   restaurantId?: string;
// }

// const ManagersPage = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { managers, loading, error, actionStatus, currentPage, totalPages } =
//     useSelector((state: RootState) => state.manager);
//   const [page, setPage] = useState(1); // Local state for pagination

//   const limit = 10;

//   useEffect(() => {
//     console.log("Admin token:", localStorage.getItem("admin_token"));
//     console.log(`Fetching managers for page ${page}...`);
//     dispatch(getManagersList({ page, limit }))
//       .unwrap()
//       .then((response) => {
//         console.log("Managers fetched:", response.managers);
//       })
//       .catch((err) => {
//         console.error("Fetch managers error:", err);
//       });
//   }, [dispatch, page]); // Only refetch when page changes

//   // Handle action status and errors in a separate useEffect
//   useEffect(() => {
//     if (actionStatus) {
//       showSuccess(actionStatus);
//       dispatch(clearActionStatus());
//     }
//     if (error) {
//       showError(error);
//       dispatch(clearError());
//     }
//   }, [actionStatus, error, dispatch]);

//   const handleValidate = async (mgr: Manager) => {
//     try {
//       await dispatch(validateManager({ managerId: mgr._id })).unwrap();

//       console.log(`Validated manager: ${mgr._id}`);
//     } catch (err: any) {
//       console.error("Validate manager error:", err);
//     }
//   };

//   const handleInvalidate = async (mgr: Manager) => {
//     try {
//       await dispatch(invalidateManager({ managerId: mgr._id })).unwrap();

//       console.log(`Invalidated manager: ${mgr._id}`);
//     } catch (err: any) {
//       console.error("Invalidate manager error:", err);
//     }
//   };

//   const handleBlock = async (mgr: Manager) => {
//     try {
//       await dispatch(blockRestaurant({ managerId: mgr._id })).unwrap();
//       console.log(`Invalidated manager: ${mgr._id}`);
//     } catch (err: any) {
//       console.error("Invalidate manager error:", err);
//     }
//   };

//   const handleDelete = async (mgr: Manager) => {
//     try {
//       console.log("Deleting manager with ID:", mgr._id);
//       await dispatch(deleteManager({ managerId: mgr._id })).unwrap();
//       console.log(`Deleted manager: ${mgr._id}`);
//       window.location.reload();
//     } catch (err: any) {
//       console.error("Delete manager error:", err);
//     }
//   };

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex flex-col flex-grow ml-64">
//         <Header />
//         <main className="p-6 bg-gray-50 min-h-screen">
//           <h2 className="text-2xl font-bold text-blue-800 mb-6">Managers</h2>

//           {/* main content */}
//           {loading ? (
//             <Spinner />
//           ) : managers.length === 0 ? (
//             <div className="text-gray-600 text-center">
//               No managers found. Try refreshing or check the API.
//             </div>
//           ) : (
//             <>
//               <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
//                 <thead className="bg-blue-100 text-blue-800">
//                   <tr>
//                     <th className="px-4 py-2">Email</th>
//                     <th className="px-4 py-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {managers.map((mgr) => (
//                     <tr key={mgr._id} className="border-t">
//                       <td className="px-4 py-3">{mgr.email}</td>
//                       <td className="px-4 py-3 flex gap-2">
//                         <button
//                           onClick={() => handleValidate(mgr)}
//                           className="px-3 py-1 rounded-md font-semibold bg-green-500 hover:bg-green-600 text-white"
//                         >
//                           Validate
//                         </button>
//                         <button
//                           onClick={() => handleInvalidate(mgr)}
//                           className="px-3 py-1 rounded-md font-semibold bg-yellow-500 hover:bg-yellow-600 text-white"
//                         >
//                           Invalidate
//                         </button>
//                         <button
//                           onClick={() => handleBlock(mgr)}
//                           className="px-3 py-1 rounded-md font-semibold bg-red-500 hover:bg-red-600 text-white"
//                         >
//                           Block
//                         </button>
//                         <button
//                           onClick={() => handleDelete(mgr)}
//                           className="px-3 py-1 rounded-md font-semibold bg-gray-700 hover:bg-gray-800 text-white"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {/* Pagination Controls */}
//               <div className="flex justify-between items-center mt-4">
//                 <button
//                   onClick={() => handlePageChange(page - 1)}
//                   disabled={page === 1}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
//                 >
//                   Previous
//                 </button>
//                 <span>
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   onClick={() => handlePageChange(page + 1)}
//                   disabled={page === totalPages}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//       <AdminChart />
//     </div>
//   );
// };

// export default ManagersPage;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "../app/store";
// import {
//   getManagersList,
//   validateManager,
//   invalidateManager,
//   blockRestaurant,
//   deleteManager,
//   clearError,
//   clearActionStatus,
// } from "../features/managers/managerSlice";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import Spinner from "../components/Spinner";
// import { showSuccess, showError } from "../utils/toastHelper";
// import AdminChart from "../components/managerCharts";

// // Define Manager interface to match the slice
// interface Manager {
//   _id: string;
//   email: string;
//   restaurantId?: string;
//   isDeleted: boolean;
//   isBlocked: boolean;
// }

// const ManagersPage = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { managers, loading, error, actionStatus, currentPage, totalPages } =
//     useSelector((state: RootState) => state.manager);
//   const [page, setPage] = useState(1); // Local state for pagination
//   const [filterDeleted, setFilterDeleted] = useState<boolean | null>(null); // Filter for isDeleted
//   const [filterBlocked, setFilterBlocked] = useState<boolean | null>(null); // Filter for isBlocked
//   const limit = 10;

//   useEffect(() => {
//     console.log("Admin token:", localStorage.getItem("admin_token"));
//     console.log(
//       `Fetching managers for page ${page} with filters: isDeleted=${filterDeleted}, isBlocked=${filterBlocked}`
//     );
//     dispatch(
//       getManagersList({
//         page,
//         limit,
//         isDeleted: filterDeleted,
//         isBlocked: filterBlocked,
//       })
//     )
//       .unwrap()
//       .then((response) => {
//         console.log("Managers fetched:", response.managers);
//       })
//       .catch((err) => {
//         console.error("Fetch managers error:", err);
//       });
//   }, [dispatch, page, filterDeleted, filterBlocked]); // Refetch when filters change

//   // Handle action status and errors in a separate useEffect
//   useEffect(() => {
//     if (actionStatus) {
//       showSuccess(actionStatus);
//       dispatch(clearActionStatus());
//     }
//     if (error) {
//       showError(error);
//       dispatch(clearError());
//     }
//   }, [actionStatus, error, dispatch]);

//   const handleValidate = async (mgr: Manager) => {
//     try {
//       await dispatch(validateManager({ managerId: mgr._id })).unwrap();
//       console.log(`Validated manager: ${mgr._id}`);
//     } catch (err: any) {
//       console.error("Validate manager error:", err);
//     }
//   };

//   const handleInvalidate = async (mgr: Manager) => {
//     try {
//       await dispatch(invalidateManager({ managerId: mgr._id })).unwrap();
//       console.log(`Invalidated manager: ${mgr._id}`);
//     } catch (err: any) {
//       console.error("Invalidate manager error:", err);
//     }
//   };

//   const handleBlock = async (mgr: Manager) => {
//     try {
//       await dispatch(blockRestaurant({ managerId: mgr._id })).unwrap();
//       console.log(`Blocked manager: ${mgr._id}`);
//     } catch (err: any) {
//       console.error("Block manager error:", err);
//     }
//   };

//   const handleDelete = async (mgr: Manager) => {
//     try {
//       console.log("Deleting manager with ID:", mgr._id);
//       await dispatch(deleteManager({ managerId: mgr._id })).unwrap();
//       console.log(`Deleted manager: ${mgr._id}`);
//       window.location.reload();
//     } catch (err: any) {
//       console.error("Delete manager error:", err);
//     }
//   };

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex flex-col flex-grow ml-64">
//         <Header />
//         <main className="p-6 bg-gray-50 min-h-screen">
//           <h2 className="text-2xl font-bold text-blue-800 mb-6">Managers</h2>

//           {/* Filter Controls */}
//           <div className="mb-4 flex space-x-4">
//             {/* <select
//               value={filterDeleted === null ? "" : filterDeleted.toString()}
//               onChange={(e) =>
//                 setFilterDeleted(
//                   e.target.value === "" ? null : e.target.value === "true"
//                 )
//               }
//               className="border p-2 rounded"
//             >
//               <option value="">All Deleted Status</option>
//               <option value="true">Deleted</option>
//               <option value="false">Not Deleted</option>
//             </select> */}
//             <select
//               value={filterBlocked === null ? "" : filterBlocked.toString()}
//               onChange={(e) =>
//                 setFilterBlocked(
//                   e.target.value === "" ? null : e.target.value === "true"
//                 )
//               }
//               className="border p-2 rounded"
//             >
//               <option value="">All Blocked Status</option>
//               <option value="true">Blocked</option>
//               <option value="false">Not Blocked</option>
//             </select>
//           </div>

//           {/* main content */}
//           {loading ? (
//             <Spinner />
//           ) : managers.length === 0 ? (
//             <div className="text-gray-600 text-center">
//               No managers found. Try adjusting filters or check the API.
//             </div>
//           ) : (
//             <>
//               <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
//                 <thead className="bg-blue-100 text-blue-800">
//                   <tr>
//                     <th className="px-4 py-2">Email</th>
//                     <th className="px-4 py-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {managers.map((mgr) => (
//                     <tr key={mgr._id} className="border-t">
//                       <td className="px-4 py-3">{mgr.email}</td>
//                       <td className="px-4 py-3 flex gap-2">
//                         <button
//                           onClick={() => handleValidate(mgr)}
//                           className="px-3 py-1 rounded-md font-semibold bg-green-500 hover:bg-green-600 text-white"
//                         >
//                           Validate
//                         </button>
//                         <button
//                           onClick={() => handleInvalidate(mgr)}
//                           className="px-3 py-1 rounded-md font-semibold bg-yellow-500 hover:bg-yellow-600 text-white"
//                         >
//                           Invalidate
//                         </button>
//                         <button
//                           onClick={() => handleBlock(mgr)}
//                           className="px-3 py-1 rounded-md font-semibold bg-red-500 hover:bg-red-600 text-white"
//                         >
//                           Block
//                         </button>
//                         <button
//                           onClick={() => handleDelete(mgr)}
//                           className="px-3 py-1 rounded-md font-semibold bg-gray-700 hover:bg-gray-800 text-white"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {/* Pagination Controls */}
//               <div className="flex justify-between items-center mt-4">
//                 <button
//                   onClick={() => handlePageChange(page - 1)}
//                   disabled={page === 1}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
//                 >
//                   Previous
//                 </button>
//                 <span>
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   onClick={() => handlePageChange(page + 1)}
//                   disabled={page === totalPages}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//       <AdminChart />
//     </div>
//   );
// };

// export default ManagersPage;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "../app/store";
// import {
//   getManagersList,
//   validateManager,
//   invalidateManager,
//   blockRestaurant,
//   deleteManager,
//   clearError,
//   clearActionStatus,
// } from "../features/managers/managerSlice";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import Spinner from "../components/Spinner";
// import { showSuccess, showError } from "../utils/toastHelper";
// import AdminChart from "../components/managerCharts";

// // Define Manager interface to match the slice
// interface Manager {
//   _id: string;
//   email: string;
//   restaurantId?: string;
//   isDeleted: boolean;
//   isBlocked: boolean;
// }

// const ManagersPage = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { managers, loading, error, actionStatus, currentPage, totalPages } =
//     useSelector((state: RootState) => state.manager);
//   const [page, setPage] = useState(1); // Local state for pagination
//   const [filterDeleted, setFilterDeleted] = useState<boolean | null>(null); // Filter for isDeleted
//   const [filterBlocked, setFilterBlocked] = useState<boolean | null>(null); // Filter for isBlocked
//   const limit = 10;

//   useEffect(() => {
//     console.log("Admin token:", localStorage.getItem("admin_token"));
//     console.log(
//       `Fetching managers for page ${page} with filters: isDeleted=${filterDeleted}, isBlocked=${filterBlocked}`
//     );
//     dispatch(
//       getManagersList({
//         page,
//         limit,
//         isDeleted: filterDeleted,
//         isBlocked: filterBlocked,
//       })
//     )
//       .unwrap()
//       .then((response) => {
//         console.log("Managers fetched:", response.managers);
//       })
//       .catch((err) => {
//         console.error("Fetch managers error:", err);
//       });
//   }, [dispatch, page, filterDeleted, filterBlocked]); // Refetch when filters change

//   // Handle action status and errors in a separate useEffect
//   useEffect(() => {
//     if (actionStatus) {
//       showSuccess(actionStatus);
//       dispatch(clearActionStatus());
//     }
//     if (error) {
//       showError(error);
//       dispatch(clearError());
//     }
//   }, [actionStatus, error, dispatch]);

//   const handleValidate = async (mgr: Manager) => {
//     try {
//       await dispatch(validateManager({ managerId: mgr._id })).unwrap();
//       console.log(`Validated manager: ${mgr._id}`);
//     } catch (err: any) {
//       console.error("Validate manager error:", err);
//     }
//   };

//   const handleInvalidate = async (mgr: Manager) => {
//     try {
//       await dispatch(invalidateManager({ managerId: mgr._id })).unwrap();
//       console.log(`Invalidated manager: ${mgr._id}`);
//     } catch (err: any) {
//       console.error("Invalidate manager error:", err);
//     }
//   };

//   const handleBlock = async (mgr: Manager) => {
//     try {
//       await dispatch(blockRestaurant({ managerId: mgr._id })).unwrap();
//       console.log(`Blocked manager: ${mgr._id}`);
//     } catch (err: any) {
//       console.error("Block manager error:", err);
//     }
//   };

//   const handleDelete = async (mgr: Manager) => {
//     try {
//       console.log("Deleting manager with ID:", mgr._id);
//       await dispatch(deleteManager({ managerId: mgr._id })).unwrap();
//       console.log(`Deleted manager: ${mgr._id}`);
//       window.location.reload();
//     } catch (err: any) {
//       console.error("Delete manager error:", err);
//     }
//   };

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };

//   const clearFilters = () => {
//     setFilterBlocked(null);
//     setFilterDeleted(null);
//     setPage(1);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex flex-col flex-grow ml-64 w-full">
//         <Header />
//         <main className="flex-1 p-8 w-full max-w-full">
//           {/* Page Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Manager Management
//             </h1>
//             <p className="text-gray-600">
//               Manage restaurant managers and their permissions
//             </p>
//           </div>

//           {/* Filters Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//             <div className="flex items-center justify-between">
//               <div className="space-y-2">
//                 <label className="block text-base font-medium text-gray-700">
//                   Account Status
//                 </label>
//                 <select
//                   value={filterBlocked === null ? "" : filterBlocked.toString()}
//                   onChange={(e) =>
//                     setFilterBlocked(
//                       e.target.value === "" ? null : e.target.value === "true"
//                     )
//                   }
//                   className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-base"
//                 >
//                   <option value="">All Statuses</option>
//                   <option value="false">Active</option>
//                   <option value="true">Blocked</option>
//                 </select>
//               </div>
//               <button
//                 onClick={clearFilters}
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 text-base"
//               >
//                 Clear all filters
//               </button>
//             </div>
//           </div>

//           {/* Table Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//             {loading ? (
//               <div className="flex justify-center items-center py-12">
//                 <Spinner />
//               </div>
//             ) : managers.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 mb-4">
//                   <svg
//                     className="mx-auto h-12 w-12"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   No managers found
//                 </h3>
//                 <p className="text-gray-600">
//                   Try adjusting your filters or check back later.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-blue-600 border-b border-blue-700">
//                       <tr>
//                         <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
//                           Manager Details
//                         </th>
//                         <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
//                           Restaurant ID
//                         </th>
//                         <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {managers.map((mgr) => (
//                         <tr
//                           key={mgr._id}
//                           className="hover:bg-gray-50 transition-colors duration-150"
//                         >
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="flex-shrink-0 h-10 w-10">
//                                 <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
//                                   <span className="text-sm font-medium text-blue-800">
//                                     {mgr.email.charAt(0).toUpperCase()}
//                                   </span>
//                                 </div>
//                               </div>
//                               <div className="ml-4">
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {mgr.email}
//                                 </div>
//                                 <div className="text-sm text-gray-500">
//                                   ID: {mgr._id}
//                                 </div>
//                                 <div className="flex space-x-2 mt-1">
//                                   {mgr.isBlocked && (
//                                     <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
//                                       Blocked
//                                     </span>
//                                   )}
//                                   {mgr.isDeleted && (
//                                     <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
//                                       Deleted
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                             {mgr.restaurantId || (
//                               <span className="text-gray-400 italic">
//                                 Not assigned
//                               </span>
//                             )}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                             <div className="flex justify-end space-x-2">
//                               <button
//                                 onClick={() => handleValidate(mgr)}
//                                 className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
//                               >
//                                 Validate
//                               </button>
//                               <button
//                                 onClick={() => handleInvalidate(mgr)}
//                                 className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
//                               >
//                                 Invalidate
//                               </button>
//                               <button
//                                 onClick={() => handleBlock(mgr)}
//                                 className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
//                               >
//                                 Block
//                               </button>
//                               <button
//                                 onClick={() => handleDelete(mgr)}
//                                 className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
//                               >
//                                 Delete
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
//                   <div className="flex-1 flex justify-between sm:hidden">
//                     <button
//                       onClick={() => handlePageChange(page - 1)}
//                       disabled={page === 1}
//                       className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
//                     >
//                       Previous
//                     </button>
//                     <button
//                       onClick={() => handlePageChange(page + 1)}
//                       disabled={page === totalPages}
//                       className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
//                     >
//                       Next
//                     </button>
//                   </div>
//                   <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                     <div>
//                       <p className="text-sm text-gray-700">
//                         Showing page{" "}
//                         <span className="font-medium">{currentPage}</span> of{" "}
//                         <span className="font-medium">{totalPages}</span>
//                       </p>
//                     </div>
//                     <div>
//                       <nav
//                         className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
//                         aria-label="Pagination"
//                       >
//                         <button
//                           onClick={() => handlePageChange(page - 1)}
//                           disabled={page === 1}
//                           className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
//                         >
//                           <span className="sr-only">Previous</span>
//                           <svg
//                             className="h-5 w-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </button>
//                         <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
//                           {currentPage}
//                         </span>
//                         <button
//                           onClick={() => handlePageChange(page + 1)}
//                           disabled={page === totalPages}
//                           className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
//                         >
//                           <span className="sr-only">Next</span>
//                           <svg
//                             className="h-5 w-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </button>
//                       </nav>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </main>

//         {/* Charts Section */}
//         <div className="p-8 pt-0 w-full max-w-full">
//           <AdminChart />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagersPage;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import {
  getManagersList,
  validateManager,
  invalidateManager,
  blockRestaurant,
  deleteManager,
  clearError,
  clearActionStatus,
} from "../features/managers/managerSlice";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { showSuccess, showError } from "../utils/toastHelper";
import AdminChart from "../components/managerCharts";

// Define Manager interface to match the slice
interface Manager {
  _id: string;
  email: string;
  restaurantId?: string;
  isDeleted: boolean;
  isBlocked: boolean;
}

const ManagersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { managers, loading, error, actionStatus, currentPage, totalPages } =
    useSelector((state: RootState) => state.manager);
  const [page, setPage] = useState(1); // Local state for pagination
  const [filterDeleted, setFilterDeleted] = useState<boolean | null>(null); // Filter for isDeleted
  const [filterBlocked, setFilterBlocked] = useState<boolean>(false); // Filter for isBlocked, default to false (Not Blocked)
  const [totalBlockedCount, setTotalBlockedCount] = useState(0); // Count of blocked managers across all pages
  const [totalNotBlockedCount, setTotalNotBlockedCount] = useState(0); // Count of unblocked managers across all pages
  const limit = 10;

  // Update counts based on API response
  const updateCounts = (response: {
    totalBlocked: number;
    totalManagers: number;
  }) => {
    setTotalBlockedCount(response.totalBlocked || 0);
    setTotalNotBlockedCount(
      (response.totalManagers || 0) - (response.totalBlocked || 0)
    );
  };

  useEffect(() => {
    console.log("Admin token:", localStorage.getItem("admin_token"));
    console.log(
      `Fetching managers for page ${page} with filters: isDeleted=${filterDeleted}, isBlocked=${filterBlocked}`
    );
    dispatch(
      getManagersList({
        page,
        limit,
        isDeleted: filterDeleted,
        isBlocked: filterBlocked,
      })
    )
      .unwrap()
      .then((response) => {
        console.log("Managers fetched:", response.managers);
        updateCounts({
          totalBlocked: response.totalBlocked || 0,
          totalManagers: response.totalManagers || 0,
        });
      })
      .catch((err) => {
        console.error("Fetch managers error:", err);
      });
  }, [dispatch, page, filterDeleted, filterBlocked]); // Refetch when filters change

  // Handle action status and errors in a separate useEffect
  useEffect(() => {
    if (actionStatus) {
      showSuccess(actionStatus);
      dispatch(clearActionStatus());
      // Refetch managers to update counts after an action
      dispatch(
        getManagersList({
          page,
          limit,
          isDeleted: filterDeleted,
          isBlocked: filterBlocked,
        })
      )
        .unwrap()
        .then((response) => {
          updateCounts({
            totalBlocked: response.totalBlocked || 0,
            totalManagers: response.totalManagers || 0,
          });
        })
        .catch((err) => {
          console.error("Fetch managers error after action:", err);
        });
    }
    if (error) {
      showError(error);
      dispatch(clearError());
    }
  }, [actionStatus, error, dispatch, page, filterDeleted, filterBlocked]);

  const handleValidate = async (mgr: Manager) => {
    try {
      await dispatch(validateManager({ managerId: mgr._id })).unwrap();
      console.log(`Validated manager: ${mgr._id}`);
    } catch (err: any) {
      console.error("Validate manager error:", err);
    }
  };

  const handleInvalidate = async (mgr: Manager) => {
    try {
      await dispatch(invalidateManager({ managerId: mgr._id })).unwrap();
      console.log(`Invalidated manager: ${mgr._id}`);
    } catch (err: any) {
      console.error("Invalidate manager error:", err);
    }
  };

  const handleBlock = async (mgr: Manager) => {
    try {
      await dispatch(blockRestaurant({ managerId: mgr._id })).unwrap();
      console.log(`Blocked manager: ${mgr._id}`);
    } catch (err: any) {
      console.error("Block manager error:", err);
    }
  };

  const handleDelete = async (mgr: Manager) => {
    try {
      console.log("Deleting manager with ID:", mgr._id);
      await dispatch(deleteManager({ managerId: mgr._id })).unwrap();
      console.log(`Deleted manager: ${mgr._id}`);
      window.location.reload();
    } catch (err: any) {
      console.error("Delete manager error:", err);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-grow ml-64 w-full">
        <Header />
        <main className="flex-1 p-8 w-full max-w-full">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manager Management
            </h1>
            
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700">
                  Account Status
                </label>
                <select
                  value={filterBlocked.toString()}
                  onChange={(e) => setFilterBlocked(e.target.value === "true")}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-base"
                >
                  <option value="false">Not Blocked</option>
                  <option value="true">Blocked</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() =>
                    dispatch(
                      getManagersList({
                        page,
                        limit,
                        isDeleted: filterDeleted,
                        isBlocked: filterBlocked,
                      })
                    )
                      .unwrap()
                      .then((response) => {
                        updateCounts({
                          totalBlocked: response.totalBlocked || 0,
                          totalManagers: response.totalManagers || 0,
                        });
                      })
                      .catch((err) => {
                        console.error("Refresh counts error:", err);
                      })
                  }
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-200 text-base"
                >
                  Refresh Counts
                </button>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-700">
             
              
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Spinner />
              </div>
            ) : managers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No managers found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or check back later.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-600 border-b border-blue-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                          Manager Details
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                          Restaurant ID
                        </th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {managers.map((mgr) => (
                        <tr
                          key={mgr._id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-sm font-medium text-blue-800">
                                    {mgr.email.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {mgr.email}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {mgr._id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {mgr.restaurantId || (
                              <span className="text-gray-400 italic">
                                Not assigned
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleValidate(mgr)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                              >
                                Validate
                              </button>
                              <button
                                onClick={() => handleInvalidate(mgr)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                              >
                                Invalidate
                              </button>
                              <button
                                onClick={() => handleBlock(mgr)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                              >
                                Block
                              </button>
                              <button
                                onClick={() => handleDelete(mgr)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing page{" "}
                        <span className="font-medium">{currentPage}</span> of{" "}
                        <span className="font-medium">{totalPages}</span>
                      </p>
                    </div>
                    <div>
                      <nav
                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                      >
                        <button
                          onClick={() => handlePageChange(page - 1)}
                          disabled={page === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                        >
                          <span className="sr-only">Previous</span>
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                          {currentPage}
                        </span>
                        <button
                          onClick={() => handlePageChange(page + 1)}
                          disabled={page === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                        >
                          <span className="sr-only">Next</span>
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>

        {/* Charts Section */}
        <div className="p-8 pt-0 w-full max-w-full">
          <AdminChart
            totalNotBlockedCount={totalNotBlockedCount}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagersPage;
