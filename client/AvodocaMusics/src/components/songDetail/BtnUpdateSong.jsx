import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastrService from "../../utils/toastr";
import { baseUrl, getRequest, postRequest } from "../../utils/service";
import { Button } from "react-bootstrap";

const BtnUpdateSong = ({ playlist_id, token }) => {
  const navigate = useNavigate();
  const [playlistData, setPlaylistData] = useState({
    name: "",
    image: null,
    description: "",
  });
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleClickUpdate = async () => {
    const response = await postRequest(
      `${baseUrl}/playlists/update/${playlist_id}`,
      JSON.stringify(playlistData),
      token
    );

    if (response.error) {
      ToastrService.error(response.message);
      return;
    }

    ToastrService.success(response.message);
    navigate("/login");
  };

  const handleClickDelete = async () => {
    const response = await getRequest(
      `${baseUrl}/playlists/delete/${playlist_id}`,
      token
    );

    if (response.error) {
      ToastrService.error(response.message);
      return;
    }

    ToastrService.success(response.message);
    navigate("/library");
  };

  return (
    <div style={{ float: "left" }} className="link-more">
      {/* Button to trigger the modal */}
      <Button
        className="btn btn-primary "
        onClick={openModal}
        style={{
          backgroundColor: "rgba(0 , 0, 0,0)",
          border: 0,
          padding: "15px 0",
        }}
      >
        <i class="fa-solid fa-pen"></i>
      </Button>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ marginTop: "100px" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: "black" }}>
                  Update to playlist
                </h5>
              </div>
              <div className="modal-body">
                <span style={{ color: "black" }}>Playlist name : </span>
                <input
                  required
                  type="text"
                  onChange={(e) =>
                    setPlaylistData({ ...playlistData, name: e.target.value })
                  }
                />
              </div>
              <div className="modal-body">
                <span style={{ color: "black" }}>Image : </span>
                <img
                  className="image"
                  src={`${baseUrl}/uploads/uploadImage/${playlistData.image}`}
                  alt=""
                  style={{ width: "70px" }}
                />
                <input
                  required
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setPlaylistData({
                      ...playlistData,
                      image: file.name,
                    });
                  }}
                />
              </div>
              <div className="modal-body">
                <span style={{ color: "black" }}>Description : </span>
                <input
                  type="text"
                  onChange={(e) =>
                    setPlaylistData({
                      ...playlistData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ backgroundColor: " #30720e", border: 0 }}
                  onClick={() => {
                    handleClickUpdate();
                    closeModal();
                  }}
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ backgroundColor: " #30720e", border: 0 }}
                  onClick={() => {
                    handleClickDelete();
                    closeModal();
                  }}
                >
                  <i class="fa-solid fa-trash" style={{ color: "#d60017" }}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Backdrop for the modal */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default BtnUpdateSong;
