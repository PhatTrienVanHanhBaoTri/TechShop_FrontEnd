import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Col, Row } from "reactstrap";
import "./_nav.scss";
import { getCategories } from "utilities/slices/categorySlice";

function Nav(props) {
  const stateCategories = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  // get categories
  useEffect(() => {
    async function fetchCategories() {
      await dispatch(getCategories());
    }

    fetchCategories();
  }, [dispatch]);

  const renderCategoryModal = (categories) => {
    return categories.length !== 0
      ? categories.map((category, index) => (
          <Col key={index} xs="4" sm="4" md="4" lg="4">
            <NavLink
              to={`/products/${category.categorySlug}`}
              activeClassName="active"
              exact={category.categoryExact}
            >
              {category.categoryName}
            </NavLink>
          </Col>
        ))
      : "";
  };

  return (
    <ul className="pl-md-3 navbar-nav m-auto mb-lg-0 d-flex justify-item-center align-items-center">
      <li className="nav-item pt-md-3 m-3">
        <NavLink
          className="text-nowrap"
          activeClassName="active"
          to="/home"
          exact
        >
          Home
        </NavLink>
      </li>

      <li className="nav-item pt-md-3 m-3 dropdown-switcher">
        <NavLink
          className="text-nowrap"
          activeClassName="active"
          to="/products"
        >
          Products
        </NavLink>
        <div className="dropdown d-md-block d-none">
          <Row>{renderCategoryModal(stateCategories.data)}</Row>
        </div>
      </li>

      <li className="nav-item pt-md-3 m-3">
        <NavLink
          className="text-nowrap"
          activeClassName="active"
          to="/wish-list"
        >
          Wish List
        </NavLink>
      </li>

      <li className="nav-item pt-md-3 m-3">
        <NavLink
          className="text-nowrap"
          activeClassName="active"
          to="/contacts"
        >
          Contacts
        </NavLink>
      </li>

      {state.user.data.roleID === 1 && (
        <li className="nav-item pt-md-3 m-3">
          <NavLink
            className="text-nowrap"
            activeClassName="active"
            to="/ManageProducts"
          >
            Manage Products
          </NavLink>
        </li>
      )}
      <button onClick={() => console.log(state)}>console</button>
    </ul>
  );
}

export default Nav;
