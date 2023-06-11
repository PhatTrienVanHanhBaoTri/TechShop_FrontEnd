import React from "react";
import PropTypes from "prop-types";
import ProductRating from "components/common/ProductRating/productRating";
import "./_productInfo.scss";
import handlePrice from "helpers/formatPrice";

ProductInfo.propTypes = {
  product: PropTypes.object,
};
ProductInfo.defaultProps = {
  products: {},
};

function ProductInfo(props) {
  const { product } = props;
  //console.log("info");
  return (
    <React.Fragment>
      <div className="title">
        <div className="product-name">{product.productName}</div>
        <div className="product-rating">
          <ProductRating rate={product.productRate} />
        </div>
      </div>
      <div className="title">
        <div className="product-price">
          {handlePrice(product.productPrice)} <u>đ</u>
        </div>
        <div className="">
          <i>Brand: </i>
          <span className="product-price">{product.brandName}</span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(ProductInfo);
