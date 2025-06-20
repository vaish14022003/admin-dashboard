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

const UsersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, totalPages } = useSelector(
    (state: RootState) => state.users
  );

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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow ml-64">
        <Header />
        <main className="p-6 bg-gray-50 min-h-screen">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Users Management
          </h2>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <table className="w-full bg-white shadow-md rounded-xl overflow-hidden mb-4">
                <thead className="bg-blue-100 text-blue-800">
                  <tr>
                    {/* <th className="px-4 py-3 text-left">Name</th> */}
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-t">
                      {/* <td className="px-4 py-3">{user.name}</td> */}
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        {user.isBlocked ? (
                          <span className="text-red-600 font-semibold">
                            Blocked
                          </span>
                        ) : (
                          <span className="text-green-600 font-semibold">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggle(user._id, user.isBlocked)}
                          className={`px-4 py-2 rounded-md font-semibold ${
                            user.isBlocked
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-red-500 text-white hover:bg-red-600"
                          }`}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-lg font-medium">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default UsersPage;
