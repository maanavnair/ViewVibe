import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve(__dirname, '../temp')); // specify the destination folder
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
export { upload };
