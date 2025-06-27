import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const TwitterOAuthImplementation = () => {
  const clientId = "YOUR_TWITTER_CLIENT_ID"; // Replace with your Twitter Client ID
  const redirectUri = "http://localhost:3000/auth/callback"; // Update for production
  const scopes = ["tweet.read", "users.read", "offline.access"].join(" ");

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Generate random state for CSRF protection
  const generateRandomState = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  // Construct Twitter OAuth URL
  const getTwitterOAuthUrl = () => {
    const state = generateRandomState();
    sessionStorage.setItem("oauth_state", state);
    // Simplified PKCE; use a library like pkce-challenge in production
    const codeChallenge = "challenge"; // Replace with proper PKCE code challenge
    return `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=plain`;
  };

  // Handle login button click
  const handleLogin = () => {
    window.location.href = getTwitterOAuthUrl();
  };

  // Handle callback and exchange code for tokens
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (code && state) {
      if (state !== sessionStorage.getItem("oauth_state")) {
        console.error("Invalid state parameter");
        navigate("/");
        return;
      }

      // Exchange code for tokens via backend
      axios
        .post("http://localhost:5000/auth/twitter/token", { code, redirectUri })
        .then((response) => {
          const { access_token } = response.data;
          // Fetch user data using the access token
          axios
            .get(
              "https://api.twitter.com/2/users/me?user.fields=profile_image_url,public_metrics",
              {
                headers: { Authorization: `Bearer ${access_token}` },
              }
            )
            .then((userResponse) => {
              const userData = {
                name: userResponse.data.data.name,
                email: "N/A", // Twitter API doesn't provide email by default
                picture: userResponse.data.data.profile_image_url,
                id: userResponse.data.data.id,
              };
              setUser(userData);
              console.log("Login Success:", userData);
              navigate("/"); // Clear query params
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
              setUser(null);
              navigate("/");
            });
        })
        .catch((error) => {
          console.error("Token exchange failed:", error);
          setUser(null);
          navigate("/");
        });
    }
  }, [location, navigate]);

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    console.log("Logged out successfully");
  };

  return (
    <div className="flex flex-col items-center p-6">
      {user ? (
        <>
          <h3 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h3>
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
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Sign in with X
        </button>
      )}
    </div>
  );
};

export default TwitterOAuthImplementation;
