import {
  faEye,
  faPlus,
  faHotel,
  faTrash,
  faExclamation,
  faCircleNotch,
  faFileCsv,
  faFileExcel,
  faFilePdf,
  faBars,
  faRetweet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PropTypes from "prop-types";

const FontAwesomeIconType = (props) => {
  const fontAwesomeIconTypes = {
    plus: faPlus,
    eye: faEye,
    hotel: faHotel,
    trash: faTrash,
    help: faExclamation,
    circleNotch: faCircleNotch,
    fileCsv: faFileCsv,
    fileExcel: faFileExcel,
    filePdf: faFilePdf,
    bars: faBars,
    retweet: faRetweet,
  };
  return (
    <FontAwesomeIcon
      icon={(props?.icon && fontAwesomeIconTypes[props.icon]) || ""}
    />
  );
};
export default FontAwesomeIconType;
FontAwesomeIconType.propTypes = {
  icon: PropTypes.string,
};
