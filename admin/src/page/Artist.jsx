import "../assets/css/table.css";
import { Button } from "react-bootstrap";
import { artistFetchData } from "../hooks/artists/artistFetchData";
import BtnCreate from "../components/artist/BtnCreate";
import BtnUpdate from "../components/artist/BtnUpdate";

const Artist = ({ token }) => {
  const { artistData } = artistFetchData(token);

  const formatDateTime = (isoDate) => {
    const dateObject = new Date(isoDate);

    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = dateObject.getFullYear();

    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
    const seconds = String(dateObject.getSeconds()).padStart(2, "0");

    // Định dạng thành dd/mm/yyyy hh:mm:ss
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const hanldeChangePage = (newPage) => {
    if (newPage > 0 && (!accountData || newPage <= accountData.totalPages)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="home">
      <h2 style={{ marginBottom: "20px" }}>Quản lí nghệ sĩ</h2>
      <br />

      <BtnCreate token={token} />

      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên nghệ sĩ</th>
            <th scope="col">Tiểu sử</th>
            <th scope="col">Ngày ra mắt</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Thời gian tạo</th>
            <th scope="col">Thời gian sửa</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {artistData && artistData.data ? (
            artistData?.data.map((items, index) => (
              <tr
                style={{ height: "100px" }}
                key={items.id}
                className="table-bordered"
              >
                <th scope="row">{index + 1}</th>
                <td>{items?.name}</td>
                <td>{items?.bio}</td>
                <td> {formatDateTime(items?.debutDate)}</td>
                <td>{items?.status === 1 ? "Đã xác nhận" : "Chưa xác nhận"}</td>
                <td style={{ width: "100px" }}>
                  {formatDateTime(items?.createdAt)}
                </td>
                <td style={{ width: "100px" }}>
                  {formatDateTime(items?.updatedAt)}
                </td>
                <td>
                  <Button
                    className="btn bg-transparent border-0"
                    style={{ marginLeft: "10px" }}
                  >
                    <i
                      class="fa-solid fa-trash"
                      style={{ color: "#d60017" }}
                    ></i>
                  </Button>
                  <BtnUpdate artist_id={items.id} token={token} />
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

export default Artist;
