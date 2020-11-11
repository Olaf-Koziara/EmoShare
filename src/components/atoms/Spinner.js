import React from "react";
import { StyledSpinner, StyledSpinnerWrapper } from "../../styledComponents";
import loadingIcon from "../../assets/icons/001-loading.png";
const Spinner = ({ fullScreen, size }) => {
  return (
    <StyledSpinnerWrapper fullScreen>
      {" "}
      <StyledSpinner size={size} fullScreen src={loadingIcon} alt="loading" />
    </StyledSpinnerWrapper>
  );
};

export default Spinner;
