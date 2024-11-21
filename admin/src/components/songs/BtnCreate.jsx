import { useState } from "react";
import { genreFetchData } from "../../hooks/genres/genreFetchData";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContetx";
import { baseUrl, postRequest } from "../../utils/service";
import ToastrService from "../../utils/toastr";
import { Alert } from "react-bootstrap";
import songFetchData from "../../hooks/songs/songFetchData";

const BtnCreate = () => {
  const { user } = useContext(AuthContext);
  const { genreData } = genreFetchData(user?.token);
  const { songData, setSongData } = songFetchData(user?.token);
  const [songInfo, setSongInfo] = useState({
    name: "",
    image: null,
    url: null,
    description: "",
    genre_id: null,
  });
  const [songError, setSongError] = useState(null);
  const [songLoading, setSongLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const HanldeClickCreate = async () => {
    setSongLoading(true);

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

    ToastrService.success(response.message);
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
        + Thêm bài hát
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ marginTop: "50px" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: "black" }}>
                  Thêm bài hát
                </h5>
              </div>
              <div className="modal-body">
                <input
                  required
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="Tên bài hát"
                  onChange={(e) =>
                    setSongInfo({ ...songInfo, name: e.target.value })
                  }
                />
              </div>
              <div className="modal-body">
                {songInfo.image ? (
                  <img
                    className="image"
                    src={`${baseUrl}/uploads/uploadImage/${songInfo.image}`}
                    alt=""
                    style={{ width: "100px" }}
                  />
                ) : (
                  <span className="text-black">Tệp ảnh</span>
                )}

                <input
                  required
                  type="file"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setSongInfo({ ...songInfo, image: e.target.files[0].name });
                  }}
                />
              </div>
              <div className="modal-body">
                <span className="text-black">Tệp âm thanh</span>
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
                  placeholder="Mô tả"
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
                  onClick={() => HanldeClickCreate()}
                >
                  {songLoading ? "Đang thực hiện..." : "Save changes"}
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
