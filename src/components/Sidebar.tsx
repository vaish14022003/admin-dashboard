import { Link, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaBox,
  FaChartLine,
  FaUserTie,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import logo from "../assets/logo-removebg-preview.png";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-blue-100 shadow-md p-6 z-10">
      <div className="flex flex-col items-center mb-10">
        <img src={logo} alt="Foodify Admin" className="h-20 mb-4" />
        <h1 className="text-xl font-bold text-blue-700 uppercase">Admin</h1>
      </div>

      <nav className="space-y-4">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 p-2 rounded-md ${
            isActive("/dashboard")
              ? "bg-blue-500 text-white"
              : "text-blue-800 hover:bg-blue-200"
          }`}
        >
          <FaChartLine />
          Dashboard
        </Link>

        <Link
          to="/orders"
          className={`flex items-center gap-3 p-2 rounded-md ${
            isActive("/orders")
              ? "bg-blue-500 text-white"
              : "text-blue-800 hover:bg-blue-200"
          }`}
        >
          <FaBox />
          Orders
        </Link>

        <Link
          to="/users"
          className={`flex items-center gap-3 p-2 rounded-md ${
            isActive("/users")
              ? "bg-blue-500 text-white"
              : "text-blue-800 hover:bg-blue-200"
          }`}
        >
          <FaUsers />
          Users
        </Link>

        <Link
          to="/managers"
          className={`flex items-center gap-3 p-2 rounded-md ${
            isActive("/managers")
              ? "bg-blue-500 text-white"
              : "text-blue-800 hover:bg-blue-200"
          }`}
        >
          <FaUserTie />
          Managers
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-2 rounded-md text-red-600 hover:bg-red-100 w-full"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;

// import { Link, useLocation } from "react-router-dom";
// import { FaUsers, FaBox, FaChartLine, FaSignOutAlt } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { logout } from "../features/auth/authSlice";
// import logo from "../assets/logo-removebg-preview.png";

// const Sidebar = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const isActive = (path: string) => location.pathname === path;

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <aside className="fixed top-0 left-0 h-full w-64 bg-blue-100 shadow-md p-6 z-10">
//       <div className="flex flex-col items-center mb-10">
//         <img src={logo} alt="Foodify Admin" className="h-20 mb-4" />
//         <h1 className="text-xl font-bold text-blue-700 uppercase">Admin</h1>
//       </div>

//       <nav className="space-y-4">
//         <Link
//           to="/dashboard"
//           className={`flex items-center gap-3 p-2 rounded-md ${
//             isActive("/dashboard")
//               ? "bg-blue-500 text-white"
//               : "text-blue-800 hover:bg-blue-200"
//           }`}
//         >
//           <FaChartLine />
//           Dashboard
//         </Link>

//         <Link
//           to="/orders"
//           className={`flex items-center gap-3 p-2 rounded-md ${
//             isActive("/orders")
//               ? "bg-blue-500 text-white"
//               : "text-blue-800 hover:bg-blue-200"
//           }`}
//         >
//           <FaBox />
//           Orders
//         </Link>

//         <Link
//           to="/users"
//           className={`flex items-center gap-3 p-2 rounded-md ${
//             isActive("/users")
//               ? "bg-blue-500 text-white"
//               : "text-blue-800 hover:bg-blue-200"
//           }`}
//         >
//           <FaUsers />
//           Users
//         </Link>

//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 p-2 rounded-md text-red-600 hover:bg-red-100 w-full"
//         >
//           <FaSignOutAlt />
//           Logout
//         </button>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
