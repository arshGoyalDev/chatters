import { mkdirSync, renameSync } from "fs";

const uploadFiles = async (request, response, next) => {
  try {
    const files = request.files;
    let filePaths = [];

    if (!request.files) {
      return response.status(400).send("Files is/are required");
    }

    const date = Date.now();
    const fileDir = `uploads/files/${date}`;

    files.forEach((file) => {
      const fileName = `${fileDir}/${file.originalname}`;

      mkdirSync(fileDir, { recursive: true });
      renameSync(file.path, fileName);

      filePaths.push(fileName);
    });

    return response.status(200).json({ filePaths });
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

export { uploadFiles };
