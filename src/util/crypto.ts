import * as crypto from "crypto";

export const EncryptPassword = (salt: string, password: string): string => {
    return crypto.pbkdf2Sync(password, Buffer.from(salt, "base64"), 10000, 64, "sha512").toString("base64");
};