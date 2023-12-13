import multer from "multer"
const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, './public/uploads');
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname);
//     }
// })
// const uploadFile = multer({storage: storage});

// export default uploadFile;