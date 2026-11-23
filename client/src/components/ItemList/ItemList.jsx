import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { deleteItem } from '../../Service/ItemService';
import './ItemList.css'
import toast from 'react-hot-toast';

export default function ItemList() {
  const { itemData, setItemData ,setCategories} = useContext(AppContext);
  const [searchItem, setSearchItem] = useState("");

  
  const filterItems = itemData.filter((item) => {
    return item.name.toLowerCase().includes(searchItem.toLowerCase());
  });

 const removeItem = async (itemId) => {
    try {
        const response = await deleteItem(itemId);

        if (response.status === 204 || response.status === 200) {
            const deletedItem = itemData.find(
                item => item.itemId === itemId
            );

            // Item list update
            setItemData(prevItems =>
                prevItems.filter(item => item.itemId !== itemId)
            );
            setCategories(prevCategories =>
                prevCategories.map(category =>
                    category.categoryId === deletedItem.categoryId
                        ? {
                            ...category,
                            items: Math.max(0, category.items - 1)
                        }
                        : category
                )
            );

            toast.success("Item deleted successfully");
        }
    } catch (e) {
        console.error(e);
        toast.error("Unable to delete item");
    }
};

  return (
    <div className="category-list-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
      <div className="row pe-2" >
        <div className="input-group mb-3">
          <input type="text"
            name="keyword"
            id="keyword"
            placeholder='Search by keyword'
            className='form-control'
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filterItems.map((item, index) => (
          <div className="col-12" key={index}>
            <div className="card p-3 bg-dark">
              <div className="d-flex align-items-center">
                <div style={{marginRight:'16px'}}>
                  <img src={`http://localhost:3000/api/v1.0${item.imgUrl}`} alt={item.name} className='item-image'/>
                </div>
                <div className="flex-grow-1 me-4">
                  <h6 className='mb-1 text-white'>{item.name}</h6>
                  <p className="mb-0 text-white">
                    Category: {item.categoryName}
                  </p>
                  <span className='mb-0 text-block badge rounded-pill text-bg-warning'>
                    &#8377;{item.price}
                  </span>
                </div>
                <div>
                  <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.itemId)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}