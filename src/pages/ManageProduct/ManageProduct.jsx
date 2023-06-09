import "./_manageProduct.scss";
import {
  addNewBreadcrumb,
  removeLastBreadcrumb,
} from "utilities/slices/breadcrumbSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Breadcrumb from "components/common/Breadcrumb/breadcrumb";

export default function ManageProduct() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: "Manage Products",
        slug: "/ManageProducts",
      })
    );
    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch]);

  return (
    <div className="wrapper-dashboard product-area">
      <div className="child-banner product-banner">
        <div className="breadcrumb-nav container">
          <Breadcrumb />
        </div>
      </div>
      <div className="product-grid-view">
        <div className="container-fluid">
          <div className="row">
            <button className=""> Mangasifhsu</button>
          </div>
        </div>
      </div>
    </div>
  );
}
