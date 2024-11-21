import { useState } from "react";
import { Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?name=${searchTerm}`);
    }
  };

  return (
    <div
      className=" min-vh-100 sidebar"
      fixed="left"
      style={{
        width: "200px",
        marginTop: "80px",
        position: "fixed",
        backgroundColor: " #2b2b2b",
      }}
    >
      <div className="row" style={{ width: "100%" }}>
        <Stack gap={3} className="search">
          <input
            required
            type="text"
            placeholder="Tìm kiếm"
            style={{ color: "white" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Stack>
        <ul style={{ textAlign: "center", paddingTop: "30px" }}>
          <Stack gap={3} className="SideBar">
            <li>
              <Link to={"/"}>
                {" "}
                <i
                  class="fa-solid fa-globe"
                  style={{ color: "#30720e", paddingRight: "5px" }}
                ></i>{" "}
                Khám Phá
              </Link>
            </li>
            <li>
              <Link to={"/BXHSong"}>
                <i
                  class="fa-solid fa-music"
                  style={{ color: "#30720e", paddingRight: "5px" }}
                ></i>{" "}
                BXH Nhạc
              </Link>
            </li>
            <li>
              <Link to={"/genre"}>
                <i
                  class="fa-solid fa-gift"
                  style={{ color: "#30720e", paddingRight: "5px" }}
                ></i>{" "}
                Thể loại
              </Link>
            </li>
          </Stack>
        </ul>
        <ul
          style={{
            textAlign: "center",
            paddingRight: 0,
            paddingTop: "30px",
            borderTop: "1px solid #363636",
          }}
        >
          <Stack gap={3} className="SideBar">
            <li>
              <Link to={"/favorite"}>
                <i
                  class="fa-solid fa-heart"
                  style={{ color: "#d60017", paddingRight: "5px" }}
                ></i>{" "}
                Yêu thích
              </Link>
            </li>
            <li>
              <Link to={"/history"}>
                <i
                  class="fa-solid fa-clock-rotate-left"
                  style={{ color: "#30720e", paddingRight: "5px" }}
                ></i>{" "}
                Nghe gần đây
              </Link>
            </li>
            <li>
              <Link to={"/playlist"}>
                <i
                  class="fa-solid fa-list"
                  style={{ color: "#30720e", paddingRight: "5px" }}
                ></i>
                Danh sách phát
              </Link>
            </li>
            <li>
              <Link to={"/album"}>
                <i
                  class="fa-solid fa-record-vinyl"
                  style={{ color: "#30720e", paddingRight: "5px" }}
                ></i>{" "}
                Album
              </Link>
            </li>
            <li>
              <Link to={"/uploaded"}>
                <i
                  class="fa-solid fa-upload"
                  style={{ color: "#30720e", paddingRight: "5px" }}
                ></i>{" "}
                Đã tải lên
              </Link>
            </li>
          </Stack>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
