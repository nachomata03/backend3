import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "others";

        const ext = path.extname(file.originalname).toLowerCase();
        if ([".png", ".jpg", ".jpeg"].includes(ext)) {
            folder = "pets";
        } else {
            folder = "documents";
        }
        const dir = path.join(__dirname, "..", "..", "public", folder);
        
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const uploader = multer({ storage });