import { storage } from "../firebase/config";
import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const uploadFile = async (file) => {
  try {
    let imageToBeUploaded = file;
    let { name, extName } = getName(imageToBeUploaded);
    let fileName = name + extName;

    let metaData = {
      contentType: imageToBeUploaded.type,
    };

    const storageRef = sRef(storage, "News/" + fileName);

    const UploadFile = uploadBytesResumable(
      storageRef,
      imageToBeUploaded,
      metaData
    );

    let imgUrl = await new Promise((resolve, reject) => {
      UploadFile.on(
        "state-change",
        (snapshot) => {
          let progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(`Upload in progress: ${progress}%`);
        },
        (err) => {
          reject(
            new Error(err?.message || "Error occurred while uploading file")
          );
        },
        async () => {
          const downloadURL = await getDownloadURL(UploadFile.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
    console.log(imgUrl);
    return imgUrl;
  } catch (error) {
    throw new Error(
      error.message || "Error occurred while processing the file"
    );
  }
};

const getName = (file) => {
  let temp = file.name.split(".");
  let ext = temp.slice(temp.length - 1, temp.length);
  let name = temp.slice(0, temp.length - 1).join(".");
  let extName = "." + ext[0];
  return { name, extName };
};

export default uploadFile;
