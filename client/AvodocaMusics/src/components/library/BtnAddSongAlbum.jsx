import { useContext, useState } from "react";
import { addSongAlbum } from "../../hooks/library/addSongAlbum";
import { AuthContext } from "../../contexts/AuthContext";

const BtnAddSongAlbum = ({ song_id, albumUser }) => {
  const { user } = useContext(AuthContext);
  const [albumId, setAlbumId] = useState(null);
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Functions to open and close the modal
  const openModal = (e) => {
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
        + Album
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
                  Thêm bài hát vào album
                </h5>
              </div>
              <div className="modal-body">
                <span style={{ color: "black" }}>Tên album : </span>
                <select
                  value={albumId}
                  onChange={(e) => {
                    setAlbumId(e.target.value);
                  }}
                >
                  {albumUser && albumUser.data ? (
                    albumUser.data.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <option>Đang tải album...</option>
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
                    addSongAlbum(albumId, song_id, user?.token);
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

export default BtnAddSongAlbum;
