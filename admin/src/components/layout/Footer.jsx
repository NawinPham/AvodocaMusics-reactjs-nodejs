import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div style={{ width: "50%" }}>
        <h2>Avodoca Musics</h2>
        <span>CopyRight 2024</span>
      </div>
      <div>
        <span>This is a product made by NAWINPHAM</span>
        <br />
        <Link>
          <i class="fa-brands fa-facebook-f"></i>
        </Link>
        <Link>
          <i class="fa-brands fa-youtube"></i>
        </Link>
        <Link>
          <i class="fa-brands fa-instagram"></i>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
