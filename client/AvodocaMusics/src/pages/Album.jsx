import { Link } from "react-router-dom";
import BtnCreateAlbum from "../components/library/BtnCreateAlbum";
import { useContext, useState } from "react";
import { albumUserFetchData } from "../hooks/albums/albumUserFetchData";
import { baseUrl } from "../utils/service";
import { AuthContext } from "../contexts/AuthContext";

const Album = () => {
  const { user } = useContext(AuthContext);
  const { albumDataUser, setAlbumDataUser } = albumUserFetchData(user?.token);

  const handleCreateAlbum = (newPlaylist) => {
    setAlbumDataUser((prevData) => {
      // Nếu prevData.data là mảng, chúng ta cập nhật thuộc tính data
      return {
        ...prevData, // Giữ lại các thuộc tính khác của prevData
        data: [...prevData.data, newPlaylist], // Thêm playlist mới vào mảng data
      };
    });
  };

  return (
    <div className="container home">
      <BtnCreateAlbum onCreate={handleCreateAlbum} />

      <h2>Album của bạn</h2>

      <div className="row">
        {albumDataUser && albumDataUser?.data ? (
          albumDataUser?.data.length > 0 ? (
            albumDataUser?.data.map((items) => (
              <div className="col-3 p-3" key={items.id}>
                <div
                  className="Boxshadow-image"
                  style={{ width: "100%", height: "200px" }}
                >
                  <Link to={`/albumDetail/${items.id}`}>
                    <img
                      className="image"
                      src={`${baseUrl}/uploads/uploadImage/${items.image}`}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="info">
                  <span>Tên album: {items.name}</span>
                </div>
              </div>
            ))
          ) : (
            <p>Album trống</p>
          )
        ) : (
          <p>Loading playlist...</p>
        )}
      </div>
    </div>
  );
};

export default Album;
