import { useContext } from "react";
import { baseUrl, getRequest } from "../../utils/service";
import ToastrService from "../../utils/toastr";
import { AuthContext } from "../../contexts/AuthContetx";

const BtnDelete = ({ role_id, onDelete }) => {
  const { user } = useContext(AuthContext);
  const handleDelete = async () => {
    if (role_id) {
      const response = await getRequest(
        `${baseUrl}/roles/delete/${role_id}`,
        user?.token
      );

      if (response.error) {
        ToastrService.error(response.message);
        return;
      }

      ToastrService.success(response.message);
      onDelete(role_id);
    }
  };
  return (
    <button
      type="button"
      className="btn bg-transparent border-0"
      style={{ marginLeft: "10px" }}
      onClick={() => handleDelete()}
    >
      <i class="fa-solid fa-trash" style={{ color: "#d60017" }}></i>
    </button>
  );
};

export default BtnDelete;
