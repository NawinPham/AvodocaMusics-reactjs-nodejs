import { Button } from "react-bootstrap";
import { baseUrl, getRequest, postRequest } from "../../utils/service";
import ToastrService from "../../utils/toastr";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const BtnFavoriteSong = ({ song_id, favoriteUser }) => {
  const { user } = useContext(AuthContext);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  useEffect(() => {
    if (favoriteUser?.data) {
      setFavoriteSongs(favoriteUser.data);
    }
  }, [favoriteUser]);

  const handleClick = async () => {
    //ckeck favorite user
    const isFavorite = isFavoriteSong(song_id);

    if (!user?.token) {
      ToastrService.error("Bạn hãy đăng nhập");
      return;
    }

    if (!isFavorite) {
      const response = await postRequest(
        `${baseUrl}/favoriteSongs/create/${song_id}`,
        null,
        user?.token
      );
      if (response.error) {
        ToastrService.error(response.message);
        return;
      }

      //thêm song_id vào favoriteSongs
      setFavoriteSongs((prev) => [...prev, { songs_id: song_id }]);

      ToastrService.success(response.message);
    } else {
      const response = await getRequest(
        `${baseUrl}/favoriteSongs/delete/${song_id}`,
        user?.token
      );
      if (response.error) {
        ToastrService.error(response.message);
        return;
      }

      //filter xoá song_id khỏi favoriteSongs
      setFavoriteSongs((prev) =>
        prev.filter((favoriteSong) => favoriteSong?.songs_id !== song_id)
      );

      ToastrService.success(response.message);
    }
  };

  //check exist favorite user
  const isFavoriteSong = (songId) => {
    return favoriteSongs.some(
      (favoriteSong) => favoriteSong.songs_id === songId
    );
  };

  return (
    <Button
      className="btn bg-transparent border-0"
      onClick={() => handleClick()}
      style={{ color: isFavoriteSong(song_id) ? "red" : "white" }}
    >
      <i class="fa-solid fa-heart"></i>
    </Button>
  );
};

export default BtnFavoriteSong;
