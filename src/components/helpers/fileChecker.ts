type SizeType = "mb" | "kb";
interface FileType {
  size: number;
  type: string;
  name: string;
}

export const fileDetails = async (
  file: FileType,
  sizeType: SizeType = "kb"
) => {
  let size = file.size;
  let type = file.type;
  let name = file.name;
  let width = 0;
  let height = 0;
  size = Number(size) / 1024;
  if (sizeType === "mb") {
    size = size / 1000;
  }

  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file as unknown as Blob);

    // Read the image file
    reader.onload = function () {
      var image = new Image();
      image.src = reader.result as string;

      // After the image is loaded, get its dimensions
      image.onload = function () {
        width = image.width;
        height = image.height;
        resolve({ size, type, name, dimension: { width, height } });
      };
    };
  });
};
