// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import type { AppDispatch, RootState } from '../app/store';
// import { fetchAllUsers, toggleBlockUser } from '../features/users/userSlice';

// const UsersPage = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { users, loading, error } = useSelector((state: RootState) => state.users);

//     useEffect(() => {
//         dispatch(fetchAllUsers());
//     }, [dispatch]);

//     const handleToggle = (id: string) => {
//         dispatch(toggleBlockUser(id));
//     };

//     return (
//         <div className="p-6 min-h-screen bg-gray-50">
//             <h1 className="text-2xl font-bold text-blue-800 mb-4">User Management</h1>
//             {loading ? (
//                 <p>Loading users...</p>
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
//                                 <th className="py-3 px-4">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map((user) => (
//                                 <tr key={user._id} className="border-t">
//                                     <td className="py-2 px-4">{user.name}</td>
//                                     <td className="py-2 px-4">{user.email}</td>
//                                     <td className="py-2 px-4">
//                                         {user.isBlocked ? (
//                                             <span className="text-red-600 font-semibold">Blocked</span>
//                                         ) : (
//                                             <span className="text-green-600 font-semibold">Active</span>
//                                         )}
//                                     </td>
//                                     <td className="py-2 px-4">
//                                         <button
//                                             onClick={() => handleToggle(user._id)}
//                                             className={`px-4 py-1 rounded-md text-white ${user.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
//                                                 }`}
//                                         >
//                                             {user.isBlocked ? 'Unblock' : 'Block'}
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

// export default UsersPage;

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import type { RootState, AppDispatch } from '../app/store';
// import {
//     fetchAllUsers,
//     blockUserById,
//     unblockUserById,
// } from '../features/users/userSlice';
// import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';
// import Spinner from '../components/Spinner';
// import { showSuccess, showError } from '../utils/toastHelper';

// const UsersPage = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { users, loading } = useSelector((state: RootState) => state.users);

//     useEffect(() => {
//         dispatch(fetchAllUsers());
//     }, [dispatch]);

//     const handleToggle = async (userId: string, isBlocked: boolean) => {
//         try {
//             if (isBlocked) {
//                 await dispatch(unblockUserById(userId)).unwrap();
//                 showSuccess('User unblocked');
//             } else {
//                 await dispatch(blockUserById(userId)).unwrap();
//                 showSuccess('User blocked');
//             }
//         } catch (err: any) {
//             showError(err);
//         }
//     };

//     return (
//         <div className="flex">
//             <Sidebar />
//             <div className="flex flex-col flex-grow ml-64">
//                 <Header />
//                 <main className="p-6 bg-gray-50 min-h-screen">
//                     <h2 className="text-2xl font-bold text-blue-800 mb-6">Users Management</h2>
//                     {loading ? (
//                         <Spinner />
//                     ) : (
//                         <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
//                             <thead className="bg-blue-100 text-blue-800">
//                                 <tr>
//                                     <th className="px-4 py-3 text-left">Name</th>
//                                     <th className="px-4 py-3 text-left">Email</th>
//                                     <th className="px-4 py-3 text-left">Status</th>
//                                     <th className="px-4 py-3 text-left">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {users.map((user) => (
//                                     <tr key={user._id} className="border-t">
//                                         <td className="px-4 py-3">{user.name}</td>
//                                         <td className="px-4 py-3">{user.email}</td>
//                                         <td className="px-4 py-3">
//                                             {user.isBlocked ? (
//                                                 <span className="text-red-600 font-semibold">Blocked</span>
//                                             ) : (
//                                                 <span className="text-green-600 font-semibold">Active</span>
//                                             )}
//                                         </td>
//                                         <td className="px-4 py-3">
//                                             <button
//                                                 onClick={() => handleToggle(user._id, user.isBlocked)}
//                                                 className={`px-4 py-2 rounded-md font-semibold ${user.isBlocked
//                                                         ? 'bg-green-500 text-white hover:bg-green-600'
//                                                         : 'bg-red-500 text-white hover:bg-red-600'
//                                                     }`}
//                                             >
//                                                 {user.isBlocked ? 'Unblock' : 'Block'}
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default UsersPage;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "../app/store";
// import {
//   fetchAllUsers,
//   blockUserById,
//   unblockUserById,
// } from "../features/users/userSlice";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import Spinner from "../components/Spinner";
// import { showSuccess, showError } from "../utils/toastHelper";

