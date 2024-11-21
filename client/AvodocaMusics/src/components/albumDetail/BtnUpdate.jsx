import { Alert, Button } from "react-bootstrap";
import { albumUpdateData } from "../../hooks/albums/albumUpdateData";
import { useContext, useState } from "react";
import { baseUrl } from "../../utils/service";
import { albumDeleteData } from "../../hooks/albums/albumDeleteData";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const BtnUpdate = ({ onUpdate, album_id }) => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { albumInfo, albumError, albunLoading, updateAlbumInfo, updateAlbum } =
    albumUpdateData(onUpdate, album_id, user?.token);

  const handleClickDelete = (album_id) => {
    albumDeleteData(album_id, user?.token);
    navigate("/album");
  };

  const handleClickUpdate = () => {
    updateAlbum(album_id, user?.token);
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
                  Update to album
                </h5>
              </div>
              <div className="modal-body ">
                <span style={{ color: "black" }}>Album name : </span>
                <input
                  required
                  type="text"
                  placeholder="Album name"
                  onChange={(e) =>
                    updateAlbumInfo({ ...albumInfo, name: e.target.value })
                  }
                />
              </div>
              <div className="modal-body">
                <span style={{ color: "black" }}>Image : </span>
                <img
                  className="image"
                  src={`${baseUrl}/uploads/uploadImage/${albumInfo.image}`}
                  alt=""
                  style={{ width: "70px" }}
                />
                <input
                  required
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    updateAlbumInfo({
                      ...albumInfo,
                      image: file.name,
                    });
                  }}
                />
              </div>
              <div className="modal-body">
                <span style={{ color: "black" }}>Description : </span>
                <input
                  required
                  type="text"
                  placeholder="Description"
                  onChange={(e) =>
                    updateAlbumInfo({
                      ...albumInfo,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              {albumError?.message && (
                <div className="modal-body">
                  <Alert>
                    <p>{albumError?.message}</p>
                  </Alert>
                </div>
              )}
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
                  onClick={() => handleClickUpdate()}
                >
                  {albunLoading ? "Đang sử lí..." : "Save change"}
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ backgroundColor: " #30720e", border: 0 }}
                  onClick={() => {
                    handleClickDelete(album_id);
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
