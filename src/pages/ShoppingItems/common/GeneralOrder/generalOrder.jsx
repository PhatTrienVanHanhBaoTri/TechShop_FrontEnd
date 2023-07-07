/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
import PaymentDetail from "components/ShoppingItemsComponents/PaymentDetail/paymentDetail";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./_generalOrder.scss";
import handlePrice from "helpers/formatPrice";

function GeneralOrder() {
  const productsInCart = useSelector((state) => state.cart.products);
  const currentCoupon = useSelector((state) => state.cart.currentCoupon);
  const [currCoupon, setCurrCoupon] = useState("");


  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (productsInCart.length !== 0) {
      let price = productsInCart.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.quantity,
        0
      );
      //console.log(price)

      if (currentCoupon) {
        if (currentCoupon.couponType === "PERCENT") {
          let i = price * currentCoupon.value / 100;

          price -= i;
        } else if (currentCoupon.couponType === "MONEY") {
          price -= currentCoupon.value 
        }
      }

      setTotalPrice(price);
    }
  }, [productsInCart, currentCoupon]);

  useEffect(() => {
    if (currentCoupon) {
      if (currentCoupon.couponType === "PERCENT") {
        setCurrCoupon(`-${currentCoupon.value}` + "%");
      } else if (currentCoupon.couponType === "MONEY") {
        setCurrCoupon("-" + handlePrice(currentCoupon.value));
      }
    }
  }, [currentCoupon]);

  

  const renderPaymentDetails = (productsInCart) => {
    return productsInCart.map((product, index) => {
      return <PaymentDetail key={product.id} product={product} />;
    });
  };
  return (
    <table className="table-payment">
      <tbody>
        {renderPaymentDetails(productsInCart)}
        {currentCoupon && (
          <tr className="payment-detail">
            <td>Coupon Discount</td>
            <td className="discount">{currCoupon} {currentCoupon.couponType === "MONEY" ? <u>đ</u> : ""}</td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr className="payment-detail">
          <td>Order Total</td>
          <td className="price">{handlePrice(totalPrice)} <u>đ</u></td>
        </tr>
      </tfoot>
    </table>
  );
}

export default GeneralOrder;
