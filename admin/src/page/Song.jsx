import "../assets/css/table.css";
import { useState } from "react";
import { baseUrl, getRequest } from "../utils/service";
import { Button } from "react-bootstrap";
import BtnUpdateSong from "../components/songs/Update";
import songFetchData from "../hooks/songs/songFetchData";
import ToastrService from "../utils/toastr";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContetx";
import { formatDatetime } from "../utils/formatDateTime";
import BtnCreate from "../components/songs/BtnCreate";

const Songs = () => {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const { songData, setSongData } = songFetchData(user?.token, currentPage);

  const hanldeChangePage = (newPage) => {
    if (newPage > 0 && (!songData || newPage <= songData.totalPages)) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = async (song_id) => {
    const response = await getRequest(
      `${baseUrl}/songs/delete/${song_id}`,
      user?.token
    );
    if (response.error) {
      ToastrService.error(response.message);
      return;
    }
    ToastrService.success(response.message);
    setSongData((prev) => ({
      ...prev,
      data: prev.data.filter((item) => item?.id !== song_id),
    }));
  };

  const hanldeCreate = (newData) => {
    setSongData((prev) => [...prev, newData]);
  };

  return (
    <div className="home">
      <h2 style={{ marginBottom: "20px" }}>Quản lí bài hát</h2>
      <BtnCreate onCreate={hanldeCreate} />
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Order</th>
            <th scope="col">Tên</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Thể loại</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Thời gian tạo</th>
            <th scope="col">Thời gian sửa</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {songData && songData?.data ? (
            songData?.data.map((items, index) => (
              <tr
                style={{ height: "100px" }}
                key={items.id}
                className="table-bordered"
              >
                <th scope="row">{index + 1 + (currentPage - 1) * 10}</th>
                <td>{items?.name}</td>
                <td>
                  <img
                    src={`${baseUrl}/uploads/uploadImage/${items?.image}`}
                    alt=""
                    style={{ width: "80px" }}
                  />
                </td>
                <td>{items?.Genre?.name}</td>
                <td>{items?.description}</td>
                <td>{items?.status === 1 ? "Đã xác nhận" : "Chưa xác nhận"}</td>
                <td style={{ width: "100px" }}>
                  {formatDatetime(items?.createdAt)}
                </td>
                <td style={{ width: "100px" }}>
                  {formatDatetime(items?.updatedAt)}
                </td>
                <td>
                  <Button
                    className="btn bg-transparent border-0"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleDelete(items?.id)}
                  >
                    <i
                      class="fa-solid fa-trash"
                      style={{ color: "#d60017" }}
                    ></i>
                  </Button>
                  <BtnUpdateSong song_id={items?.id} />
                </td>
              </tr>
            ))
          ) : (
            <p>loading song...</p>
          )}
        </tbody>
      </table>
      <div className="change-page">
        <Button
          className="btn bg-transparent border-0"
          onClick={() => hanldeChangePage(currentPage - 1)}
        >
          prev
        </Button>
        <Button
          className="btn bg-transparent border-0"
          onClick={() => hanldeChangePage(currentPage + 1)}
        >
          next
        </Button>
      </div>
    </div>
  );
};

export default Songs;
