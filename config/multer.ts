import multer from "multer";
import { Request } from "express";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

const Storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(null, path.join(__dirname, "../upload"));
  },

  filename: (req: Request, file: Express.Multer.File, cb: FilenameCallback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const Upload = multer({ storage: Storage }).single("foodImg");

export { Upload };
