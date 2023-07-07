import "./_manageProduct.scss";
import {
  addNewBreadcrumb,
  removeLastBreadcrumb,
} from "utilities/slices/breadcrumbSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Breadcrumb from "components/common/Breadcrumb/breadcrumb";
import { Route } from "react-router-dom";
import "./Style/style.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { getAllProducts } from "utilities/slices/productSlice";
import ManageProductEdit from "./Edit/ManageProductEdit";
import ManageProductDetail from "./Detail/ManageProductDetail";
import handlePrice from "helpers/formatPrice";
import { Button, Modal, ModalHeader } from "react-bootstrap";
import ManageProductAdd from "./Add/ManageProductAdd";
import ProductApi from "api/productApi";

export default function ManageProduct({ authorized }) {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  let [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const allProducts = useSelector((state) => state.product.data);
  const [searchProducts, setSearchProducts] = useState([]);
  const [currentID, setCurrentID] = useState(-1);

  const [show, setShow] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  useEffect(() => {
    async function fetchProducts() {
      await dispatch(getAllProducts());
    }

    fetchProducts();
  }, [dispatch]);

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
    setPagination(calculateRange(allProducts, 5));
    setProducts(sliceData(allProducts, page, 5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts]);

  // Search
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (search !== "") {
      products = allProducts;
      let search_results = allProducts.filter(
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
      setPagination(calculateRange(search_results, 5));
      setProducts(sliceData(search_results, page, 5));
      setSearchProducts(search_results);
      __handleChangePage(search_results, 1);
    } else {
      products = allProducts;
      setSearchProducts([]);
      setPagination(calculateRange(allProducts, 5));
      setProducts(sliceData(allProducts, page, 5));
      __handleChangePage(allProducts, 1);
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
  const __handleChangePage = (data, new_page) => {
    setPage(new_page);
    setProducts(sliceData(data, new_page, 5));
  };

  const deleteProduct = async (id) => {
    return ProductApi.deleteProduct(id)
      .then((res) => {
        dispatch(getAllProducts());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!authorized) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="wrapper-dashboard product-area">
      <div className="child-banner product-banner">
        <div className="breadcrumb-nav container">
          <Breadcrumb />
        </div>
      </div>
      <div className="product-grid-view">
        <div className="container-fluid">
          <Route exact path="/ManageProducts">
            <div className="dashboard-content">
              <div className="dashboard-content-container">
                <div className="dashboard-content-header">
                  <h3 className="font-weight-bold">Products List</h3>
                  <div className="dashboard-content-search">
                    <input
                      type="text"
                      placeholder="Search.."
                      className="dashboard-content-input position-relative pr-5"
                      onChange={({ target }) => setSearch(target.value)}
                      value={search}
                      onKeyDown={handleEnterKey}
                      style={{ fontSize: "15px" }}
                    />
                    <BsSearch
                      type="button"
                      size={18}
                      className="icon-search"
                      style={{}}
                      onClick={handleSearch}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <Button
                    className="btn-add"
                    onClick={() => history.push("/ManageProducts/add")}
                    style={{ width: "auto" }}
                  >
                    <i className="fa fa-plus mr-2"></i>Add a product
                  </Button>
                </div>

                <table className="d-flex flex-column">
                  <thead>
                    <tr className="d-flex flex-row">
                      <th
                        style={{ flex: 1, display: "flex", fontSize: "15px" }}
                      >
                        ID
                      </th>
                      <th
                        style={{ flex: 9, display: "flex", fontSize: "15px" }}
                      >
                        NAME
                      </th>
                      <th
                        style={{ flex: 3, display: "flex", fontSize: "15px" }}
                      >
                        CATEGORY
                      </th>
                      <th
                        style={{ flex: 3, display: "flex", fontSize: "15px" }}
                      >
                        BRAND
                      </th>
                      <th
                        style={{ flex: 3, display: "flex", fontSize: "15px" }}
                      >
                        PRICE
                      </th>
                      <th
                        style={{ flex: 2, display: "flex", padding: "0" }}
                      ></th>
                      <th
                        style={{ flex: 2, display: "flex", padding: "0" }}
                      ></th>
                      <th
                        style={{ flex: 2, display: "flex", padding: "0" }}
                      ></th>
                    </tr>
                  </thead>

                  {products.length !== 0 ? (
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={index} className="d-flex flex-row">
                          <td
                            className="text-truncate"
                            style={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span style={{ fontSize: "15px" }}>
                              {product.productID}
                            </span>
                          </td>
                          <td
                            className="text-truncate"
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
                            <span style={{ fontSize: "15px" }}>
                              {product.productName}
                            </span>
                          </td>
                          <td
                            className="text-truncate"
                            style={{
                              flex: 3,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <span style={{ fontSize: "15px" }}>
                                {product.categoryName}
                              </span>
                            </div>
                          </td>
                          <td
                            className="text-truncate"
                            style={{
                              flex: 3,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <span style={{ fontSize: "15px" }}>
                                {product.brandName}
                              </span>
                            </div>
                          </td>
                          <td
                            className="text-truncate"
                            style={{
                              flex: 3,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span style={{ fontSize: "15px" }}>
                              {handlePrice(product.productPrice)}
                            </span>
                          </td>

                          <td
                            className="text-truncate"
                            style={{
                              flex: 2,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "0",
                              fontSize: "13px",
                            }}
                          >
                            <Link
                              to={`/ManageProducts/${product.productID}/detail`}
                            >
                              <span
                                style={{
                                  color: "#54b4e8",
                                  fontSize: "15px",
                                  fontWeight: "normal",
                                }}
                              >
                                Details
                              </span>
                            </Link>
                          </td>

                          <td
                            className="text-truncate"
                            style={{
                              flex: 2,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "0",
                              fontSize: "13px",
                            }}
                          >
                            <Link
                              to={`/ManageProducts/${product.productID}/edit`}
                            >
                              <span
                                style={{
                                  color: "#e8b754",
                                  fontSize: "15px",
                                  fontWeight: "normal",
                                }}
                              >
                                Edit
                              </span>
                            </Link>
                          </td>

                          <td
                            className="text-truncate"
                            style={{
                              flex: 2,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "0",
                              fontSize: "15px",
                            }}
                          >
                            <button
                              className="bg-white border-0 hover:undefined"
                              style={{
                                color: "#e85e54",
                                fontWeight: "normal",
                              }}
                              onClick={() => {
                                setCurrentID(product.productID);
                                setShow(true);
                              }}
                            >
                              Delete
                            </button>

                            <Modal
                              show={show}
                              onHide={() => setShow(false)}
                              style={{
                                height: "16rem",
                              }}
                            >
                              <ModalHeader
                                className="d-flex justify-content-start align-content-center h3 text-center m-0"
                                style={{ color: "#dd4242" }}
                              >
                                Question?
                              </ModalHeader>
                              <ModalHeader className="d-flex justify-content-center align-content-center h4 text-center m-0">
                                Are you sure you want to delete this product?
                              </ModalHeader>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={() => setShow(false)}
                                  className="px-4"
                                  style={{ color: "#E77733" }}
                                >
                                  No
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    deleteProduct(currentID);
                                    setShow(false);
                                  }}
                                  className="px-4"
                                >
                                  Sure
                                </Button>
                              </Modal.Footer>
                            </Modal>
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
                        onClick={() =>
                          search !== ""
                            ? __handleChangePage(searchProducts, item)
                            : __handleChangePage(allProducts, item)
                        }
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
          </Route>

          <Route path="/ManageProducts/:id/detail">
            <ManageProductDetail />
          </Route>

          <Route path="/ManageProducts/:id/edit">
            <ManageProductEdit />
          </Route>

          <Route exact path="/ManageProducts/add">
            <ManageProductAdd />
          </Route>
        </div>
      </div>
    </div>
  );
}
