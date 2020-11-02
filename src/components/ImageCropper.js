import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../helpers/cropImage";
import { StyledCropperWrapper, StyledPhotoSelect } from "../styledComponents";
const ImageCropper = ({ setCroped }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [photo, setPhoto] = useState();
  const handlePhotoFileChange = (e) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => setPhoto(reader.result));
    reader.readAsDataURL(e.target.files[0]);
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        photo,
        croppedAreaPixels,
        rotation,
      );
      console.log("donee", { croppedImage });

      let blob = await fetch(croppedImage).then((r) => r.blob());
      setCroppedImage(blob);
      setCroped(blob);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <div>
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
      {photo ? (
        <>
          <StyledCropperWrapper>
            <Cropper
              image={photo}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 4}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </StyledCropperWrapper>
          <button onClick={showCroppedImage}>Crop</button>
        </>
      ) : null}
    </div>
  );
};

export default ImageCropper;
