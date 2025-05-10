import React, { useState, useEffect } from "react";
import "./CollectionCont.css";
import Card1 from "./Card/Card1.js";
// import Loading from "../UI/Loading.js";
import ErrorCard from "../UI/Error.js";
import Banner from "./Banner.js";
import BackendAPi from "../../Utils/ConnectBackendAPis.js";
import axios from "axios";

let hardcodedProducts = [
  { id: Math.random().toString(), title: "Jeans", price: 700, image: "https://bluorng.com/cdn/shop/files/BACK.jpg?v=1735826679&width=823" },
  // Add more hardcoded products here...
];

function CollectionContainer() {
  const [prevAmount, setAmount] = useState(0);
  const [prevCollections, setCollections] = useState([]); // Initialized as empty array
  const [prevCollectionsInCart, setCollectionsInCart] = useState([]);
  const [prevError, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  async function fetchCollection() {
    try {
      setError(null);
      setCollections([]); // Reset collections before fetching new data
      setAmount(0);
      setIsLoading(true); // Set loading to true when starting fetch

      // Fetch API data
      // let response = await axios.get("http://172.16.112.40:8000/products");
      let response = await axios.get(BackendAPi("products/"));
      
      console.log(response.data.results);

      setCollections(response.data.results); // Update collections state with fetched data
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false); // Set loading to false after fetching is done
    }
  }

  useEffect(() => {
    fetchCollection();
  }, []);


  return (
    <div className="collection-container">
      {prevCollections.length > 0 ? (
        prevCollections.map((tempObj) => (
          <Card1
            key={tempObj.id}
            id={tempObj.slug}
            title={tempObj.name}
            price={tempObj.price}
            imgsrc={tempObj.images?.[0]?.image || "fallback.jpg"} // Added optional chaining
          />
        ))
      ) : (
        <p>No collections available</p> // Added fallback message
      )}

      {/* Banner after 4 products */}
      <div className="w-full">
        <Banner />
      </div>
      

      {prevError && <ErrorCard message={prevError} />} {/* Show error card if error occurs */}
    </div>
  );
}

export default CollectionContainer;
