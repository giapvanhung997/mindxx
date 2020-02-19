const express = require('express')
const app = express()
const port = 3000
import multer from "multer";

const fileFilter = (req, file, callback) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        callback(null, true);
    } else {
        callback(new Error("File format should be PNG,JPG,JPEG"), false); // if validation failed then generate error
    }
};
const limits = {
    fileSize: 1024 * 1024 * 5
};
const createFileName = (req, file, callback) => {
    const newFileName = file.originalname.replace(/ - /g, " ").replace(/ /g, "-");
    const fileNames = newFileName.split(".");
    let filename = "";
    for (let i = 0; i < fileNames.length - 1; i++) {
        filename = `${filename + fileNames[i].trim().replace(" ", "-")}`;
        filename = filename.trim().replace(" ", "-");
    }
    filename = `${filename}-${Date.now()}.${fileNames[fileNames.length - 1]}`;
    callback(null, filename);
};
const storageImageTemp = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads");
    },
    filename: (req, file, callback) => createFileName(req, file, callback)
});

const imageTemp = multer({
    storage: storageImageTemp,
    fileFilter: fileFilter,
    limits: limits
});
app.get('/', (req, res) => res.send('Gờ Vờ Hùng'))
app.post('/upload', imageTemp.single('file'), (req, res, next) => {
    res.json("okay")
})
app.listen(port, () => console.log(`Ứng dụng đang chạy trên cổng ${port}!`))