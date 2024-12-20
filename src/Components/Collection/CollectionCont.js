import React, { useState } from "react";
import "./CollectionCont.css";
import Card1 from "./Card/Card1.js";
let Collections = [
  { id: Math.random().toString(), title: "Jeans", price: 700 },
  { id: Math.random().toString(), title: "Tshirt", price: 500 },
  { id: Math.random().toString(), title: "Pajama", price: 300 },
  { id: Math.random().toString(), title: "Cargo", price: 1000 },
];
let imageurl =
  "https://almostgods.com/wp-content/uploads/2024/12/Artboard-3-2.webp";
function CollectionContainer() {
  function CartHandler(event) {
    setAmount(prevAmount + event.price);
    console.log(prevAmount);
    let tempArr=[...prevCollectionsInCart,{
      id:event.id,
      price:event.price,
      imgsrc:event.imgsrc
    }]
    setCollectionsInCart(tempArr);
    console.log(prevCollectionsInCart);
  }
  const [prevAmount, setAmount] = useState(0);
  let [prevCollectionsInCart, setCollectionsInCart] = useState([{}]);

  return (
    <div className="collection-container">
      {Collections.map((tempObj) => (
        <Card1
          id={tempObj.id}
          title={tempObj.title}
          price={tempObj.price}
          imgsrc={imageurl}
          changeCart={CartHandler}
        />
      ))}
    </div>
  );
}

export default CollectionContainer;
