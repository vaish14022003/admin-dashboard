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