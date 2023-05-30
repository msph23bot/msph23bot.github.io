"use strict";
const encrypt = (text) => {
  let hash = CryptoJS.SHA256(text);
  var s = "0x";
  for (let i = 0; i < hash.words.length; i++)
  {
    s += hash.words[i].toString(32);
  }
  return s;
};
