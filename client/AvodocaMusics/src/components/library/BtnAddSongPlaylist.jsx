import { useContext, useState } from "react";
import { addSongPlaylist } from "../../hooks/library/addSongPlaylist";
import ToastrService from "../../utils/toastr";
import { AuthContext } from "../../contexts/AuthContext";

const BtnAddSongPlaylist = ({ song_id, playlistUser }) => {
  const { user } = useContext(AuthContext);
  const [playlistId, setPlaylistId] = useState(null);
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Functions to open and close the modal
  const openModal = (e) => {
    if (!user?.token) return ToastrService.error("Bạn hãy đăng nhập");

    e.preventDefault();
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);
  return (
    <div className="link-more">
      {/* Button to trigger the modal */}
      <span
        className="btn btn-primary "
        onClick={openModal}
        style={{ backgroundColor: "rgba(0 , 0, 0,0)", border: 0 }}
      >
        + Playlist
      </span>

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
                  Thêm bài hát vào playlist
                </h5>
              </div>
              <div className="modal-body">
                <span style={{ color: "black" }}>Tên playlist : </span>
                <select
                  value={playlistId}
                  onChange={(e) => {
                    setPlaylistId(e.target.value);
                  }}
                >
                  {playlistUser && playlistUser.data ? (
                    playlistUser.data.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <option>Đang tải playlist...</option>
                  )}
                </select>
              </div>
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
                    addSongPlaylist(song_id, playlistId, user?.token);
                    closeModal();
                  }}
                >
                  Lưu
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

export default BtnAddSongPlaylist;
