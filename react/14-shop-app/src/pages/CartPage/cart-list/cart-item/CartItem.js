import React from "react";
import styles from "./CartItem.module.scss";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  degrementProduct,
  incrementProduct,
} from "../../../../store/cart/cartSlice";

function CartItem({ product }) {
  const dispatch = useDispatch();
  const incrementCount = () => {
    dispatch(incrementProduct(product.id));
  };
  const degrementCount = () => {
    dispatch(degrementProduct(product.id));
  };
  return (
    <div className={styles.cart_item}>
      <Link>
        <img src={product.image} />
      </Link>
      <div className={styles.cart_description}>
        <h3>{product.category}</h3>
        <h2>{product.title}</h2>
        <span>{`${product.price} X ${
          product.quantity
        } = $${product.total.toFixed(2)}`}</span>
        {/* 소수점 두번째 자리까지 나오게 하는것 ex) 59.00 이렇게  */}
      </div>
      <div className={styles.cart_count}>
        <div>
          <button onClick={degrementCount}>-</button>
          <span>{product.quantity}</span>
          <button onClick={incrementCount}>+</button>
        </div>
      </div>
      <button className={styles.cart_delete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default CartItem;
