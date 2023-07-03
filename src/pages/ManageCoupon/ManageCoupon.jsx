import "./_manageCoupon.scss";
import {
  addNewBreadcrumb,
  removeLastBreadcrumb,
} from "utilities/slices/breadcrumbSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Breadcrumb from "components/common/Breadcrumb/breadcrumb";
import { Route } from "react-router-dom";
import "../ManageProduct/Style/style.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { getAllCoupons } from "utilities/slices/productSlice";
import ManageCouponEdit from "./Edit/ManageCouponEdit";
import handlePrice from "helpers/formatPrice";
import { Button, Modal, ModalHeader } from "react-bootstrap";
import ManageCouponAdd from "./Add/ManageCouponAdd";
import CouponApi from "api/couponApi";

export default function ManageCoupon({ authorized }) {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  let [coupons, setCoupons] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const allCoupons = useSelector((state) => state.product.couponsList);
  const [searchCoupons, setSearchCoupons] = useState([]);
  const [currentID, setCurrentID] = useState(-1);

  const [show, setShow] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setCoupons(allCoupons);
  }, [allCoupons]);

  useEffect(() => {
    async function fetchCoupons() {
      await dispatch(getAllCoupons());
    }

    fetchCoupons();
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: "Manage Coupons",
        slug: "/ManageCoupons",
      })
    );
    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch]);

  useEffect(() => {
    setPagination(calculateRange(allCoupons, 5));
    setCoupons(sliceData(allCoupons, page, 5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCoupons]);

  // Search
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (search !== "") {
      coupons = allCoupons;
      let search_results = allCoupons.filter(
        (item) =>
          item.couponCode
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase())
      );
      setPagination(calculateRange(search_results, 5));
      setCoupons(sliceData(search_results, page, 5));
      setSearchCoupons(search_results);
      __handleChangePage(search_results, 1);
    } else {
      coupons = allCoupons;
      setSearchCoupons([]);
      setPagination(calculateRange(allCoupons, 5));
      setCoupons(sliceData(allCoupons, page, 5));
      __handleChangePage(allCoupons, 1);
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
    setCoupons(sliceData(data, new_page, 5));
  };

  const deleteCoupon = async (id) => {
    return CouponApi.deleteCoupon(id)
      .then((res) => {
        dispatch(getAllCoupons());
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
          <Route exact path="/ManageCoupons">
            <div className="dashboard-content">
              <div className="dashboard-content-container">
                <div className="dashboard-content-header">
                  <h3 className="font-weight-bold">Coupons List</h3>
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
                    onClick={() => history.push("/ManageCoupons/add")}
                    style={{ width: "auto" }}
                  >
                    <i className="fa fa-plus mr-2"></i>Add a coupon
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
                        style={{ flex: 3, display: "flex", fontSize: "15px" }}
                      >
                        COUPON CODE
                      </th>
                      <th
                        style={{ flex: 3, display: "flex", fontSize: "15px" }}
                      >
                        VALUE
                      </th>
                      <th
                        style={{ flex: 3, display: "flex", fontSize: "15px" }}
                      >
                        EXPIRY
                      </th>
                      <th
                        style={{ flex: 2, display: "flex", padding: "0" }}
                      ></th>
                      <th
                        style={{ flex: 2, display: "flex", padding: "0" }}
                      ></th>
                    </tr>
                  </thead>

                  {coupons.length !== 0 ? (
                    <tbody>
                      {coupons.map((coupon, index) => (
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
                              {coupon.id}
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
                                {coupon.couponCode}
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
                                {(coupon.couponType === "PERCENT") ? "-" + coupon.value + "%" : "-" + handlePrice(coupon.value) + "đ"}
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
                                {new Date(coupon.expiry).toLocaleDateString()}
                              </span>
                            </div>
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
                              to={`/ManageCoupons/${coupon.id}/edit`}
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
                                setCurrentID(coupon.id);
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
                                Are you sure you want to delete this coupon?
                              </ModalHeader>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={() => setShow(false)}
                                  className="px-4"
                                >
                                  No
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    deleteCoupon(currentID);
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

                {coupons.length !== 0 ? (
                  <div className="dashboard-content-footer">
                    {pagination.map((item, index) => (
                      <span
                        key={index}
                        className={
                          item === page ? "active-pagination" : "pagination"
                        }
                        onClick={() =>
                          search !== ""
                            ? __handleChangePage(searchCoupons, item)
                            : __handleChangePage(allCoupons, item)
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

          <Route path="/ManageCoupons/:id/edit">
            <ManageCouponEdit />
          </Route>

          <Route exact path="/ManageCoupons/add">
            <ManageCouponAdd />
          </Route>
        </div>
      </div>
    </div>
  );
}
