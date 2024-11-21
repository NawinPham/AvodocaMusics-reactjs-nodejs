import { useContext, useState } from "react";
import { albumCreateData } from "../../hooks/albums/albumCreateData";
import { baseUrl } from "../../utils/service";
import { Alert } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";

const BtnCreateAlbum = ({ onCreate }) => {
  const { user } = useContext(AuthContext);
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const {
    albumInfoCreate,
    albumError,
    albumLoading,
    updateAlbumInfoCreate,
    createAlbum,
  } = albumCreateData(user?.token, onCreate);

  const handleCreateAlbum = () => {
    createAlbum();
  };

  return (
    <div className="container" style={{ paddingTop: "30px" }}>
      {/* Button to trigger the modal */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={openModal}
        style={{ backgroundColor: "#30720e", border: 0, float: "right" }}
      >
        Thêm Album +
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
                  Thêm mới album
                </h5>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="Tên album"
                  onChange={(e) =>
                    updateAlbumInfoCreate({
                      ...albumInfoCreate,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-body">
                <span>Ảnh : </span>
                <img
                  src={`${baseUrl}/uploads/uploadImage/${albumInfoCreate.image}`}
                  alt=""
                  style={{ width: "100px" }}
                />
                <input
                  type="file"
                  style={{ width: "100%" }}
                  placeholder="Image"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    updateAlbumInfoCreate({
                      ...albumInfoCreate,
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
                  onChange={(e) =>
                    updateAlbumInfoCreate({
                      ...albumInfoCreate,
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
                  Đóng
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: " #30720e", border: 0 }}
                  onClick={() => handleCreateAlbum()}
                >
                  {albumLoading ? "Đang thực hiện" : "Lưu"}
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

export default BtnCreateAlbum;
