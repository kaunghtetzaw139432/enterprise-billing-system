import React, { useContext, useState } from 'react';
import { addItems } from '../../Service/ItemService';
import { AppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

export default function ItemForm() {
    const { setCategories, categories, itemData, setItemData } = useContext(AppContext)
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        categoryId: "", 
        price: "",
        description: ""
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            if (image) formData.append("image", image);
            formData.append("item", JSON.stringify(data));

            const response = await addItems(formData);
            if (response.status === 200 || response.status === 201) {
                setItemData([...itemData, response.data])
                setCategories(prevCategories =>
                    prevCategories.map(category =>
                        category.categoryId === data.categoryId
                            ? { ...category, items: category.items + 1 }
                            : category
                    )
                );
            }

            toast.success("Item Added Successfully");

            setData({ name: "", categoryId: "", price: "", description: "" });
            setImage(null);
            setPreviewUrl(null);

        } catch (error) {
            console.error("Error adding item:", error);
            toast.error("Failed to add item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='item-form-container' style={{ height: '100%', overflow: 'auto', overflowX: 'hidden', overflowY: 'auto' }}>
            <div className="mx-2 mt-2">
                <div className="row">
                    <div className="card col-md-12 form-container">
                        <div className="card-body">
                            <form onSubmit={onSubmitHandler}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="image"
                                        className='d-flex flex-column align-items-center justify-content-center w-100 rounded bg-light'
                                        style={{ border: '2px dashed #adb5bd', cursor: 'pointer', padding: '30px' }}
                                    >
                                        <img
                                            src={previewUrl ? previewUrl : "https://placehold.co/48x48?text=+"}
                                            alt="Upload"
                                            width={previewUrl ? '100%' : 80}
                                            style={{ maxHeight: '200px', objectFit: 'contain' }}
                                            className="mb-2"
                                        />
                                        <span className="text-muted fw-semibold">Click to upload image</span>
                                    </label>
                                    <input type='file' name='image' id='image' className='form-control' hidden onChange={handleImageChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="name" className='form-label'>Name</label>
                                    <input type='text' name='name' id='name' className='form-control' placeholder='Item Name' onChange={onChangeHandler} value={data.name} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select name="categoryId" id="category" className="form-control" onChange={onChangeHandler} value={data.categoryId} required>
                                        <option value="">---SELECT CATEGORY---</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category.categoryId}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className='form-label'>Price</label>
                                    <input type="number" name="price" id="price" className='form-control' placeholder='200.00' onChange={onChangeHandler} value={data.price} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className='form-label'>Description</label>
                                    <textarea rows={5} name='description' id='description' className='form-control' placeholder='Write content here...' onChange={onChangeHandler} value={data.description}></textarea>
                                </div>
                                <button type='submit' className='btn btn-warning w-100' disabled={loading}>{loading ? "Saving..." : "Save"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}