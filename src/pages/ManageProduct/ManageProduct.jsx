import "./_manageProduct.scss";
import {
  addNewBreadcrumb,
  removeLastBreadcrumb,
} from "utilities/slices/breadcrumbSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Breadcrumb from "components/common/Breadcrumb/breadcrumb";
import { Route } from "react-router-dom";
import DoneIcon from "../../assets/icons/done.svg";
import CancelIcon from "../../assets/icons/cancel.svg";
import RefundedIcon from "../../assets/icons/refunded.svg";
import "./Style/style.css";
import ProductApi from "api/productApi";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function ManageProduct() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  let [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      let response = [];
      response = await ProductApi.getAllProducts({});
      setProducts(response);
      setAllProducts(response);
    }

    fetchProduct();
  }, []);

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

  useEffect(() => {
    setPagination(calculateRange(products, 5));
    setProducts(sliceData(products, page, 5));
  }, []);

  // Search
  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      products = allProducts;
      let search_results = products.filter(
        (item) =>
          item.productName
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase()) ||
          item.categoryName
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase())
      );
      setProducts(search_results);
    } else {
      products = allProducts;
      __handleChangePage(1);
    }
  };

  const calculateRange = (data, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
  };

  const sliceData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  };

  // Change Page
  const __handleChangePage = (new_page) => {
    setPage(new_page);
    setProducts(sliceData(products, new_page, 5));
  };

  return (
    <div className="wrapper-dashboard product-area">
      <div className="child-banner product-banner">
        <div className="breadcrumb-nav container">
          <Breadcrumb />
        </div>
      </div>
      <div className="product-grid-view">
        <div className="container-fluid">
          <div className="dashboard-content">
            <div className="dashboard-content-container">
              <div className="dashboard-content-header">
                <h2>Products List</h2>
                <div className="dashboard-content-search">
                  <input
                    type="text"
                    placeholder="Search.."
                    className="dashboard-content-input"
                    onChange={__handleSearch}
                    value={search}
                  />
                </div>
              </div>

              <table className="d-flex flex-column">
                <thead>
                  <tr className="d-flex flex-row">
                    <th style={{ flex: 1, display: "flex" }}>ID</th>
                    <th style={{ flex: 9, display: "flex" }}>NAME</th>
                    <th style={{ flex: 3, display: "flex" }}>CATEGORY</th>
                    <th style={{ flex: 3, display: "flex" }}>BRAND</th>
                    <th style={{ flex: 3, display: "flex" }}>PRICE</th>
                    <th style={{ flex: 2, display: "flex", padding: "0" }}></th>
                    <th style={{ flex: 2, display: "flex", padding: "0" }}></th>
                    <th style={{ flex: 2, display: "flex", padding: "0" }}></th>
                  </tr>
                </thead>

                {products.length !== 0 ? (
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index} className="d-flex flex-row">
                        <td
                          style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span className="text-truncate">
                            {product.productID}
                          </span>
                        </td>
                        <td
                          style={{
                            flex: 9,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={product.images}
                            className="dashboard-content-avatar"
                            alt=""
                          />
                          <span className="text-truncate">
                            {product.productName}
                          </span>
                        </td>
                        <td
                          style={{
                            flex: 3,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <span className="text-truncate">
                              {product.categoryName}
                            </span>
                          </div>
                        </td>
                        <td
                          style={{
                            flex: 3,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <span className="text-truncate">
                              {product.brandName}
                            </span>
                          </div>
                        </td>
                        <td
                          style={{
                            flex: 3,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span className="text-truncate">
                            {product.productPrice}
                          </span>
                        </td>

                        <td
                          style={{
                            flex: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0",
                            fontSize: "13px",
                          }}
                        >
                          <Link to={`/ManageProducts/${product.productName}`}>
                            <span style={{ color: "#54b4e8" }}>Details</span>
                          </Link>
                        </td>

                        <td
                          style={{
                            flex: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0",
                            fontSize: "13px",
                          }}
                        >
                          <Link to={`/ManageProducts/${product.productName}`}>
                            <span style={{ color: "#e8b754" }}>Edit</span>
                          </Link>
                        </td>

                        <td
                          style={{
                            flex: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0",
                            fontSize: "13px",
                          }}
                        >
                          <Link to={`/ManageProducts/${product.productName}`}>
                            <span style={{ color: "#e85e54" }}>Delete</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : null}
              </table>

              {products.length !== 0 ? (
                <div className="dashboard-content-footer">
                  {pagination.map((item, index) => (
                    <span
                      key={index}
                      className={
                        item === page ? "active-pagination" : "pagination"
                      }
                      onClick={() => __handleChangePage(item)}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="dashboard-content-footer">
                  <span className="empty-table">No data</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
