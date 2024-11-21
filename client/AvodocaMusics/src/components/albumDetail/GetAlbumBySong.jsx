import { Link } from "react-router-dom";
import { getAlbumBySong } from "../../hooks/albums/getAlbumBySong";

export const GetAlbumBySong = ({ song_id }) => {
  const albumData = getAlbumBySong(song_id);

  return (
    <div className="AlbumName">
      <Link to={`/albumDetail/${albumData?.data?.album_id}`}>
        {albumData?.data ? (
          <span style={{fontSize: "12px", color: "rgb(204, 204, 204)"}}>Album: {albumData?.data?.Album?.name} </span>
        ) : (
          ""
        )}
      </Link>
    </div>
  );
};
