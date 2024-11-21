import { useState } from "react";
import { baseUrl, postRequest } from "../../utils/service";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContetx";
import { genreFetchData } from "../../hooks/genres/genreFetchData";
import { Alert } from "react-bootstrap";
import ToastrService from "../../utils/toastr";

const BtnUpdateSong = ({ song_id }) => {
  const { user } = useContext(AuthContext);
  const { genreData } = genreFetchData(user?.token);
  const [songInfo, setSongInfo] = useState({
    name: "",
    image: null,
    description: "",
    url: null,
    genre_id: null,
  });
  const [songError, setSongError] = useState(null);
  const [songLoading, setSongLoading] = useState(false);
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const hanldeUpdateSong = async () => {
    setSongLoading(true);
    setSongError(null);

    const response = await postRequest(
      `${baseUrl}/songs/update/${song_id}`,
      JSON.stringify(songInfo),
      user?.token
    );

    setSongLoading(false);

    if (response.error) {
      setSongError(response.message);
      return;
    }
    ToastrService.success(response.message);
    closeModal();
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
                  Create New Song
                </h5>
              </div>
              <div className="modal-body">
                <input
                  required
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="Song name"
                  onChange={(e) =>
                    setSongInfo({ ...songInfo, name: e.target.value })
                  }
                />
              </div>
              <div className="modal-body">
                <img
                  className="image"
                  src={`${baseUrl}/uploads/uploadImage/${songInfo.image}`}
                  alt=""
                  style={{ width: "70px" }}
                />{" "}
                <label
                  style={{
                    color: "black",
                    display: "inline-block",
                    paddingRight: "10px",
                  }}
                >
                  Image :
                </label>
                <input
                  required
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSongInfo({ ...songInfo, image: file.name });
                  }}
                />
              </div>
              <div className="modal-body">
                <span className="text-black">Tệp mp3</span>
                <input
                  required
                  type="file"
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    setSongInfo({ ...songInfo, url: e.target.files[0].name })
                  }
                />
              </div>
              <div className="modal-body">
                <span className="text-black">Thể loại</span>
                <select
                  name=""
                  id=""
                  onChange={(e) =>
                    setSongInfo({ ...songInfo, genre_id: e.target.value })
                  }
                >
                  {genreData && genreData?.data ? (
                    genreData?.data.map((items, index) => (
                      <option value={items?.id} key={index}>
                        {items?.name}
                      </option>
                    ))
                  ) : (
                    <option> Đang tải...</option>
                  )}
                </select>
              </div>
              <div className="modal-body">
                <input
                  required
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="Description"
                  onChange={(e) =>
                    setSongInfo({
                      ...songInfo,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              {songError && (
                <div className="modal-body">
                  <Alert>
                    <p>{songError}</p>
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
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: " #30720e", border: 0 }}
                  onClick={hanldeUpdateSong}
                >
                  {songLoading ? "Đang thực hiện..." : "Cập nhật"}
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

export default BtnUpdateSong;
