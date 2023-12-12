const CryptoJS = require("crypto-js");

var bytes  = CryptoJS.AES.decrypt("U2FsdGVkX1+OhQiBuLHQaBMrtL2UgsW40FF8PlO9f+M=", 
                'ALSDNOAdjsoaijdaoHSAoi');
var originalText = bytes.toString(CryptoJS.enc.Utf8);
console.log(originalText)