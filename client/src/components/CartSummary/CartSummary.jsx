import { useContext, useState } from 'react';
import './CartSummary.css';

import { AppContext } from '../../context/AppContext';
import { createOrder } from '../../Service/OrderService';
import { verifyPayment } from '../../Service/PaymentService';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import ReceiptPopup from '../ReceiptPopup/ReceiptPopup';

const stripePromise = loadStripe(
    "pk_test_51UazHFKo6w27av2dit1CpZ2VwGM0jAQedzlNzTUqAqGPCT4eXBUy1Qdf1rgAxMV9Vuld1lcR6I2SDh0nseCwVdVw00XiOgsOp4"
);


const StripePaymentForm = ({ order, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!stripe || !elements || loading) return;

        setLoading(true);
        setError('');

        try {
            const result = await stripe.confirmPayment({
                elements,
                redirect: 'if_required' 
            });

            if (result.error) {
                setError(result.error.message);
                return;
            }

            const paymentIntent = result.paymentIntent;

            if (paymentIntent?.status === 'succeeded') {
                await verifyPayment({
                    paymentIntentId: paymentIntent.id,
                    orderId: order.orderId
                });
                onSuccess(); 
            } else {
                setError('Payment is not completed yet. Please try again.');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Payment verification failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-3">
            <PaymentElement />
            
            {error && (
                <div className="alert alert-danger mt-3" style={{ fontSize: '14px' }}>
                    {error}
                </div>
            )}
            
            <button
                type="submit"
                className="btn btn-primary w-100 mt-4 py-2"
                style={{ borderRadius: '8px', fontWeight: 'bold' }}
                disabled={!stripe || !elements || loading}
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};


const CartSummary = ({
    customerName,
    setCustomerName,
    mobileNumber,
    setMobileNumber
}) => {
    const { cartItems, clearCart } = useContext(AppContext);
    
    const [loading, setLoading] = useState(false);
    const [paymentOrder, setPaymentOrder] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    
    const [receiptData, setReceiptData] = useState(null);

    const totalAmount = cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity), 0
    );
    const tax = totalAmount * 0.01;
    const grandTotal = totalAmount + tax;

    const validateOrder = () => {
        if (!customerName?.trim() || !mobileNumber?.trim()) {
            setError('Please enter customer name and mobile number.');
            return false;
        }
        if (cartItems.length === 0) {
            setError('Your cart is empty.');
            return false;
        }
        setError('');
        return true;
    };

    const getOrderData = (paymentMethod) => {
        return {
            customerName: customerName.trim(),
            phoneNumber: mobileNumber.trim(),
            cartItems: cartItems.map(item => ({
                itemId: item.itemId,
                name: item.name,
                price: Number(item.price),
                quantity: Number(item.quantity)
            })),
            subtotal: totalAmount,
            tax: tax,
            grandTotal: grandTotal,
            paymentMethod: paymentMethod 
        };
    };

  
    const handleCashPayment = async () => {
        if (loading || !validateOrder()) return;
        try {
            setLoading(true);
            setMessage('');
            setError('');
            
            const response = await createOrder(getOrderData('CASH'));
            const order = response.data ? response.data : response;
            
            // ၁။ အောင်မြင်ပါက ပြေစာ State သို့ Data ထည့်ပေးလိုက်ပါ
            setReceiptData(order);
            
            clearCart();
            setMessage('Cash order completed successfully!');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Cash order failed.');
        } finally {
            setLoading(false);
        }
    };

    // --- UPI Payment ခလုတ်နှိပ်ခြင်း (Form ပြရန်) ---
    const handleStripePayment = async () => {
        if (loading || !validateOrder()) return;
        try {
            setLoading(true);
            setMessage('');
            setError('');

            const response = await createOrder(getOrderData('UPI'));
            const order = response.data ? response.data : response; 

            if (!order || !order.receipt || !order.orderId) {
                throw new Error('Invalid response from server.');
            }
            setPaymentOrder(order); 

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Unable to create payment.');
        } finally {
            setLoading(false);
        }
    };

  
    const handlePaymentSuccess = () => {
      
        setReceiptData(paymentOrder);
        
        clearCart();
        setPaymentOrder(null); 
        setMessage('Payment completed successfully!');
        setError('');
    };

    const handleCancelPayment = () => {
        setPaymentOrder(null);
        setError('');
    };

    // --- ပြေစာကို ပိတ်လိုက်သည့်အခါ Form ကို Reset လုပ်ရန် ---
    const closeReceipt = () => {
        setReceiptData(null);
        setCustomerName('');
        setMobileNumber('');
        setMessage('');
    };

    return (
        <div className="mt-2 position-relative">
            <div className="cart-summary-details">
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light">Item :</span>
                    <span className="text-light">{totalAmount.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light">Tax (1%):</span>
                    <span className="text-light">{tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                    <span className="text-light">Total:</span>
                    <span className="text-light">{grandTotal.toFixed(2)}</span>
                </div>
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-flex gap-3">
                <button type="button" className="btn btn-success flex-grow-1" onClick={handleCashPayment} disabled={loading}>
                    {loading ? 'Processing...' : 'Cash'}
                </button>
                <button type="button" className="btn btn-primary flex-grow-1" onClick={handleStripePayment} disabled={loading}>
                    {loading ? 'Loading...' : 'UPI'}
                </button>
            </div>

          
            {paymentOrder && (
                <div className="stripe-modal-overlay">
                    <div className="stripe-modal-content">
                        <button className="close-modal-btn" onClick={handleCancelPayment}>
                            &times;
                        </button>
                        
                        <h4 className="text-dark text-center mb-2" style={{ fontWeight: 'bold' }}>
                            Secure Payment
                        </h4>
                        <p className="text-muted text-center mb-4">
                            Amount: <strong>{grandTotal.toFixed(2)} MMK</strong>
                        </p>

                        <Elements stripe={stripePromise} options={{ clientSecret: paymentOrder.receipt }}>
                            <StripePaymentForm order={paymentOrder} onSuccess={handlePaymentSuccess} />
                        </Elements>
                    </div>
                </div>
            )}

            {receiptData && (
                <ReceiptPopup
                ReceiptPopup 
                    receiptData={receiptData} 
                    onClose={closeReceipt} 
                />
                
            )}
        </div>
    );
};

export default CartSummary;