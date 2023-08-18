import Cloud, { v2 } from "cloudinary";
const cloudinary: typeof v2 = Cloud.v2;

cloudinary.config({
  cloud_name: "daqpb7odj",
  api_key: "579437147678149",
  api_secret: "982qH3ZlrqEkr91weQe2XQQo3jo",
  secure: true,
});

export default cloudinary;
