// const Header = () => {
//     return (
//         <header className="w-full bg-white border-b border-gray-200 p-4 flex justify-between items-center">
//             <h1 className="text-lg font-semibold text-blue-800">Admin Panel</h1>
//             <span className="text-sm text-gray-500">v1.0.0</span>
//         </header>
//     );
// };

// export default Header;

import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Notifications from "./Notifications";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-blue-800">Admin Panel</h1>

      <div className="flex items-center gap-4">
        <Notifications />
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
