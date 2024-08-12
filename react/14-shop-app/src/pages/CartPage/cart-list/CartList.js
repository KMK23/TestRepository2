import React from "react";
import styles from "./CartList.module.scss";
import { useSelector } from "react-redux";
import CartItem from "./cart-item/CartItem";

function CartList(props) {
  const { products } = useSelector((state) => state.cartSlice);
  return (
    <div>
      <div className={styles.cart_list}>
        {products.map((product, idx) => {
          return <CartItem product={product} key={idx} />;
        })}
      </div>
    </div>
  );
}

export default CartList;