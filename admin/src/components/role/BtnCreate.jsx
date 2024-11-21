import { useState } from "react";
import { Form } from "react-bootstrap";
import { roleCreateData } from "../../hooks/roles/roleCreateData";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContetx";

const BtnCreate = ({ onCreate }) => {
  const { user } = useContext(AuthContext);
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { roleInfo, roleUpdateInfo, roleCreate } = roleCreateData(
    user?.token,
    onCreate
  );

  const HanldeClickCreate = () => {
    roleCreate();
  };

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
        + Create role
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
                  Create New Role
                </h5>
              </div>
              <div className="modal-body">
                <input
                  required
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="Role name"
                  onChange={(e) =>
                    roleUpdateInfo({ ...roleInfo, name: e.target.value })
                  }
                />
              </div>
              <div className="modal-body">
                <input
                  required
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="Description"
                  onChange={(e) =>
                    roleUpdateInfo({
                      ...roleInfo,
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
                  onClick={() => HanldeClickCreate()}
                >
                  Save changes
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

export default BtnCreate;
