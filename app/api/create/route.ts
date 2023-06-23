// // 下面是原本的code
import { NextRequest, NextResponse } from "next/server";
import { storage } from "../../../utils/database";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { useUploadFile, useDownloadURL } from "react-firebase-hooks/storage";
import multer from "multer";

// const upload = multer({ dest: "/public" }); // 替換為實際的上傳目錄路徑

// function runMiddleware(req: any, res: any, cb: any) {
//   if (!req.file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//     // 使用 req.file 來取得上傳的文件資訊
//     cb(new Error("Please upload an image"));
//   } else {
//     cb(null, true);
//   }
// }

// async function POST(req: any, res: any) {
//   try {
//     runMiddleware(req, res, (error: any) => {
//       if (error) {
//         console.error(error);
//         return res.status(400).json({ error: "Please upload an image" });
//       } else {
//         upload.single("fileInput")(req, res, (err: any) => {
//           if (err) {
//             console.error(err);
//             return res.status(500).json({ error: "Failed to upload image" });
//           } else {
//             console.log(req.file); // 檢查上傳的文件資訊
//             return res.json({ message: "Hello Everyone!" });
//           }
//         });
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Failed to upload image" });
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default POST;
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // const uploadImg = await req.formData();
    // const image: any = uploadImg.get("image");
    // const metatype: any = {
    //   contentType: image.mimetype,
    //   name: image.name,
    // };
    if (req) {
      const picRef = ref(storage, `test`);
      // const uploadedFile = req.images;

      // uploadBytesResumable(picRef, uploadedFile).then((snapshot) => {
      //   console.log(snapshot, 123);
      // });

      return new Response("You've already subscribed to this subreddit", {
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response("Failed to upload image.", {
      status: 500,
    });
  }
}

// export async function PostPic(req: Request, res: Response) {
//   try {
//     const [uploadFile, uploading, snapshot, error] = useUploadFile();

//     const picRef = ref(storage, `${req}`);
//     const upload = async () => {
//       const result = await uploadFile(picRef, req, {
//         contentType: "image/jpeg",
//       });
//       const getDownloadURL = async () => {
//         const downloadURLRef = ref(storage, 'path/to/file');
//         const [downloadURL, loading, error] = useDownloadURL(downloadURLRef);
//     };

//     return res.status(200).send(downloadURL);
//   } catch (error){
//     res.status(500).send({ error: "fail to upload image" });
//   }
// }

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // const [uploadFile, uploading, snapshot, error] = useUploadFile();
//     // const picRef = ref(storage, `${req}`);
//     // const upload = async () => {
//     //   const result = await uploadFile(picRef, req, {
//     //     contentType: "image/jpeg",
//     //   });
//     //   const downloadURLRef = ref(storage, "path/to/file");
//     //   const [downloadURL, loading, error] = useDownloadURL(downloadURLRef);
//     //   return res.status(200).send(downloadURL);
//     // };
//     // await upload();
//     if (req) {
//       console.log(req);
//       res.status(200).json({ message: "API request received" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "fail to upload image" });
//   }
// }
