import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastrService from "../../utils/toastr";
import { baseUrl, getRequest, postRequest } from "../../utils/service";
import { Alert, Button } from "react-bootstrap";

const BtnUpdatePlaylist = ({ playlist_id, token }) => {
  const navigate = useNavigate();
  const [playlistData, setPlaylistData] = useState({
    name: "",
    image: null,
    description: "",
  });
  const [playlistError, setPlaylistError] = useState(null);
  const [playlistLoading, setPlaylistLoading] = useState(false);
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleClickUpdate = async () => {
    setPlaylistLoading(true);
    setPlaylistError(null);

    const response = await postRequest(
      `${baseUrl}/playlists/update/${playlist_id}`,
      JSON.stringify(playlistData),
      token
    );

    setPlaylistLoading(false);

    if (response.error) {
      setPlaylistError(response);
      setShowModal(true);
      return;
    }
    setShowModal(false);
    ToastrService.success(response.message);
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
                  Cập nhật playlist
                </h5>
              </div>
              <div className="modal-body">
                <span style={{ color: "black" }}>Tên Playlist : </span>
                <input
                  required
                  type="text"
                  onChange={(e) =>
                    setPlaylistData({ ...playlistData, name: e.target.value })
                  }
                />
              </div>
              <div className="modal-body">
                <span style={{ color: "black" }}>Ảnh : </span>
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
                <span style={{ color: "black" }}>Mô tả : </span>
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
              {playlistError?.message && (
                <div className="modal-body">
                  <Alert>
                    <p>{playlistError?.message}</p>
                  </Alert>
                </div>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ backgroundColor: " #30720e", border: 0 }}
                  onClick={() => {
                    handleClickUpdate();
                  }}
                >
                  Lưu
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

export default BtnUpdatePlaylist;
