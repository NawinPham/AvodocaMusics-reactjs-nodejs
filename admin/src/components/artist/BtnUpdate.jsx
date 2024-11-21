import { useState } from "react";
import { Form } from "react-bootstrap";
import { artistUpdateData } from "../../hooks/artists/artistUpdateData";

const BtnUpdate = ({ artist_id, token }) => {
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { artistInfo, artistError, artistUpdateInfo, artistUpdate } =
    artistUpdateData(artist_id, token);

  return (
    <div className="container">
      {/* Button to trigger the modal */}
      <button
        type="button"
        className="btn bg-transparent border-0 btn-update-hover"
        onClick={openModal}
        style={{
          border: 0,
        }}
      >
        <i class="fa-solid fa-pen" style={{ color: "#FFFFFF" }}></i>
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
                  Update artist
                </h5>
              </div>
              <Form onSubmit={artistUpdate}>
                <div className="modal-body">
                  <input
                    required
                    type="text"
                    style={{ width: "100%" }}
                    placeholder="Artist name"
                    onChange={(e) =>
                      artistUpdateInfo({ ...artistInfo, name: e.target.value })
                    }
                  />
                </div>
                <div className="modal-body">
                  <input
                    required
                    type="text"
                    style={{ width: "100%" }}
                    placeholder="Bio"
                    onChange={(e) =>
                      artistUpdateInfo({
                        ...artistInfo,
                        bio: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="modal-body">
                  <input
                    type="date"
                    style={{ width: "100%" }}
                    placeholder="Debut date"
                    onChange={(e) =>
                      artistUpdateInfo({
                        ...artistInfo,
                        debutDate: e.target.value,
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
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: " #30720e", border: 0 }}
                  >
                    Save changes
                  </button>
                </div>
                {artistError && (
                  <Alert>
                    <p>{artistError}</p>
                  </Alert>
                )}
              </Form>
            </div>
          </div>
        </div>
      )}
      {/* Backdrop for the modal */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default BtnUpdate;
