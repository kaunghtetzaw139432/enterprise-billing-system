import Category from '../Category/Category'
import './DisplayCategory.css'
import React from 'react'

export default function DisplayCategory({ categories,selectCategory,setSelectCategory }) {
    return (
        <div className="row g-3" style={{ width: '100%', margin: 0 }}>
            {categories.map(category => {
                return (
                    <div key={category.categoryId} className="col-md-3 col-sm-6" style={{ padding: '0 10px' }}>
                        <Category
                            categoryName={category.name}
                            imgUrl={category.imgUrl}
                            numberOfItems={category.items}
                            color={category.bgColor}
                            isSelected={selectCategory===category.categoryId}
                            onClick={()=>setSelectCategory(category.categoryId)}
                        />
                    </div>
                )
            })}
        </div>
    )
}
