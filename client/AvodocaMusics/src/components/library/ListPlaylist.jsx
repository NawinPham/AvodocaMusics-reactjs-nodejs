import { Link } from "react-router-dom";
import { baseUrl } from "../../utils/service";
import playlistUserFetchData from "../../hooks/playlistUserFetchData";
import BtnCreatePlaylist from "./BtnCreatePlaylist";

const ListPlaylist = ({ token }) => {
  const { playlistData, setPlaylistData } = playlistUserFetchData(token);

  const handleCreatePlaylist = (newPlaylist) => {
    setPlaylistData((prevData) => {
      // Nếu prevData.data là mảng, chúng ta cập nhật thuộc tính data
      return {
        ...prevData, // Giữ lại các thuộc tính khác của prevData
        data: [...prevData.data, newPlaylist], // Thêm playlist mới vào mảng data
      };
    });
  };
  return (
    <>
      <BtnCreatePlaylist onCreate={handleCreatePlaylist} token={token} />

      <h2 style={{ marginLeft: "18px", marginTop: "30px" }}>
        Playlist của bạn
      </h2>

      <div className="newAlbum ">
        {playlistData && playlistData.data ? (
          playlistData?.data.length > 0 ? (
            playlistData.data.map((playlist) => (
              <div
                className="song-card Boxshadow-image"
                key={playlist.id}
                style={{ width: "100px", height: "200px" }}
              >
                <Link to={`/playlistDetail/${playlist.id}`}>
                  <img
                    className="image"
                    src={`${baseUrl}/uploads/uploadImage/${playlist.image}`}
                    alt=""
                  />
                </Link>
                <span>Tên playlist : {playlist.name}</span>
              </div>
            ))
          ) : (
            <p>Chưa có playlist</p>
          )
        ) : (
          <p>Loading playlists...</p>
        )}
      </div>
    </>
  );
};

export default ListPlaylist;
