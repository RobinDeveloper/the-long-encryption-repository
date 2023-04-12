const crypto = require('crypto');
const fs = require('fs');

function decrypFile(){
    // The key used for encryption and decryption
    const key = Buffer.from('192ea526389c78614775b9a8165cadd5', 'hex');

// The encrypted file to be decrypted
    const encrypted_file = '../files/encrypted_file.txt';

// The decrypted file
    const decrypted_file = 'decrypted_file.txt';

// Open the encrypted file in binary mode
    const data = fs.readFileSync(encrypted_file, { encoding: null });

// Read the IV (initialization vector) used by the cipher
    const iv = data.slice(0, 16);

// Read the encrypted data
    const ciphertext = data.slice(16);

// Create an instance of the AES cipher in CBC mode with the given key and IV
    const cipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

// Decrypt the ciphertext using the AES cipher
    let plaintext = cipher.update(ciphertext);
    plaintext = Buffer.concat([plaintext, cipher.final()]);

// Remove the padding from the plaintext
    plaintext = plaintext.slice(0, -plaintext[plaintext.length - 1]);

// Write the decrypted data to the output file
    fs.writeFileSync(decrypted_file, plaintext);
}
