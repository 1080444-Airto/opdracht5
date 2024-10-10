const Crypto = require('crypto');
const prompt = require('prompt-sync')();
const secret_key = 'secret_key'
const secret_iv = 'secret_iv';
const encryptionMethod = 'AES-256-CBC';
const key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0, 32);
const iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0, 16);

function encrypt_string(plain_text, encryptionMethod, secret, iv){
    const encryptor = Crypto.createCipheriv(encryptionMethod, secret, iv);
    const aes_encrypted = encryptor.update(plain_text, 'utf8', 'base64') + encryptor.final('base64');
    return Buffer.from(aes_encrypted).toString('base64');
}

function decrypt_string(encrytedMessage, encryptionMethod, secret, iv){
    const buff = Buffer.from(encrytedMessage, 'base64');
    encrytedMessage = buff.toString('utf-8');
    const decryptor = Crypto.createDecipheriv(encryptionMethod, secret, iv);
    return decryptor.update(encrytedMessage, 'base64', 'utf8') + decryptor.final('utf8');
}

const txt = prompt("Fill something in: ")
const encrytedMessage = encrypt_string(txt, encryptionMethod, key, iv)
console.log(encrytedMessage)
const decryptedMessage = decrypt_string(encrytedMessage, encryptionMethod, key, iv)
console.log(decryptedMessage)
