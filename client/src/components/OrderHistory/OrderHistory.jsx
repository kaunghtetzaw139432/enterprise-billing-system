import React, { useState, useEffect } from 'react';
import "./OrderHistory.css";
import { fetchOrders } from '../../Service/OrderService';

export default function OrdersHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadOrders = async () => {
            try {
                setLoading(true);
                const response = await fetchOrders();


                const data = response.data ? response.data : response;

               
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setOrders(sortedData);
            } catch (err) {
                console.error("Fetch orders error:", err);
                setError("Failed to load order history.");
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return (
            <div className="orders-history-container d-flex justify-content-center align-items-center">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="orders-history-container p-4">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    return (
        <div className="orders-history-container">
            <h2 className="text-light mb-4">Orders History</h2>

            {orders.length === 0 ? (
                <div className="alert alert-info text-center">No orders have been placed yet.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-dark table-striped table-hover mt-3">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Order ID</th>
                                <th scope="col">Date</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Payment</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.orderId || index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{order.orderId}</td>
                                    <td>{formatDate(order.createdAt)}</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.phoneNumber}</td>
                                    <td>
                                        <span className={`badge ${order.paymentMethod === 'UPI' ? 'bg-primary' : 'bg-secondary'}`}>
                                            {order.paymentMethod}
                                        </span>
                                    </td>
                                    <td>{order.grandTotal?.toLocaleString()} MMK</td>
                                    <td>                                     
                                        <span className="badge bg-success py-2 px-3">
                                            COMPLETED
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}