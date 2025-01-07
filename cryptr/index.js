import dotenv from "dotenv"

import crypto from "crypto";

dotenv.config();

const algorithm = "aes-256-cbc";
const key = crypto.pbkdf2Sync(process.env.CRYPTOKEY1, process.env.CRYPTOKEY1, 10000, 32, 'sha512');
const iv = new Buffer(process.env.BUFFERCODE, 'binary');

const encryptMessage = (messageContent) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(messageContent, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
};

const decryptMessage = (encryptedContent) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encryptedContent, "hex", "utf8");
  decrypted += decipher.final("utf8");
  
  return decrypted;
};

export { encryptMessage, decryptMessage };
