import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { albumUserFetchData } from "../../hooks/albums/albumUserFetchData";
import { useState } from "react";
import { baseUrl } from "../../utils/service";
import BtnCreateAlbum from "./BtnCreateAlbum";

const ListAlbum = ({ token }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { albumData, setAlbumData } = albumUserFetchData(token, currentPage);

  return (
    <>
      <BtnCreateAlbum token={token} />

      <h2 style={{ marginLeft: "18px", marginTop: "30px" }}>Album của bạn</h2>

      <div className="newAlbum ">
        {albumData && albumData.data ? (
          albumData.data.map((items) => (
            <div
              className="song-card Boxshadow-image"
              key={items.id}
              style={{ width: "100px", height: "200px" }}
            >
              <Link to={`/albumDetail/${items.id}`}>
                <img
                  className="image"
                  src={`${baseUrl}/uploads/uploadImage/${items.image}`}
                  alt=""
                />
              </Link>
              <span>Tên album: {items.name}</span>
              <br />
              <span style={{ fontSize: "12px", color: "#ccc" }}>
                Nghệ sĩ : {items.Account.username}
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

export default ListAlbum;
