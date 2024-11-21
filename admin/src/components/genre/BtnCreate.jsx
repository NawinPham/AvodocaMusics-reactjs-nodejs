import { useState } from "react";
import { Form } from "react-bootstrap";
import { genreCreateData } from "../../hooks/genres/genreCreateData";

const BtnCreate = ({ token }) => {
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { genreInfo, updateInfo, genreCreate } = genreCreateData(token);

  return (
    <div className="container">
      {/* Button to trigger the modal */}
      <button
        type="button"
        className="btn bg-transparent border-0 btn-update-hover"
        onClick={openModal}
        style={{
          color: "white",
          padding: "20px 0",
          float: "right",
        }}
      >
        + Create genre
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
                  Create New Genre
                </h5>
              </div>
              <Form onSubmit={genreCreate}>
                <div className="modal-body">
                  <input
                    required
                    type="text"
                    style={{ width: "100%" }}
                    placeholder="Role name"
                    onChange={(e) =>
                      updateInfo({ ...genreInfo, name: e.target.value })
                    }
                  />
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    placeholder="Description"
                    onChange={(e) =>
                      updateInfo({
                        ...genreInfo,
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
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: " #30720e", border: 0 }}
                  >
                    Save
                  </button>
                </div>
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

export default BtnCreate;
