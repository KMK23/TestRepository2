import React from "react";
import styles from "./NavCartItem.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

function NavCartItem({ product }) {
  console.log(product);

  return (
    <div className={styles.nav_cart_item}>
      <Link>
        <img src={product.image} />
      </Link>
      <div className={styles.nav_cart_description}>
        <h3>{product.category}</h3>
        <h2>{product.title}</h2>
        <span>{`${product.price} X ${
          product.quantity
        } = $${product.total.toFixed(2)}`}</span>
        {/* 소수점 두번째 자리까지 나오게 하는것 ex) 59.00 이렇게  */}
      </div>
      <button className={styles.nav_cart_delete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default NavCartItem;
