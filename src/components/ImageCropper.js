import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { storage } from "../firebaseConfig";
import getCroppedImg from "../helpers/cropImage";
import { randomString } from "../helpers/random";

import {
  StyledCroppedImage,
  StyledCroppedImageWrapper,
  StyledCropperWrapper,
  StyledPhotoSelect,
  StyledProgressBar,
  StyledImageCropperWrapper,
} from "../styledComponents";
import { Button } from "./atoms/Button";
const ImageCropper = ({
  setCroped,
  setUrl,
  fullAspect,
  isVisible,
  setIsVisible,
  showCropped,
  reset,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [photo, setPhoto] = useState();
  const [progress, setProgress] = useState(0);
  const [aspect, setAspect] = useState(1);

  const handlePhotoFileChange = (e) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => setPhoto(reader.result));
    reader.readAsDataURL(e.target.files[0]);
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    showCroppedImage();
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
      upload(blob);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);
  const upload = (blob) => {
    const ref = storage.ref("photos").child(randomString());
    ref.put(blob, { contentType: blob.type }).then(() => {
      setProgress(100);
      ref.getDownloadURL().then((url) => setUrl(url));
    });
  };

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <StyledImageCropperWrapper>
      <label htmlFor="file">
        <StyledPhotoSelect>
          {progress === 100 ? "Uploaded" : "Select photo"}
        </StyledPhotoSelect>
      </label>
      <input
        style={{ display: "none" }}
        placeholder="file"
        id="file"
        name="file"
        type="file"
        onChange={(e) => handlePhotoFileChange(e)}
      />
      {photo && progress !== 100 ? (
        <>
          {progress === 100 && showCropped ? (
            <StyledCroppedImageWrapper>
              <StyledCroppedImage
                src={URL.createObjectURL(croppedImage)}
                alt="profile"
              />
            </StyledCroppedImageWrapper>
          ) : (
            <>
              <StyledCropperWrapper>
                <Cropper
                  image={photo}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  onMediaLoaded={(mediaSize) => {
                    if (fullAspect) {
                      setAspect(
                        mediaSize.naturalWidth / mediaSize.naturalHeight,
                      );
                    }
                  }}
                />
              </StyledCropperWrapper>
              <StyledProgressBar progress={progress} />
            </>
          )}
          <Button disabled={progress === 100} onClick={showCroppedImage}>
            <div className="z1">{progress === 100 ? "Uploaded" : "Upload"}</div>
          </Button>
        </>
      ) : null}
    </StyledImageCropperWrapper>
  );
};

export default ImageCropper;
