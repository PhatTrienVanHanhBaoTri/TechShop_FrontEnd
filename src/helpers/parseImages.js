const parseImages = (imagesString) => {
  if (imagesString !== undefined) {
    var images = imagesString.replace(/'/g, '"');
    images = JSON.parse(images);
    images = images.map((image) => `${process.env.REACT_APP_API_URL}${image}`);
    return images;
  }
  return "";
};
export default parseImages;
