import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardItem.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../store/cart/cartSlice";

function CardItem({ item }) {
  const { title, image, price } = item;
  const { products } = useSelector((state) => state.cartSlice);
  const productMatching = products.some((product) => product.id === item.id);
  // find, findIndex 같은 역할을 하는거야. 그래서 return 값으로 나온 조건이 같으면 true 냐 false 냐 두개로 나와
  console.log(productMatching);

  const dispatch = useDispatch();
  const addItemToCart = () => {
    dispatch(addToCart(item));
    // 여기있는 item이 그 목록들 .. 실제 아이템들..
  };

  return (
    <li className={styles.card_item}>
      <Link to={`/product/${item.id}`}>
        <img src={image} />
      </Link>
      <h5>{`${title.slice(0, 15)}...`}</h5>
      <div>
        <button disabled={productMatching} onClick={addItemToCart}>
          {productMatching ? "장바구니에 담긴 제품" : "장바구니에 담기"}
        </button>
        <p>$ {price}</p>
      </div>
    </li>
  );
}

export default CardItem;