// const UsersPage = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { users, loading, totalPages } = useSelector(
//     (state: RootState) => state.users
//   );

//   const [page, setPage] = useState(1);
//   const limit = 10;

//   useEffect(() => {
//     dispatch(fetchAllUsers({ page, limit }));
//   }, [dispatch, page]);

//   const handleToggle = async (userId: string, isBlocked: boolean) => {
//     try {
//       if (isBlocked) {
//         await dispatch(unblockUserById(userId)).unwrap();
//         showSuccess("User unblocked");
//       } else {
//         await dispatch(blockUserById(userId)).unwrap();
//         showSuccess("User blocked");
//       }
//     } catch (err: any) {
//       showError(err);
//     }
//   };

//   const handlePrevPage = () => {
//     if (page > 1) setPage((prev) => prev - 1);
//   };

//   const handleNextPage = () => {
//     if (page < totalPages) setPage((prev) => prev + 1);
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex flex-col flex-grow ml-64">
//         <Header />
//         <main className="p-6 bg-gray-50 min-h-screen">
//           <h2 className="text-2xl font-bold text-blue-800 mb-6">
//             Users Management
//           </h2>
//           {loading ? (
//             <Spinner />
//           ) : (
//             <>
//               <table className="w-full bg-white shadow-md rounded-xl overflow-hidden mb-4">
//                 <thead className="bg-blue-100 text-blue-800">
//                   <tr>
//                     {/* <th className="px-4 py-3 text-left">Name</th> */}
//                     <th className="px-4 py-3 text-left">Email</th>
//                     <th className="px-4 py-3 text-left">Status</th>
//                     <th className="px-4 py-3 text-left">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user) => (
//                     <tr key={user._id} className="border-t">
//                       {/* <td className="px-4 py-3">{user.name}</td> */}
//                       <td className="px-4 py-3">{user.email}</td>
//                       <td className="px-4 py-3">
//                         {user.isBlocked ? (
//                           <span className="text-red-600 font-semibold">
//                             Blocked
//                           </span>
//                         ) : (
//                           <span className="text-green-600 font-semibold">
//                             Active
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-4 py-3">
//                         <button
//                           onClick={() => handleToggle(user._id, user.isBlocked)}
//                           className={`px-4 py-2 rounded-md font-semibold ${
//                             user.isBlocked
//                               ? "bg-green-500 text-white hover:bg-green-600"
//                               : "bg-red-500 text-white hover:bg-red-600"
//                           }`}
//                         >
//                           {user.isBlocked ? "Unblock" : "Block"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {/* Pagination Controls */}
//               <div className="flex justify-center space-x-4">
//                 <button
//                   onClick={handlePrevPage}
//                   disabled={page === 1}
//                   className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
//                 >
//                   Prev
//                 </button>
//                 <span className="text-lg font-medium">
//                   Page {page} of {totalPages}
//                 </span>
//                 <button
//                   onClick={handleNextPage}
//                   disabled={page === totalPages}
//                   className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UsersPage;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import {
  fetchAllUsers,
  blockUserById,
  unblockUserById,
} from "../features/users/userSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { showSuccess, showError } from "../utils/toastHelper";
import UserChart from "../components/userCharts";

const UsersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, totalPages } = useSelector(
    (state: RootState) => state.users
  );

  //value of page and limit parameters
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(fetchAllUsers({ page, limit }));
  }, [dispatch, page]);

  const handleToggle = async (userId: string, isBlocked: boolean) => {
    try {
      if (isBlocked) {
        await dispatch(unblockUserById(userId)).unwrap();
        showSuccess("User unblocked");
      } else {
        await dispatch(blockUserById(userId)).unwrap();
        showSuccess("User blocked");
      }
    } catch (err: any) {
      showError(err);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  // Calculate stats for the dashboard cards
  const activeUsers = users.filter((user) => !user.isBlocked).length;
  const blockedUsers = users.filter((user) => user.isBlocked).length;
  const totalUsers = users.length;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50  to-blue-100">
      <Sidebar />
      <div className="flex flex-col flex-grow ml-64">
        <Header />
        <main className="p-8 flex-1">
          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold uppercase text-[#4B2E2E] tracking-wide mb-4">
              Users Management
            </h2>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold text-blue-800 mt-1">
                    {totalUsers}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 font-semibold text-sm uppercase tracking-wide">
                    Active Users
                  </p>
                  <p className="text-3xl font-bold text-green-700 mt-1">
                    {activeUsers}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 font-semibold text-sm uppercase tracking-wide">
                    Blocked Users
                  </p>
                  <p className="text-3xl font-bold text-red-700 mt-1">
                    {blockedUsers}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
                <p className="text-blue-600 font-medium text-lg">
                  Loading users...
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              {/* Table */}
              <div className=" overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-50 to-blue-50 border-b border-blue-200">
                    <tr>
                      <th className="px-8 py-5 text-left text-sm font-bold text-blue-800 bg-gradient-to-r from-blue-500 to-blue-200  uppercase">
                        User Email
                      </th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-blue-800 bg-gradient-to-r from-blue-500 to-blue-200 uppercase">
                        Account Status
                      </th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-blue-800 bg-gradient-to-r from-blue-500 to-blue-200 uppercase ">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100">
                    {users.map((user, index) => (
                      <tr
                        key={user._id}
                        className={`hover:bg-gradient-to-r hover:from-orange-25 hover:to-amber-25 transition-all duration-200 ${
                          index % 2 === 0 ? "bg-white" : "bg-orange-25"
                        }`}
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mr-4">
                              <span className="text-white font-bold text-sm">
                                {user.email.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="text-gray-900 font-semibold text-lg">
                                {user.email}
                              </p>
                              <p className="text-gray-500 text-sm">
                                User ID: {user._id.slice(-8)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          {user.isBlocked ? (
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-red-100 text-red-800 border border-red-200">
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Blocked
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-800 border border-green-200">
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Active
                            </span>
                          )}
                        </td>
                        <td className="px-8 py-6">
                          <button
                            onClick={() =>
                              handleToggle(user._id, user.isBlocked)
                            }
                            className={`inline-flex items-center px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg ${
                              user.isBlocked
                                ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-blue-700 shadow-blue-200"
                                : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-blue-700 shadow-red-200"
                            }`}
                          >
                            {user.isBlocked ? (
                              <>
                                <svg
                                  className="w-4 h-4 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                  />
                                </svg>
                                Unblock User
                              </>
                            ) : (
                              <>
                                <svg
                                  className="w-4 h-4 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                                  />
                                </svg>
                                Block User
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Enhanced Pagination */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-8 py-6 border-t border-orange-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-orange-700">
                    <span className="font-medium">
                      Showing page {page} of {totalPages}
                    </span>
                    <span className="ml-2 text-orange-500">
                      ({totalUsers} total users)
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handlePrevPage}
                      disabled={page === 1}
                      className={`inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        page === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-orange-700 hover:bg-orange-100 border border-orange-200 shadow-md hover:shadow-lg transform hover:scale-105"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Previous
                    </button>

                    <div className="flex items-center space-x-1">
                      {[...Array(Math.min(10, totalPages))].map((_, index) => {
                        const pageNum = index + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 ${
                              page === pageNum
                                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                                : "bg-white text-orange-700 hover:bg-orange-100 border border-orange-200"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={handleNextPage}
                      disabled={page === 1}
                      className={`inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        page === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-orange-700 hover:bg-orange-100 border border-orange-200 shadow-md hover:shadow-lg transform hover:scale-105"
                      }`}
                    >
                      Next
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <UserChart activeUsers={activeUsers} blockedUsers={blockedUsers} />
    </div>
  );
};

export default UsersPage;
