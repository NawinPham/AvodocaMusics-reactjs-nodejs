const fs = require("fs");
const path = require("path");

const musicDir = path.join("D:", "Pictures");

const uploadImage = (req , res) => {
    try {
    const { url } = req.params;

    const filePath = path.join(musicDir, url);

    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    } else {
      res.status(404).json({ message: "File not found" });
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

module.exports = {uploadImage}