const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
		);
	},
});

// const upload = multer({ storage: storage }).single("avatar");
const images = multer({ storage: storage }).single("image");
const productUpload = multer({storage:storage}).single("drugImage")
const pictureUpload = multer({storage:storage}).single("picture")
const chatUpload = multer({storage:storage}).single("msgImg")

module.exports = {
	images,
	productUpload, pictureUpload, chatUpload
}
	// images