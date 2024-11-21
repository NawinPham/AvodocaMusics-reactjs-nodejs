import "../assets/css/Profile.css";
import FormUpdate from "../components/profile/FormUpdate";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "react-bootstrap";
import { baseUrl, getRequest } from "../utils/service";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRequest(
        `${baseUrl}/users/GetProfileUser`,
        user?.token
      );
      setProfileData(response.data);
    };
    fetchData();
  }, [user]);

  console.log(profileData);

  const handleUpdate = (newProfile) => {
    setProfileData((prev) => ({ ...prev, ...newProfile }));
  };

  return (
    <div className="profile">
      <div className="profile-left">
        <div className="profile-header">
          <h4>Thông tin cá nhân</h4>
        </div>
        <div id="profile-detail">
          <p>
            Tên đầy đủ :{" "}
            {profileData?.fullname ? profileData?.fullname : "Trống"}
          </p>
          <p>
            Địa chỉ : {profileData?.address ? profileData?.address : "Trống"}
          </p>
          <p>SĐT : {profileData?.phone ? profileData?.phone : "Trống"}</p>
          <p>Email : {profileData?.email ? profileData?.email : "Trống"}</p>
        </div>
        <div id="profile-detail">
          <Button style={{ color: "#d60017" }} to={""} onClick={() => logout()}>
            Đăng xuất
          </Button>
          {/* {data?.role_id === 1 ? <Link style={{ paddingRight: '10px' }} to={'/adminn'}> Quản trị</Link > : <></>} */}
        </div>
      </div>
      <FormUpdate data={profileData} onUpdate={handleUpdate} />
    </div>
  );
};

export default Profile;
