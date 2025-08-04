import { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../Contexts/Auth/AuthContext";
import SetContext from "../Contexts/SetContexts/SetContext";
import { useNavigate } from "react-router-dom";

/**
 * This hook is used to refresh the token every 15 minutes.
 * @param {number} interval - The interval time in milliseconds.
 * @returns {string} - The status of the authentication.
 */

export function useHeartBeat(interval = 15 * 60 * 1000) {
  const [authStatues, setAuthStatues] = useState("idle");
  const { setAuth, setToken, token } = useContext(AuthContext);
  const { axiosInstance, setHeaderDom, setFooterDom } = useContext(SetContext);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      setAuthStatues("loading");
      const response = await axiosInstance.post("/refresh-token", {
        message: "refresh_token",
      });
      console.log(response.data);
      if (response.data.code !== 0) {
        setAuthStatues("error");
        navigate("/login");
        throw new Error(response.data.message || "Token жаңалау қате!");
      }
      setToken(response?.headers?.authorization?.split(" ")[1]);
      setAuth(response?.data?.user);
      setAuthStatues("success");
      console.log("Token жаңалау сәтті болды!");
      if (window.location.pathname === "/login") {
        navigate("/");
      }
      if (window.location.pathname === "/register") {
        navigate("/");
      }
    } catch (error) {
      setAuthStatues("error");
      console.log(error);
      navigate("/login");
    }
  };
  useEffect(() => {
    console.log(token);
    if (token?.includes("Bearer ")) {
      refresh();
      timerRef.current = setInterval(() => {
        refresh();
      }, interval);
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return authStatues;
}
