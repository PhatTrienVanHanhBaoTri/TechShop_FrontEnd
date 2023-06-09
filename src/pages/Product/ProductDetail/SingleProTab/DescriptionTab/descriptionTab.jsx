import image from "assets/images/footer.jpeg";
import image1 from "assets/images/white.png";
import React from "react";
import "./_descriptionTab.scss";

const DescriptionTab = (props) => {
  const { longDescrip } = props;

  const renderDescription = (description) => {
    return (
      <React.Fragment>
        <p>{description}</p>
      </React.Fragment>
    );
  };

  return (
    <div className="row pro-descrip">
      <div className="col-lg-7 pro-descrip-pic">
        <img src={image} alt="apple-watch" />
        <img src={image1} alt="apple-watch" className="white-line" />
      </div>
      <div className="col-lg-5"></div>
      <div className="pro-descrip-content">
        {renderDescription(longDescrip)}
      </div>
    </div>
  );
};

export default React.memo(DescriptionTab);
