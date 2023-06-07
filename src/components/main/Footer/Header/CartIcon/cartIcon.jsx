import React from "react";
import { NavLink } from "react-router-dom";
import "./_cartIcon.scss";
import { useSelector } from "react-redux";

function CartIcon() {
  const itemQuantity = useSelector((state) => state.cart.products.length);
  const renderCartQuantity = (quantity) => {
    return itemQuantity === 0 ? (
      ""
    ) : (
      <span className="cart-items-count">{itemQuantity}</span>
    );
  };
  return (
    <NavLink
      activeClassName="active"
      to="/shopping-cart"
      className="cart-items">
        <i className="d-md-block d-none fas fa-shopping-cart">{renderCartQuantity(itemQuantity)}</i>
        <p className="text-center m-0 d-block d-md-none">{renderCartQuantity(itemQuantity)}Shopping Cart</p>
    </NavLink>
  );
}

export default CartIcon;
