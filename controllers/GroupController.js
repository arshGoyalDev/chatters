import {renameSync, unlinkSync} from "fs";

const addGroupPic = async (request, response, next) => {
  try {
    const { file } = request;

    if (!file) {
      return response.status(400).send("File is required");
    }

    const date = Date.now();
    let fileName = "uploads/group/" + date + file.originalname;

    renameSync(file.path, fileName);

    return response.status(200).json({
      groupPic: fileName,
    });
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const removeGroupPic = async (request, response, next) => {
  try {
    const { fileName } = request;

    if (!fileName) {
      return response.status(404).send("File Not found");
    }

    unlinkSync(fileName);

    return response.status(200).send("Group Pic deleted successfully");
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

export { addGroupPic, removeGroupPic };
