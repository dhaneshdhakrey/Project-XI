import React, { useEffect, useState } from "react";
import axios from "axios";
import BackendAPi from "../../../Utils/ConnectBackendAPis";
function MyOrders() {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    async function fetchMyOrders() {
        console.log(isLoggedIn)
        // let url = "http://172.16.112.40:8000/orders/";
        let url = BackendAPi("orders/");
        console.log(url);
        try {
            let response = await axios.get(url,  {
                headers: {
                    Authorization: `JWT ${isLoggedIn}`
                }
            });
            setOrders(response.data); // Store the orders in state
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError("Failed to load orders");
        }
    }

    useEffect(() => {
        fetchMyOrders();
    }, []);

    return (
        <div>
            <h2>My Orders</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>{JSON.stringify(order)}</li>
                ))}
            </ul>
        </div>
    );
}

export default MyOrders;
