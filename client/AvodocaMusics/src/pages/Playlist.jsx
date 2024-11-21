import { Link } from "react-router-dom";
import BtnCreatePlaylist from "../components/library/BtnCreatePlaylist";
import playlistUserFetchData from "../hooks/playlistUserFetchData";
import { baseUrl } from "../utils/service";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Playlist = () => {
  const { user } = useContext(AuthContext);
  const { playlistDataUser, setPlaylistDataUser } = playlistUserFetchData(
    user?.token
  );

  const handleCreatePlaylist = (newPlaylist) => {
    setPlaylistDataUser((prevData) => {
      // Nếu prevData.data là mảng, chúng ta cập nhật thuộc tính data
      return {
        ...prevData, // Giữ lại các thuộc tính khác của prevData
        data: [...prevData.data, newPlaylist], // Thêm playlist mới vào mảng data
      };
    });
  };

  return (
    <div className="container home">
      <BtnCreatePlaylist onCreate={handleCreatePlaylist} token={user?.token} />

      <h2>Danh sách phát của bạn</h2>
      <div className="row">
        {playlistDataUser && playlistDataUser?.data ? (
          playlistDataUser?.data.length > 0 ? (
            playlistDataUser?.data.map((items) => (
              <div className="col-3 p-3" key={items.id}>
                <div
                  className="Boxshadow-image"
                  style={{ width: "100%", height: "200px" }}
                >
                  <Link to={`/playlistDetail/${items.id}`}>
                    <img
                      className="image"
                      src={`${baseUrl}/uploads/uploadImage/${items.image}`}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="info">
                  <span>Tên playlist: {items.name}</span>
                </div>
              </div>
            ))
          ) : (
            <p>Danh sách phát trống</p>
          )
        ) : (
          <p>Loading playlist...</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
