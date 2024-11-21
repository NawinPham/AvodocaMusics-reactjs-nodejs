import { useContext, useState } from "react";
import { baseUrl, postRequest } from "../../utils/service";
import ToastrService from "../../utils/toastr";
import { genreFetchData } from "../../hooks/genreFetchData";
import { Alert } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";

const BtnCreateSong = ({ onCreate }) => {
  const { user } = useContext(AuthContext);
  const { genreData } = genreFetchData();
  const [songInfo, setSongInfo] = useState({
    name: "",
    image: "",
    url: "",
    description: "",
    genre_id: "",
  });
  const [songError, setSongError] = useState(null);
  const [songLoading, setSongLoading] = useState(false);
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const hanldeClickCreate = async (e) => {
    setSongLoading(true);
    setSongError(null);

    const response = await postRequest(
      `${baseUrl}/songs/create`,
      JSON.stringify(songInfo),
      user?.token
    );

    setSongLoading(false);

    if (response.error) {
      setSongError(response.message);
      return;
    }

    if (onCreate) {
      onCreate(response.data);
    }

    setShowModal(false);
    ToastrService.success(response.message);
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
        Thêm bài hát +
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
                  Thêm mới bài hát
                </h5>
              </div>
              <div className="modal-body">
                <input
                  required
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="Tên bài hát"
                  onChange={(e) => {
                    setSongInfo({
                      ...songInfo,
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
                  className="image"
                  src={`${baseUrl}/uploads/uploadImage/${songInfo.image}`}
                  alt=""
                  style={{ width: "70px" }}
                />
                <input
                  required
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSongInfo({
                      ...songInfo,
                      image: file.name,
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
                  Url :
                </label>
                <input
                  required
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSongInfo({
                      ...songInfo,
                      url: file.name,
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
                  Thể loại :
                </label>
                <select
                  onChange={(e) => {
                    setSongInfo({
                      ...songInfo, // Preserve existing properties
                      genre_id: e.target.value, // Update genre_id with selected value
                    });
                  }}
                >
                  {genreData && genreData.data ? (
                    genreData.data.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <option>loading genre...</option>
                  )}
                </select>
              </div>

              <div className="modal-body">
                <input
                  required
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="Mô tả"
                  onChange={(e) => {
                    setSongInfo({
                      ...songInfo,
                      description: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="modal-body">
                {songError && (
                  <Alert>
                    <p>{songError}</p>
                  </Alert>
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
                  onClick={() => hanldeClickCreate()}
                >
                  {songLoading ? "Dang thực hiện..." : "Lưu"}
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

export default BtnCreateSong;
