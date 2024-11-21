import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/service";
import { useNavigate } from "react-router-dom";
import ToastrService from "../utils/toastr";
import { favoriteSongFetchDataUser } from "../hooks/favoriteSongFetchDataUser";
import playlistUserFetchData from "../hooks/playlistUserFetchData";
import { albumUserFetchData } from "../hooks/albums/albumUserFetchData";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  //fetch all favorite user
  const { favoriteSongDataUser } = favoriteSongFetchDataUser(user?.token);

  //fetch all playlist user
  const { playlistDataUser } = playlistUserFetchData(
    user?.token
  );

  //fetch all album user
  const { albumDataUser } = albumUserFetchData(user?.token);

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

  useEffect(() => {
    // Kiểm tra URL cho dữ liệu người dùng từ Google OAuth callback
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      localStorage.setItem("User", JSON.stringify(parsedUser));
      setUser(parsedUser);

      // Xóa query string khỏi URL sau khi lưu vào sessionStorage
      window.history.replaceState({}, document.title, "/");
    }
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

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);

      if (response.status === true) {
        ToastrService.success("Đăng nhập thành công");
        navigate("/");
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

      if (response.error) {
        setRegisterError(response);
        setRegisterInfo(false);
        return;
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
      if (response.status === true) {
        navigate("/");
      }
    },
    [registerInfo]
  );

  const updateProfile = useCallback(async () => {
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
      return;
    }
    ToastrService.success(response.message);
  }, [profileInfo, user?.token]);

  const logout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("User");
    setUser(null);
    // Chuyển hướng người dùng đến trang login (hoặc home)
    ToastrService.success("Đăng xuất thành công");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        favoriteSongDataUser,
        playlistDataUser,
        albumDataUser,

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

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
