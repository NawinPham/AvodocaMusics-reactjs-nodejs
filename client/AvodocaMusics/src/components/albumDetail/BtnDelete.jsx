import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";
import { baseUrl, getRequest } from "../../utils/service";
import ToastrService from "../../utils/toastr";

const BtnDelete = ({ album_id, song_id, onDelete }) => {
  const { user } = useContext(AuthContext);

  const handleDeleteClick = async () => {
    const response = await getRequest(
      `${baseUrl}/albumSongs/delete/${album_id}/songs/${song_id}`,
      user?.token
    );
    if (response.error) {
      ToastrService.error(response.message);
      return;
    }
    onDelete(song_id);
    ToastrService.success(response.message);
  };

  return (
    <Button
      onClick={() => handleDeleteClick()}
      className="btn bg-transparent border-0"
      style={{
        marginTop: "15px",
        float: "right",
        paddingRight: "20px",
      }}
    >
      <i class="fa-solid fa-trash" style={{ color: "#d60017" }}></i>
    </Button>
  );
};

export default BtnDelete;
