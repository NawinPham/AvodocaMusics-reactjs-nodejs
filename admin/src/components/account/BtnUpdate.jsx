import { useState } from "react";
import { accountUpdateData } from "../../hooks/accounts/accountUpdateData";

const BtnUpdate = ({ account_id, token }) => {
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { accountInfo, accountError, updateAccountInfo, updateAccount } =
    accountUpdateData(account_id, token);

  const HanldeClickUpdate = () => {
    updateAccount();
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
                  Update Account
                </h5>
              </div>
              <div className="modal-body">
                <input
                  required
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="Fullname"
                  onChange={(e) =>
                    updateAccountInfo({
                      ...accountInfo,
                      fullname: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-body">
                <input
                  required
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="address"
                  onChange={(e) =>
                    updateAccountInfo({
                      ...accountInfo,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-body">
                <input
                  required
                  type="number"
                  style={{ width: "100%" }}
                  placeholder="phone"
                  onChange={(e) =>
                    updateAccountInfo({
                      ...accountInfo,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <select
                name=""
                id=""
                onChange={(e) =>
                  updateAccountInfo({
                    ...accountInfo,
                    role_id: Number(e.target.value),
                  })
                }
              >
                <option value="1"> admin</option>
                <option value="2"> user</option>
              </select>
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
                  onClick={() => HanldeClickUpdate()}
                >
                  Save changes
                </button>
              </div>
              {accountError && (
                <Alert>
                  <p>{accountError}</p>
                </Alert>
              )}
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
