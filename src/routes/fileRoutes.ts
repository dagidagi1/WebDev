import express from 'express'
const router = express.Router()
import multer from "multer";

const base = "http://192.168.59.246:3000/";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload_files/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg"); //Appending .jpg
  },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), function (req:any, res) {
  console.log("router.post(/file: " + base + req.file.path);
  res.status(200).send({ url: base + req.file.path });
});

export = router