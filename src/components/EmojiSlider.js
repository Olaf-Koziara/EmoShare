import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { StyledEmojiSliderWrapper } from "../styledComponents";

const EmojiSlider = () => {
  const emojisArray = useSelector((state) => state.emojis);
  return (
    <StyledEmojiSliderWrapper>
      {emojisArray
        ? emojisArray.map((emoji, index) => (
            <li key={index}>
              <span role="img" aria-label={emoji.slug}>
                {emoji.character}
              </span>
            </li>
          ))
        : null}
    </StyledEmojiSliderWrapper>
  );
};

export default EmojiSlider;
