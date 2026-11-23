import React, { useContext, useState } from 'react'
import './Explore.css'
import { AppContext } from '../../context/AppContext';
import DisplayCategory from '../../components/DisplayCategory/DisplayCategory';
import DisplayItems from '../../components/DisplayItems/DisplayItems';
import CustomerForm from '../../components/CustomerForm/CustomerForm';
import CartItems from '../../components/CartItems/CartItems';
import CartSummary from '../../components/CartSummary/CartSummary';

export default function Explore() {
  const { categories } = useContext(AppContext);
  const [selectCategory, setSelectCategory] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  return (
    <div className="explore-container text-light">
      <div className="left-column">
        <div className="first-row" style={{ overflow: 'auto' }}>
          <DisplayCategory
            selectCategory={selectCategory}
            setSelectCategory={setSelectCategory}
            categories={categories} />
        </div>
        <hr className='horizontal-line' />
        <div className="second-row" style={{ overflow: 'auto' }}>
          <DisplayItems selectedCategory={selectCategory} />
        </div>
      </div>
      <div className="right-column" >
        <div className="customer-form-container" style={{ height: '15%' }}>
          <CustomerForm
            customerName={customerName}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            setCustomerName={setCustomerName}
          />
        </div>
        <hr className="my-3 text-light" />
        <div className="cart-items-container" style={{ height: '55%', overflowY: 'auto' }}>
          <CartItems />
        </div>
        <div className="cart-summary-container" style={{ height: '30%' }}>
          
          <CartSummary 
             customerName={customerName}
             mobileNumber={mobileNumber}
             setCustomerName={setCustomerName}
             setMobileNumber={setMobileNumber}
          />
          
        </div>
      </div>
    </div>
  )
}