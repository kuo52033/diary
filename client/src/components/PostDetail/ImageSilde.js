import { useState, useRef } from "react";

import useStyle from "./styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const ImageSilde = ({ images }) => {
  const classes = useStyle();
  const slideIndex = useRef(0);
  const [slideLeft, setSlideLeft] = useState("0");

  const handleForward = () => {
    slideIndex.current += 1;
    setSlideLeft(`-${slideIndex.current}00%`);
  };

  const handleBackward = () => {
    slideIndex.current -= 1;
    if (slideIndex.current === 0) {
      setSlideLeft("0");
    } else {
      setSlideLeft(`-${slideIndex.current}00%`);
    }
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          width: `${images.length}00%`,
          height: "100%",
          left: slideLeft,
          transition: "left 0.3s ease-in-out",
          display: "flex",
          alignItems: "center",
        }}
      >
        {images.map((image, idx) => (
          <img
            key={idx}
            src={image.url}
            alt=""
            style={{
              width: `${100 / images.length}%`,
              aspectRatio: "1/1",
              objectFit: "contain",
            }}
          />
        ))}
      </div>
      <div className={classes.dotContainer}>
        {images.length !== 1 &&
          Array.from({ length: images.length }).map((item, index) => (
            <div
              key={index}
              className={
                index === slideIndex.current
                  ? `${classes.dot} active`
                  : classes.dot
              }
            />
          ))}
      </div>
      {images.length !== 1 && (
        <>
          {slideIndex.current !== images.length - 1 && (
            <div
              className={`${classes.forward} ${classes.button}`}
              onClick={handleForward}
            >
              <ArrowForwardIcon />
            </div>
          )}
          {slideIndex.current !== 0 && (
            <div
              className={`${classes.backward} ${classes.button}`}
              onClick={handleBackward}
            >
              <ArrowBackIcon />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ImageSilde;
