import crypto from "crypto";

const generateKeyPair = async () => {
  try {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "ECDH",
        namedCurve: "P-256",
      },
      true,
      ["deriveKey", "deriveBits"]
    );

    // const publicKeyBuffer = await crypto.subtle.exportKey(
    //   'spki',
    //   keyPair.publicKey
    // );

    // const publicKeyBase64 = btoa(
    //   String.fromCharCode(...new Uint8Array(publicKeyBuffer))
    // );

    // // Store the private key securely in the browser
    // // In a real app, you might use the browser's IndexedDB for more persistent storage
    // localStorage.setItem('privateKey', await exportPrivateKeyToStorage(keyPair.privateKey));

    return {
      privateKey: keyPair.privateKey,
      publicKey: keyPair.publicKey,
      // publicKeyBase64
    };
  } catch (error) {
    console.error("Error generating key pair:", error);
    throw error;
  }
};

// const exportPrivateKeyToStorage =async (privateKey) => {
//   const exported = await window.crypto.subtle.exportKey(
//     'pkcs8',
//     privateKey
//   );
//   return btoa(String.fromCharCode(...new Uint8Array(exported)));
// }

// async function importPrivateKeyFromStorage(privateKeyBase64) {
//   const binaryString = atob(privateKeyBase64);
//   const bytes = new Uint8Array(binaryString.length);
//   for (let i = 0; i < binaryString.length; i++) {
//     bytes[i] = binaryString.charCodeAt(i);
//   }

//   return window.crypto.subtle.importKey(
//     'pkcs8',
//     bytes.buffer,
//     {
//       name: 'ECDH',
//       namedCurve: 'P-256'
//     },
//     true,
//     ['deriveKey', 'deriveBits']
//   );
// }

export { generateKeyPair };
