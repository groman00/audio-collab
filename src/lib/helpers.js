/**
 * Convert blob to base64 string
 * @param {Blob} blob
 */
export function blobToBase64(blob) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    try {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };
    } catch (e) {
      reject("Error converting audio", e);
    }
  });
}
