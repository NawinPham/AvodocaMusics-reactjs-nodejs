import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const SliderBar = () => {
  return (
    <div
      className=" min-vh-100 sidebar"
      fixed="left"
      style={{
        width: "200px",
        marginTop: "60px",
        position: "fixed",
        backgroundColor: " #2b2b2b",
      }}
    >
      <div className="row" style={{ width: "100%" }}>
        <ul style={{ textAlign: "center", paddingTop: "30px" }}>
          <Stack gap={3} className="SideBar">
            <li>
              <Link to={"/accounts"}>
                <i class="fa-solid fa-user"></i> Tài khoản
              </Link>
            </li>
            <li>
              <Link to={"/roles"}>
                <i class="fa-solid fa-hat-cowboy"></i> Vai trò
              </Link>
            </li>
            <li>
              <Link to={"/artists"}>
                <i class="fa-solid fa-guitar"></i> Nghệ sĩ
              </Link>
            </li>
            <li>
              <Link to={"/songs"}>
                <i class="fa-solid fa-music"></i> Bài hát
              </Link>
            </li>
            <li>
              <Link to={"/genres"}>
                <i class="fa-solid fa-compact-disc"></i> Album
              </Link>
            </li>
            <li>
              <Link to={"/genres"}>
                <i class="fa-solid fa-list"></i> Thể loại
              </Link>
            </li>
          </Stack>
        </ul>
      </div>
    </div>
  );
};

export default SliderBar;
