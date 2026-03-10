const crypto = require("crypto");
const fs = require("fs");

const decryptFile = (inputFile, password) => {
    try {
        const encryptedData = fs.readFileSync(inputFile);
        const key = crypto.createHash("sha256").update(password).digest();
        const iv = encryptedData.slice(0, 16);
        const data = encryptedData.slice(16);

        const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
        const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
        console.log("Decryption succeeded. Length:", decrypted.length);
    } catch (err) {
        console.error("Decryption failed:", err.message);
    }
};

console.log("Testing with Character3D#@...");
decryptFile("public/models/char_data.enc", "Character3D#@");
console.log("Testing with MyCharacter12...");
decryptFile("public/models/char_data.enc", "MyCharacter12");
