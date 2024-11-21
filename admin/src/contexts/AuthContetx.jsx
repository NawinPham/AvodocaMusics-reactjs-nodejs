import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/service";
import { useNavigate } from "react-router-dom";
import ToastrService from "../utils/toastr";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [registerError, setRegisterError] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [ProfileError, setProfileError] = useState(null);
  const [ProfileLoading, setProfileLoading] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    fullname: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("User");

    setUser(JSON.parse(user));
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateProfileInfo = useCallback((info) => {
    setProfileInfo(info);
  }, []);

  const LoginUser = useCallback(
    async (e) => {
      e.preventDefault();

      setLoginLoading(true);
      setRegisterError(null);

      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );

      setLoginLoading(false);

      if (response.error) {
        setLoginError(response);
      }

      if (response.status === true && response.role_id === 1) {
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
        navigate("/");
      } else {
        ToastrService.error("k co quyen truy cap");
      }
    },
    [loginInfo]
  );

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      setRegisterLoading(true);
      setRegisterError(null);

      const response = await postRequest(
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
      );

      setRegisterInfo(false);

      if (response.error) {
        setRegisterError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
      if (response.status === true) {
        navigate("/");
      }
    },
    [registerInfo]
  );

  const updateProfile = useCallback(
    async (e) => {
      e.preventDefault();

      setProfileLoading(true);
      setProfileError(null);

      const response = await postRequest(
        `${baseUrl}/users/update`,
        JSON.stringify(profileInfo),
        user?.token
      );

      setProfileLoading(false);

      if (response.error) {
        setProfileError(response);
      }
    },
    [profileInfo]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        LoginUser,
        loginError,
        loginLoading,
        loginInfo,
        updateLoginInfo,

        registerUser,
        registerError,
        registerLoading,
        registerInfo,
        updateRegisterInfo,

        updateProfile,
        ProfileError,
        ProfileLoading,
        profileInfo,
        updateProfileInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
