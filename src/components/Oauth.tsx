import React, { useState } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  type CredentialResponse,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
  sub: string;
  [key: string]: any;
}

const GoogleOAuthImplementation: React.FC = () => {
  const clientId: string =
    "22703797208-g9k1171q2nom1tnj4l63qkmesh4qme2c.apps.googleusercontent.com";

  const [user, setUser] = useState<GoogleUser | null>(null);

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const userObject: GoogleUser = jwtDecode(credentialResponse.credential);
      setUser(userObject);
      console.log("Login Success:", userObject);
    }
  };

  const handleLoginError = () => {
    console.log("Login Failed");
    setUser(null);
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    console.log("Logged out successfully");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        {/* <h2>Google OAuth Login</h2> */}

        {user ? (
          
          <div className="flex flex-col items-center p-6">
            <h3 className="text-xl font-semibold mb-4">
              Welcome, {user.name}!
            </h3>
            <img
              src={user.picture}
              alt="Profile"
              className="rounded-full w-24 h-24 mb-4"
            />
            <p className="text-gray-600 mb-6">Email: {user.email}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            useOneTap
            theme="filled_blue"
            size="large"
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuthImplementation;
