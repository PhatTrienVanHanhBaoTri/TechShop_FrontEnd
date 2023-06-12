import HeaderSection from "components/common/HeaderSection/headerSection";
import React from "react";
import "./_specsTab.scss";
function SpecsTab(props) {
  const { specName1, spec1, specName2, spec2, specName3, spec3, specName4, spec4, generalInfo } = props;

  const renderGeneralInfo = (generalInfo) => {
    return (
      <React.Fragment>
        <div className="d-flex gen-info">
          <div className="tag">Brand:</div>
          <div>{generalInfo.brandName}</div>
        </div>
        <div className="d-flex gen-info">
          <div className="tag">Warranty:</div>
          <div>{generalInfo.warranty} month(s)</div>
        </div>
      </React.Fragment>
    );
  };

  const renderSpecsInfo = (specName1, spec1, specName2, spec2, specName3, spec3, specName4, spec4) => {
    const specifications = [
      { [specName1]: spec1 },
      { [specName2]: spec2 },
      { [specName3]: spec3 },
      { [specName4]: spec4 }
    ];
  
    return specifications.map((spec, index) => {
      const specName = Object.keys(spec)[0];
      const specValue = Object.values(spec)[0];
      return (
        <div className={`row specs ${index % 2 === 1 ? 'specs-deco' : ''}`} key={index}>
          <div className="col-4 specs-tag">{specName}</div>
          <div className="col-8 specs-content">{specValue}</div>
        </div>
      );
    });
  };

  return (
    <div className="row">
      <div className="col-lg-5">
        <HeaderSection content="General Information" />
        {renderGeneralInfo(generalInfo)}
      </div>
      <div className="col-lg-7">
        <HeaderSection content="Product Specification" />
        {renderSpecsInfo(specName1, spec1, specName2, spec2, specName3, spec3, specName4, spec4)}
      </div>
    </div>
  );
}

SpecsTab.propTypes = {};

export default SpecsTab;
