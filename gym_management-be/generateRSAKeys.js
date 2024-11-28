// generateRSAKeys.js
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// Define key file paths
const privateKeyPath = path.join(__dirname, "src/keys/private.pem");
const publicKeyPath = path.join(__dirname, "src/keys/public.pem");

// Generate RSA key pair (2048 bits)
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki", // Recommended format for public key
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8", // Recommended format for private key
    format: "pem",
  },
});

// Save private key to file
fs.writeFileSync(privateKeyPath, privateKey, { encoding: "utf8" });
console.log(`Private key saved to: ${privateKeyPath}`);

// Save public key to file
fs.writeFileSync(publicKeyPath, publicKey, { encoding: "utf8" });
console.log(`Public key saved to: ${publicKeyPath}`);
