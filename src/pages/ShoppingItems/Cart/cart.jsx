import EmptyItem from "components/ShoppingItemsComponents/EmptyItem/emptyItem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewBreadcrumb,
  removeLastBreadcrumb,
} from "utilities/slices/breadcrumbSlice";
import GeneralOrder from "../common/GeneralOrder/generalOrder";
import CartItem from "./CartItem/cartItem";
import Coupon from "./Coupon/coupon";
import { useHistory } from "react-router-dom";
import { applyCoupon } from "utilities/slices/cartSlice";

function Cart() {
  //console.log("cart");
  const productsInCart = useSelector((state) => state.cart.products);
  const currentCoupon = useSelector((state) => state.cart.currentCoupon);
  
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: "Cart",
        slug: "/shopping-cart",
      })
    );

    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch]);

  const placeOrder = () => {
    history.push("/check-out");
  };

  const handleRemoveCoupon = () => {
    dispatch(applyCoupon(null));
  }

  const renderCartItems = (items) => {
    return items.length !== 0 ? (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th className="">Product</th>
              <th className="">Price</th>
              <th className="">Quantity</th>
              <th className="">In Stock</th>
              <th className="">Total</th>
              <th className="">Remove</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product) => {
              return <CartItem key={product.id} productInCart={product} />;
            })}
          </tbody>
        </table>
      </React.Fragment>
    ) : (
      <EmptyItem title="cart" />
    );
  };

  const renderCouponComponent = (productsInCart) => {
    return productsInCart.length !== 0 ? (
      <div className="table-wrapper">
        <Coupon />
      </div>
    ) : null;
  };

  const renderOrderComponent = (productsInCart) => {
    return productsInCart.length !== 0 ? (
      <div className="table-wrapper h-100">
        <div>
          <h4>Payment Details</h4>
        </div>
        <GeneralOrder />
        {currentCoupon && (
          <button className="btn-remove-coupon text-nowrap my-2" onClick={handleRemoveCoupon}>Remove coupon</button>
        )}
        <div className="btn-pay">
          <button className="text-nowrap p-2" onClick={placeOrder}>Place order</button>
        </div>
      </div>
    ) : null;
  };
  return (
    <React.Fragment>
      <div className="table-wrapper">
        <div className="table-content">{renderCartItems(productsInCart)}</div>
      </div>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-lg-6 pl-0">
            {renderCouponComponent(productsInCart)}
          </div>

          <div className="col-lg-6 pr-0">
            {renderOrderComponent(productsInCart)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

Cart.propTypes = {};

export default Cart;
