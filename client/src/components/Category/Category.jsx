import './Category.css'
import React from 'react'

export default function Category({ categoryName, imgUrl, numberOfItems, color,isSelected,onClick }) {
    return (
        <div className="d-flex align-items-center p-3 rounded gap-1 position-relative category-hover"
            style={{ backgroundColor: color, cursor: 'pointer' }}
            onClick={onClick}
        >
            <div style={{ position: 'relative', marginRight: '15px' }}>
                <img src={`http://localhost:3000/api/v1.0${imgUrl}`} alt={categoryName} className="category-image" />
            </div>
            <div>
                <h6 className='text-white mb-0'>
                    {categoryName}
                </h6>
                <p className='text-white mb-0'>
                    {numberOfItems} Items
                </p>
            </div>
            {isSelected&& <div className='active-category'></div>}
        </div>
    )
}
