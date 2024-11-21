import "../assets/css/table.css";
import { Button } from "react-bootstrap";
import { roleFetchData } from "../hooks/roles/roleFetchData";
import BtnUpdate from "../components/role/BtnUpdate";
import BtnCreate from "../components/role/BtnCreate";
import BtnDelete from "../components/role/BtnDelete";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContetx";
import { useEffect } from "react";
import { baseUrl, getRequest } from "../utils/service";
import { useState } from "react";
import { formatDatetime } from "../utils/formatDateTime";

const Role = () => {
  const { user } = useContext(AuthContext);
  const [roleData, setRoleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRequest(`${baseUrl}/roles/getAll`, user?.token);

      setRoleData(response.data);
    };
    fetchData();
  }, [user]);

  const hanldeChangePage = (newPage) => {
    if (newPage > 0 && (!roleData || newPage <= roleData.totalPages)) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = (role_id) => {
    //trả về các phần tử của mảng roleData !== role_id đã xoá
    setRoleData((prev) => prev?.filter((item) => item?.id !== role_id));
  };

  const handleUpdate = (role_id, newdata) => {
    setRoleData((prev) =>
      prev?.map((item) =>
        item?.id === role_id ? { ...item, ...newdata } : item
      )
    );
  };

  const handleCreate = (newData) => {
    setRoleData((prev) => [...prev, newData]);
  };

  return (
    <div className="home">
      <h2>Quản lí vai trò</h2>
      <br />
      <BtnCreate onCreate={handleCreate} />
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Thời gian tạo</th>
            <th scope="col">Thời gian sửa</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {roleData ? (
            roleData?.map((items, index) => (
              <tr
                style={{ height: "100px" }}
                key={items.id}
                className="table-bordered"
              >
                <th scope="row">{index + 1}</th>
                <td>{items.name}</td>
                <td>{items?.description}</td>
                <td>{items?.status === 1 ? "Đã xác nhận" : "Chưa xác nhận"}</td>
                <td style={{ width: "100px" }}>
                  {formatDatetime(items?.createdAt)}
                </td>
                <td style={{ width: "100px" }}>
                  {formatDatetime(items?.updatedAt)}
                </td>
                <td>
                  <BtnDelete role_id={items?.id} onDelete={handleDelete} />
                  <BtnUpdate role_id={items?.id} onUpdate={handleUpdate} />
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

export default Role;
