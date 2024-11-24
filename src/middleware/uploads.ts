import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Saving file to destination: public/uploads");
        cb(null, `public/uploads`); // מוודא שהתיקייה קיימת ושיש לה הרשאות מתאימות
    },
    filename: (req, file, cb) => {
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        console.log("Generated filename:", uniqueFilename);
        cb(null, uniqueFilename);

        console.log(`Saving file as: public/uploads/${uniqueFilename}`);

    },
    
});

const upload = multer({ storage });

console.log("Multer storage initialized with public/uploads directory");

export default upload;
