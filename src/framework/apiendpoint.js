import axios from "axios";
import Cookies from "js-cookie";
import CryptoJs from "crypto-js";
let apiPath = process.env.REACT_APP_SERVER_URL;
let hashkey = process.env.REACT_APP_BREVO_API_KEY;

function getToken() {
  // try {
  //   const getUserData = Cookies.get("User_auth");
  //   if (!getUserData) {
  //     console.error("Cookie 'User_auth' not found.");
  //     return null;
  //   }

  //   const descryptuserdata = JSON.parse(getUserData);
  //   const parseData = CryptoJs.AES.decrypt(
  //     descryptuserdata.data,
  //     hashkey
  //   ).toString(CryptoJs.enc.Utf8);

  //   if (!parseData) {
  //     console.error("Decryption failed.");
  //     return null;
  //   }

  //   const parseUserData = JSON.parse(parseData);
  //   // console.log("Extracted token:", parseUserData?.token);
  //   return parseUserData?.token || null;
  // } catch (e) {
  //   console.error("Error extracting token:", e);
  //   return null;
  // }
}
// User login API
// async function loginAPI(username, password, captcha) {
//   const url = `${apiPath}signin`;
//   const body = {
//     username: username,
//     password: password,
//     captcha: captcha,
//   };
//   const token = CryptoJs.AES.encrypt(JSON.stringify(body), hashkey).toString();
//   const data = {
//     data: token,
//   };
//   try {
//     const response = await axios.post(url, data);
//     return response.data;
//   } catch (error) {
//     console.error("API login error:", error);
//     throw error;
//   }
// }

// User logout API
// async function logoutAPI() {
//   const token = getToken();
//   if (!token) {
//     return null;
//   }
//   const url = `${apiPath}logout`;

//   try {
//     const result = await axios.post(
//       url,
//       {},
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Use the retrieved token
//           Accept: "application/json",
//         },
//       }
//     );
//     return result.data;
//   } catch (error) {
//     console.error("API Logout error:", error);
//     throw error;
//   }
// }



// Export all API utilities
export const apiUtilities = {
  // loginAPI,
};
