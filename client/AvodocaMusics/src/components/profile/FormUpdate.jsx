import { Alert, Form } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const FormUpdate = ({ data, onUpdate }) => {
  const {
    updateProfile,
    ProfileError,
    ProfileLoading,
    profileInfo,
    updateProfileInfo,
  } = useContext(AuthContext);
  return (
    <div className="profile-right">
      <div className="profile-header">
        <h4>Cập nhật thông tin cá nhân</h4>
      </div>
      <div className="form-profile">
        <p>Tên đầy đủ </p>
        <input
          required
          type="text"
          id="fullname"
          placeholder="Tên đầy đủ"
          name="fullname"
          onChange={(e) => {
            updateProfileInfo({ ...profileInfo, fullname: e.target.value });
          }}
        />
        <p>Địa chỉ</p>
        <input
          required
          type="text"
          id="address"
          placeholder="Địa chỉ"
          name="address"
          onChange={(e) => {
            updateProfileInfo({ ...profileInfo, address: e.target.value });
          }}
        />
        <p>SĐT</p>
        <input
          required
          type="text"
          id="phone"
          placeholder="SĐT"
          name="phone"
          onChange={(e) => {
            updateProfileInfo({ ...profileInfo, phone: e.target.value });
          }}
        />
        <button id="btnUpdate" type="submit" onClick={updateProfile}>
          {ProfileLoading ? "Đang thực hiện..." : "Lưu"}
        </button>
        {ProfileError?.message && (
          <Alert>
            <p>{ProfileError?.message}</p>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default FormUpdate;
