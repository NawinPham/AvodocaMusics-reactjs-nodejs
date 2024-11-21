import { Link } from "react-router-dom";
import playlistHotFetchData from "../../hooks/playlistHotFetchData";
import { baseUrl } from "../../utils/service";

const HotPlaylist = () => {
  const { playlistHotData } = playlistHotFetchData();
  return (
    <>
      <h2 style={{ marginLeft: "18px", marginTop: "30px" }}>
        Playlist yêu thích
      </h2>

      <div className="newAlbum ">
        {playlistHotData && playlistHotData.data ? (
          playlistHotData.data.map((item) => (
            <div
              className="song-card Boxshadow-image"
              key={item.id}
              style={{ width: "100px", height: "250px" }}
            >
              <Link to={`/playlistDetail/${item.id}`}>
                <img
                  className="image"
                  src={`${baseUrl}/uploads/uploadImage/${item.image}`}
                  alt=""
                />
              </Link>
              <span>Tên playlist: {item.name}</span>
            </div>
          ))
        ) : (
          <p>Loading playlists...</p>
        )}
      </div>
    </>
  );
};

export default HotPlaylist;
