import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

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
