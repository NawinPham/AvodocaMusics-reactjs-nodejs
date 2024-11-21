import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContetx";
import ToastrService from "../../utils/toastr";
import { baseUrl, postRequest } from "../../utils/service";
import { Alert } from "react-bootstrap";

const BtnUpdate = ({ role_id, onUpdate }) => {
  const { user } = useContext(AuthContext);
  const [roleInfo, setRoleInfo] = useState({
    name: "",
    description: "",
  });
  const [roleError, setRoleError] = useState(null);
  const [roleLoading, setRoleLoading] = useState(false);

  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleUpdate = async () => {
    setRoleLoading(true);
    setRoleError(null);

    const response = await postRequest(
      `${baseUrl}/roles/update/${role_id}`,
      JSON.stringify(roleInfo),
      user?.token
    );

    setRoleLoading(false);

    if (response.error) {
      setRoleError(response.message);
      return;
    }

    ToastrService.success(response.message);
    closeModal();
    onUpdate(role_id, response?.data);
    console.log(response);
  };

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
                    setRoleInfo({ ...roleInfo, name: e.target.value })
                  }
                />
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="Description"
                  onChange={(e) =>
                    setRoleInfo({
                      ...roleInfo,
                      description: e.target.value,
                    })
                  }
                />
                {roleError && (
                  <div className="modal-body">
                    <Alert>
                      <p>{roleError}</p>
                    </Alert>
                  </div>
                )}
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
                  onClick={handleUpdate}
                >
                  {roleLoading ? "Updating..." : "Save changes"}
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

export default BtnUpdate;
