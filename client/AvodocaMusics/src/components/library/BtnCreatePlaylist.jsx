import { useCallback, useState } from "react";
import { Alert } from "react-bootstrap";
import { baseUrl, postRequest } from "../../utils/service";
import ToastrService from "../../utils/toastr";

const BtnCreatePlaylist = ({ onCreate, token }) => {
  const [playlistInfo, setPlaylistInfo] = useState({
    name: "",
    image: null,
    description: "",
  });
  const [playlistError, setPlaylistError] = useState(null);
  const [playlistLoading, setPlaylistLoading] = useState(false);
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Functions to open and close the modal
  const openModal = () => {
    if (!token) {
      ToastrService.error("Bạn hãy đăng nhập");
    }
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const createPlaylist = useCallback(async () => {
    setPlaylistLoading(true);
    setPlaylistError(null);

    const response = await postRequest(
      `${baseUrl}/playlists/create`,
      JSON.stringify(playlistInfo),
      token
    );

    setPlaylistLoading(false);

    if (response.error) {
      setPlaylistError(response);
      return;
    }

    setShowModal(false);

    ToastrService.success(response.message);

    if (onCreate) {
      onCreate(response.data);
    }
  }, [playlistInfo, token, onCreate]);

  return (
    <div className="container" style={{ paddingTop: "30px" }}>
      {/* Button to trigger the modal */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={openModal}
        style={{ backgroundColor: "#30720e", border: 0, float: "right" }}
      >
        Thêm Playlist +
      </button>

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
                  Thêm mới Playlist
                </h5>
              </div>
              <div className="modal-body">
                <input
                  required
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="Tên playlist"
                  onChange={(e) => {
                    setPlaylistInfo({
                      ...playlistInfo,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="modal-body">
                <label
                  style={{
                    color: "black",
                    display: "inline-block",
                    paddingRight: "10px",
                  }}
                >
                  Ảnh :
                </label>
                <img
                  src={`${baseUrl}/uploads/uploadImage/${playlistInfo.image}`}
                  alt=""
                  style={{ width: "70px" }}
                />
                <input
                  required
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setPlaylistInfo({
                      ...playlistInfo,
                      image: file.name,
                    });
                  }}
                />
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="Mô tả"
                  onChange={(e) => {
                    setPlaylistInfo({
                      ...playlistInfo,
                      description: e.target.value,
                    });
                  }}
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
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: " #30720e", border: 0 }}
                  onClick={() => createPlaylist()}
                >
                  {playlistLoading ? "Đang thực hiện..." : "Lưu"}
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

export default BtnCreatePlaylist;
