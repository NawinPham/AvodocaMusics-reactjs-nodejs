import { Link } from "react-router-dom";
import { baseUrl } from "../utils/service";
import { genreFetchData } from "../hooks/genreFetchData";

const Genres = () => {
  const { genreData } = genreFetchData();

  console.log(genreData);

  return (
    <div className="container home">
      <h2>Thể loại thịnh hành</h2>

      <div className="row">
        {genreData && genreData?.data ? (
          genreData?.data.length > 0 ? (
            genreData?.data.map((items) => (
              <div className="col-3 p-3" key={items.id}>
                <div
                  className="Boxshadow-image"
                  style={{ width: "100%", height: "200px" }}
                >
                  <Link to={`/genreDetail/${items.id}`}>
                    <img
                      className="image"
                      src={`${baseUrl}/uploads/uploadImage/${items.image}`}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="info">
                  <span>Tên thể loại: {items.name}</span>
                </div>
              </div>
            ))
          ) : (
            <p>Album trống</p>
          )
        ) : (
          <p>Loading playlist...</p>
        )}
      </div>
    </div>
  );
};

export default Genres;
