import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  // const getFinalPrice = () => {
  //   return products.reduce((currentValue, nextValue) => {
  //     return currentValue + nextValue.count * nextValue.price;
  //   }, 0);
  // };

  const getFinalPrice = () => {
    let amount = 0;

    products &&
      products.map((p) => {
        amount = amount + p.price;
      });
    return amount;
  };

  const makePayment = () => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS ", status);
        cartEmpty();
      })
      .catch((error) => console.log(error));
  };

  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51JlB0bSCQJxHUankjdPctoGpQOsIL0p1tQ6jYTvNJnh2VUD7fUJYqwt8LxJNeUPBSgRNK3nzYHWibNNHTlrij858002aRvdBWg"
        amount={getFinalPrice() * 100}
        token={makePayment}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Sign In</button>
      </Link>
    );
  };

  return (
    <div className="col-6">
      <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
