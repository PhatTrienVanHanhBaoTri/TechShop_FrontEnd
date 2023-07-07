import React from "react";
import Categories from "components/ProductComponents/Categories/categories";
import ExistedBrand from "./ExistedBrand/existedBrand";
import Filter from "components/ProductComponents/Filter/filter";
import Heading from "components/ProductComponents/Heading/heading";
import ProductList from "./ProductList/productList";
import "./_productGridView.scss";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ProductGridView() {
  return (
    <React.Fragment>
      <div className="col-lg-3 col-md-12 pl-0">
        <Filter />
        <Categories />
        <ExistedBrand />
      </div>
      <div className="col-lg-9 col-md-12 pr-0">
        <Heading />
        <ProductList />
      </div>
    </React.Fragment>
  );
}

export default ProductGridView;
