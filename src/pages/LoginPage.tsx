import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/loginformlogo.json";
import successAnimation from "../assets/successfullogin.json";
import logo from "../assets/logo-removebg-preview.png";
import axios from "axios";
import GoogleOAuthImplementation from "../components/Oauth";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Login request data:", formData);

      const response = await axios.post(
        "http://localhost:3000/auth/admin/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem("loginToken", response.data.accessToken);
      console.log("Login response data:", response.data);

      if (response.status === 200 || response.status === 201) {
        setLoginSuccess(true);
        setTimeout(() => {
          navigate("/verify-otp");
        }, 2500);
      } else {
        alert("Invalid credentials");
      }
    } catch (error: any) {
      console.error(
        "Login error details:",
        error.response?.data || error.message
      );
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password");
      } else {
        alert("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loginSuccess) {
    return (
      <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
        <Lottie animationData={successAnimation} className="w-72 h-72" />
        <p className="text-xl font-semibold text-teal-700 mt-4">
          Login successful! Redirecting...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-100 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-center flex-grow px-4 py-8">
        <div className="hidden md:flex w-1/2 justify-center items-center">
          <Lottie
            animationData={animationData}
            className="w-[600px] h-[600px]"
          />
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
            <div className="flex flex-col items-center mb-6">
              <img
                src={logo}
                alt="Foodify Logo"
                className="h-30 w-30 object-contain drop-shadow-md mb-2"
              />
              <h2 className="text-3xl font-extrabold text-teal-700 tracking-wide uppercase">
                Admin Login
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-blue-800 font-medium mb-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
              </div>

              <div>
                <label
                  className="block text-blue-800 font-medium mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors duration-300"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* hi */}
              <div className=" bg-blue-100 text-black font-semibold  rounded-md transition-colors duration-300">
                <GoogleOAuthImplementation />
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="text-sm text-gray-500 text-center py-4 select-none border-t border-gray-300">
        © 2025 Foodify | Secure Admin Login
      </footer>
    </div>
  );
};

export default LoginPage;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Lottie from "lottie-react";
// import { FcGoogle } from "react-icons/fc";
// import { motion } from "framer-motion";
// import animationData from "../assets/loginformlogo.json";
// import successAnimation from "../assets/successfullogin.json";
// import logo from "../assets/logo-removebg-preview.png";
// import axios from "axios";
// import styles from "./Login.module.css";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [loginSuccess, setLoginSuccess] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       console.log("Login request data:", formData);

//       const response = await axios.post(
//         "http://localhost:3000/auth/admin/login",
//         {
//           email: formData.email,
//           password: formData.password,
//         }
//       );

//       localStorage.setItem("loginToken", response.data.accessToken);
//       console.log("Login response data:", response.data);

//       if (response.status === 200 || response.status === 201) {
//         setLoginSuccess(true);
//         setTimeout(() => {
//           navigate("/verify-otp");
//         }, 2500);
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (error: any) {
//       console.error(
//         "Login error details:",
//         error.response?.data || error.message
//       );
//       if (error.response && error.response.status === 401) {
//         alert("Invalid email or password");
//       } else {
//         alert("Login failed. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     // Trigger Google OAuth logic (assumes GoogleOAuthImplementation handles this)
//     console.log("Google login clicked");
//   };

//   if (loginSuccess) {
//     return (
//       <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
//         <Lottie animationData={successAnimation} className="w-72 h-72" />
//         <p className="text-xl font-semibold text-teal-700 mt-4">
//           Login successful! Redirecting...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-blue-100 overflow-hidden">
//       <div className="flex flex-col md:flex-row items-center justify-center flex-grow px-4 py-8">
//         <div className="hidden md:flex w-1/2 justify-center items-center">
//           <Lottie
//             animationData={animationData}
//             className="w-[600px] h-[600px]"
//           />
//         </div>

//         <div className="w-full md:w-1/2 flex justify-center">
//           <div className={styles.formContainer}>
//             <div className={styles.logoContainer}>
//               <img src={logo} alt="Foodify Logo" className={styles.logo} />
//               <h2 className={styles.title}>Admin Login</h2>
//             </div>

//             <form onSubmit={handleSubmit} className={styles.loginForm}>
//               <div className={styles.formGroup}>
//                 <label className={styles.label} htmlFor="email">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className={styles.input}
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label className={styles.label} htmlFor="password">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className={styles.input}
//                 />
//               </div>

//               <motion.button
//                 type="submit"
//                 className={styles.loginButton}
//                 disabled={loading}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </motion.button>

//               <motion.button
//                 type="button"
//                 className={styles.googleButton}
//                 onClick={handleGoogleLogin}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <FcGoogle className={styles.googleIcon} />
//                 Log in with Google
//               </motion.button>
//             </form>
//           </div>
//         </div>
//       </div>

//       <footer className="text-sm text-gray-500 text-center py-4 select-none border-t border-gray-300">
//         © 2025 Foodify | Secure Admin Login
//       </footer>
//     </div>
//   );
// };

// export default LoginPage;
