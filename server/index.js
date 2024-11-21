const express = require("express");
const cors = require("cors");
const uploadRoute = require("./Routes/UploadRoute");
const historyListenRoute = require("./Routes/HistoryListenRoute");
const favoriteSongRoute = require("./Routes/FavoriteSongRoute");


const userRoute = require("./Routes/AuthRoute");
const roleRoute = require("./Routes/RoleRoute");
const artistRoute = require("./Routes/ArtistRoute");
const genreRoute = require("./Routes/GenreRoute");
const songRoute = require("./Routes/SongRoute");
const commentRoute = require("./Routes/CommentRoute");


const playlistRoute = require("./Routes/PlaylistRoute");
const playlistSongRoute = require("./Routes/PlaylistSongRoute");

const albumRoute = require("./Routes/AlbumRoute");
const albumSongRoute = require("./Routes/AlbumSongRoute");

const mysql2 = require("mysql2");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/uploads", uploadRoute);
app.use("/api/historyListens", historyListenRoute);
app.use("/api/favoriteSongs", favoriteSongRoute);



app.use("/api/users", userRoute);
app.use("/api/roles", roleRoute);
app.use("/api/genres", genreRoute);
app.use("/api/songs", songRoute);
app.use("/api/comments", commentRoute);


app.use("/api/artists", artistRoute);

app.use("/api/playlists", playlistRoute);
app.use("/api/playlistSongs", playlistSongRoute);

app.use("/api/albums", albumRoute);
app.use("/api/albumSongs", albumSongRoute);

const port = process.env.PORT || 5000;

const connection = mysql2.createConnection({
  host: "localhost",
  database: "avodocamusics",
  user: "root",
  password: "NawinPham01042003",
  port: "3308",
});

app.listen(port, (res, req) => {
  console.log(`server runing on port : ${port}`);

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err.stack);
      return;
    }
    console.log("Connected to the database as ID", connection.threadId);
  });
});
