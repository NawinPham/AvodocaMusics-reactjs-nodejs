import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";
import { baseUrl, getRequest } from "../../utils/service";
import ToastrService from "../../utils/toastr";

const BtnDelete = ({ playlist_id, song_id, onDelete }) => {
  const { user } = useContext(AuthContext);

  const handleDeleteClick = async (playlist_id, songs_id) => {
    const response = await getRequest(
      `${baseUrl}/playlistSongs/delete/${playlist_id}/songs/${songs_id}`,
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
      onClick={() => handleDeleteClick(playlist_id, song_id)}
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
