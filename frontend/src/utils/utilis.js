/* eslint-disable no-useless-escape */
import CryptoJS from "crypto-js";

let secretPass =
  import.meta.env.SECRET_KEY ||
  "530c3c35956d15c5fae3a877f41a563347df31e911d282c081c86864f7f44981";

export const setToLocal = (label, data) => {
  let encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretPass
  ).toString();
  localStorage.setItem(label, encryptedData);
  return encryptedData;
};

export const getFromLocal = (label) => {
  const data = localStorage.getItem(label);
  if (data == null || data == undefined) return;
  const bytes = CryptoJS.AES.decrypt(data, secretPass);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};


export const validatePassword = (password) => {
  const minLength = 8;
  const complexityRequirements = [
    { regex: /[A-Z]/, message: "uppercase letter" },
    { regex: /[a-z]/, message: "lowercase letter" },
    { regex: /\d/, message: "digit" },
    { regex: /[!@#$%^&*]/, message: "special character" },
  ];
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }

  for (const requirement of complexityRequirements) {
    if (!requirement.regex.test(password)) {
      return `Password must contain at least one ${requirement.message}.`;
    }
  }
  return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!emailRegex.test(email)) {
    return "Invalid email address.";
  }

  return null;
};
