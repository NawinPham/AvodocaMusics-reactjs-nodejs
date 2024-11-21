import "../assets/css/table.css";
import { Button } from "react-bootstrap";
import { accountFetchData } from "../hooks/accounts/accountFetchData";
import { useState } from "react";
import BtnUpdate from "../components/account/BtnUpdate";
import { accountDeleteData } from "../hooks/accounts/accountDeleteData";

const Account = ({ token }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { accountData } = accountFetchData(token, currentPage);

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

  const hanldeClickDelete = (account_id) => {
    accountDeleteData(account_id, token);
  };

  return (
    <div className="home">
      <h2 style={{ marginBottom: "20px" }}>Quản lí tài khoản</h2>

      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên tài khoản</th>
            <th scope="col">Tên đầy đủ</th>
            <th scope="col">Email</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">SĐT</th>
            <th scope="col">Vai trò</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">CreateAt</th>
            <th scope="col">UpdateAt</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {accountData && accountData.data ? (
            accountData?.data.map((items, index) => (
              <tr
                style={{ height: "100px" }}
                key={items.id}
                className="table-bordered"
              >
                <th scope="row">{index + 1 + (currentPage - 1) * 10}</th>
                <td>{items?.username}</td>
                <td style={{ minWidth: "175px" }}>{items?.fullname}</td>
                <td style={{ minWidth: "175px" }}>{items?.email}</td>
                <td style={{ minWidth: "100px" }}>{items?.address}</td>
                <td style={{ minWidth: "100px" }}>{items?.phone}</td>
                <td style={{ minWidth: "100px" }}>{items?.Role.name}</td>
                <td style={{ minWidth: "100px" }}>
                  {items?.status === 1 ? "Đã xác nhận" : "Chưa xác nhận"}
                </td>
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
                    onClick={() => hanldeClickDelete(items?.id)}
                  >
                    <i
                      class="fa-solid fa-trash"
                      style={{ color: "#d60017" }}
                    ></i>
                  </Button>
                  <BtnUpdate account_id={items?.id} token={token} />
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

export default Account;
