import { Link } from "react-router-dom";
import { baseUrl } from "../../utils/service";
import albumHotFetchData from "../../hooks/albums/albumHotData";

const HotAlbum = () => {
  const { albumHotData } = albumHotFetchData();
  return (
    <>
      <h2 style={{ marginLeft: "18px", marginTop: "30px" }}>Album yêu thích</h2>

      <div className="newAlbum ">
        {albumHotData && albumHotData.data ? (
          albumHotData.data.map((item) => (
            <div
              className="song-card Boxshadow-image"
              key={item.id}
              style={{ height: "250px" }}
            >
              <Link to={`/albumDetail/${item.id}`}>
                <img
                  className="image"
                  src={`${baseUrl}/uploads/uploadImage/${item.image}`}
                  alt=""
                />
              </Link>
              <span>Tên album: {item?.name}</span>
              <br />
              <span style={{ fontSize: "12px", color: "#ccc" }}>
                Nghệ sĩ : {item.Account.username}
              </span>
            </div>
          ))
        ) : (
          <p>Loading album...</p>
        )}
      </div>
    </>
  );
};

export default HotAlbum;
