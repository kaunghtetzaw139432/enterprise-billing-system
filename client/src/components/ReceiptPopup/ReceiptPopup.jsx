import React from 'react';
import './ReceiptPopup.css';

export default function ReceiptPopup({ receiptData, onClose }) {
  if (!receiptData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="receipt-modal-overlay">

      <div className="receipt-container">


        <div className="receipt-paper" id="printable-receipt">
          <h3 className="text-center fw-bold mb-1">MY SHOP</h3>
          <p className="text-center mb-2" style={{ fontSize: '14px' }}>
            123 Main Street, Mandalay<br />
            Tel: 09-123456789
          </p>

          <div className="dashed-line"></div>

          <div className="receipt-info my-2">
            <div><span>Order ID:</span> <span>{receiptData.orderId}</span></div>
            <div><span>Date:</span> <span>{new Date().toLocaleDateString()}</span></div>
            <div><span>Customer:</span> <span>{receiptData.customerName}</span></div>
            <div><span>Payment:</span> <span>{receiptData.paymentMethod}</span></div>
          </div>

          <div className="dashed-line"></div>

          <table className="receipt-table w-100 my-2">
            <thead>
              <tr>
                <th className="text-start">Item</th>
                <th className="text-center">Qty</th>
                <th className="text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              {receiptData.items?.map((item, idx) => (
                <tr key={idx}>
                  <td className="text-start">{item.name}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-end">{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="dashed-line"></div>

          <div className="receipt-totals mt-2">
            <div className="d-flex justify-content-between" style={{ fontSize: '15px' }}>
              <span>Subtotal:</span>
              <span>{receiptData.subtotal?.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between" style={{ fontSize: '15px' }}>
              <span>Tax (1%):</span>
              <span>{receiptData.tax?.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold mt-3" style={{ fontSize: '18px' }}>
              <span>Grand Total:</span>
              <span>{receiptData.grandTotal?.toFixed(2)}</span>
            </div>
          </div>

          <div className="dashed-line mt-3"></div>
          <p className="text-center mt-3 fw-bold mb-0" style={{ fontSize: '16px' }}>THANK YOU!</p>
        </div>



        <div className="d-flex gap-3 mt-4 w-100 no-print">
          <button className="btn btn-secondary flex-grow-1" onClick={onClose} style={{ fontSize: '16px', padding: '10px' }}>Close</button>
          <button className="btn btn-success flex-grow-1" onClick={handlePrint} style={{ fontSize: '16px', padding: '10px' }}>Print</button>
        </div>

      </div>
    </div>
  );
}