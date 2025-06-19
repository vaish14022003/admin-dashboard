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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import {
    fetchManagers,
    validateManager,
    invalidateManager,
   // toggleValidation,
    deleteManager,
} from '../features/managers/managerSlice';

// } from '../features/managers/managerSlice';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import { showSuccess, showError } from '../utils/toastHelper';
//import { invalidateManager } from '../../features/managers/managerSlice';


const ManagersPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { managers, loading } = useSelector((state: RootState) => state.managers);

    useEffect(() => {
        dispatch(fetchManagers());
    }, [dispatch]);

    const handleValidateToggle = async (id: string, isValidated: boolean) => {
        try {
            if (isValidated) {
                await dispatch(invalidateManager(id)).unwrap();
                showSuccess('Manager invalidated');
            } else {
                await dispatch(validateManager(id)).unwrap();
                showSuccess('Manager validated');
            }
        } catch (err: any) {
            showError(err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await dispatch(deleteManager(id)).unwrap();
            showSuccess('Manager deleted');
        } catch (err: any) {
            showError(err);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col flex-grow ml-64">
                <Header />
                <main className="p-6 bg-gray-50 min-h-screen">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Managers</h2>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
                            <thead className="bg-blue-100 text-blue-800">
                                <tr>
                                    <th className="px-4 py-3 text-left">Name</th>
                                    <th className="px-4 py-3 text-left">Email</th>
                                    <th className="px-4 py-3 text-left">Validated</th>
                                    <th className="px-4 py-3 text-left">Restaurants</th>
                                    <th className="px-4 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {managers.map((mgr) => (
                                    <tr key={mgr._id} className="border-t">
                                        <td className="px-4 py-3">{mgr.name}</td>
                                        <td className="px-4 py-3">{mgr.email}</td>
                                        <td className="px-4 py-3">
                                            {mgr.isValidated ? (
                                                <span className="text-green-600 font-semibold">Yes</span>
                                            ) : (
                                                <span className="text-red-600 font-semibold">No</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">{mgr.restaurants?.length}</td>
                                        <td className="px-4 py-3 flex gap-2">
                                            <button
                                                onClick={() => handleValidateToggle(mgr._id, mgr.isValidated)}
                                                className={`px-3 py-1 rounded-md font-semibold ${mgr.isValidated
                                                        ? 'bg-yellow-500 hover:bg-yellow-600'
                                                        : 'bg-green-500 hover:bg-green-600'
                                                    } text-white`}
                                            >
                                                {mgr.isValidated ? 'Invalidate' : 'Validate'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(mgr._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md font-semibold"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ManagersPage;
