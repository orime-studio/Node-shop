import multer from 'multer';

// הגדרת המיקום שבו התמונות יישמרו
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // המקום שבו הקובץ יישמר
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // שמירת שם הקובץ עם timestamp
  }
});

// יצירת המידות של multer
const upload = multer({ storage: storage });

export default upload;