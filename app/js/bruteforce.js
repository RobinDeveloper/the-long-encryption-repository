//const crypto = require('crypto');
//const fs = require('fs');

let keysChecked = document.querySelector('.keys-checked');
let currentKey = document.querySelector('.current-key');
let keysCheckedCount = 0;
let currentKeyString = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

function nextString(s) {
    /*
    Given a string 's', return the next string in alphabetical order.
    Assumes 's' is a string of alphanumeric characters only.
    */
    // Convert string to a list of characters for easier manipulation
    let chars = s.split('');

    // Start by incrementing the last character
    let i = chars.length - 1;
    while (i >= 0) {
        // Increment current character
        if (chars[i] == '9') {
            chars[i] = 'a';
        } else if (chars[i] == 'z') {
            chars[i] = '0';
            break;
        } else {
            chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
            break;
        }

        // Move to next character if current one was '9', 'z' or 'Z'
        i--;
    }

    // If all characters were '9', 'z' or 'Z', add a new 'a'
    if (i < 0) {
        chars.unshift('a');
    }

    // Convert list back to a string and return it
    return chars.join('');
}

let s = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
let e = '192ea526389c78614775b9a8165cadd5';



function setup()
{
    window.requestAnimationFrame(draw);
}

function sendDataCount() {
    fetch('/keys-checked', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keysChecked: keysCheckedCount})
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

function sendDataKey() {
    fetch('/current-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentKey: currentKeyString})
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

// function decrypFile(){
//     // The key used for encryption and decryption
//     const key = Buffer.from('192ea526389c78614775b9a8165cadd5', 'hex');
//
// // The encrypted file to be decrypted
//     const encrypted_file = '../files/encrypted_file.txt';
//
// // The decrypted file
//     const decrypted_file = 'decrypted_file.txt';
//
// // Open the encrypted file in binary mode
//     const data = fs.readFileSync(encrypted_file, { encoding: null });
//
// // Read the IV (initialization vector) used by the cipher
//     const iv = data.slice(0, 16);
//
// // Read the encrypted data
//     const ciphertext = data.slice(16);
//
// // Create an instance of the AES cipher in CBC mode with the given key and IV
//     const cipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
//
// // Decrypt the ciphertext using the AES cipher
//     let plaintext = cipher.update(ciphertext);
//     plaintext = Buffer.concat([plaintext, cipher.final()]);
//
// // Remove the padding from the plaintext
//     plaintext = plaintext.slice(0, -plaintext[plaintext.length - 1]);
//
// // Write the decrypted data to the output file
//     fs.writeFileSync(decrypted_file, plaintext);
// }

function CallDecrypt() {
    //decrypFile();
}

function draw(){
    if(s === e && hitOnce === false)
        CallDecrypt();
    else if(s ===e)
        return

    s = nextString(s);
    currentKeyString = s;
    keysCheckedCount++;
    keysChecked.textContent = `Keys checked: ${keysCheckedCount}`;
    currentKey.textContent = `Current key: ${currentKeyString}`;
    sendDataCount();
    sendDataKey();
    window.requestAnimationFrame(draw);
}

setup();
