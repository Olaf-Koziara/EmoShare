import React, { useState } from "react";
import { StyledPhotoSelect } from "../styledComponents";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
const ImageUploader = ({ setField }) => {
  const [photo, setPhoto] = useState();
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [cropedPhotoUrl, setCropedPhotoUrl] = useState();
  const [cropedPhoto, setCropedPhoto] = useState();
  let imageRef;
  const handlePhotoFileChange = (e) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => setPhoto(reader.result));
    reader.readAsDataURL(e.target.files[0]);
  };
  const onImageLoaded = (image) => {
    setCrop({ width: image.width, height: image.height });
    return false; // Return false when setting crop state in here.
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  //   const onCropComplete = (crop) => {
  //     if (this.imageRef && crop.width && crop.height) {
  //       const croppedImageUrl = this.getCroppedImg(this.imageRef, crop);
  //       this.setState({ croppedImageUrl });
  //     }
  //   };
  const getCroppedImg = async (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    const reader = new FileReader();
    canvas.toBlob((blob) => {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        dataURLtoFile(reader.result, "cropped1.jpg");
      };
    });
  };
  const makeClientCrop = async (crop) => {
    if (photo && crop.width && crop.height) {
      let img = new Image();
      img.src = photo;
      console.log(img);
      const croppedImageUrl = getCroppedImg(img, crop, "newFile.jpeg");
      setCropedPhotoUrl(croppedImageUrl);
    }
  };
  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    setCropedPhoto(croppedImage);
    setField(croppedImage);
  };
  return (
    <>
      <label htmlFor="file">
        <StyledPhotoSelect>Select photo</StyledPhotoSelect>
      </label>
      <input
        style={{ display: "none" }}
        placeholder="file"
        id="file"
        name="file"
        type="file"
        onChange={(e) => handlePhotoFileChange(e)}
      />
      <ReactCrop
        onImageLoaded={onImageLoaded}
        onComplete={makeClientCrop}
        onChange={onCropChange}
        src={photo}
        crop={crop}
      />
      <button onClick={() => dataURLtoFile(cropedPhotoUrl, photo.name)}>
        Dodaj
      </button>
    </>
  );
};

export default ImageUploader;
