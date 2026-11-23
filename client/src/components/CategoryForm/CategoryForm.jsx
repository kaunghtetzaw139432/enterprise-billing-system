import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { addCategory } from '../../Service/CategoryService';


export default function CategoryForm() {
    const { setCategories } = useContext(AppContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("https://placehold.co/48x48?text=+");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!name.trim()) {
            toast.error("Category name is required!");
            return;
        }

        const categoryData = {
            name: name,
            description: description,
            bgColor: bgColor,
            image: image
        };

        try {
            const response = await addCategory(categoryData);

            setCategories(prevCategories => [...prevCategories, response]);

            toast.success("Category added successfully!");
            setName('');
            setDescription('');
            setBgColor('#ffffff');
            setImage(null);
            setPreviewUrl("https://placehold.co/48x48?text=+");
            
        } catch (error) {
            console.error("Error adding category:", error);
            toast.error("Failed to add category. Please try again.");
        }
    };

    return (
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-12 form-container">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label
                                    htmlFor="image"
                                    className='d-flex flex-column align-items-center justify-content-center w-100 rounded bg-light'
                                    style={{ border: '2px dashed #adb5bd', cursor: 'pointer', padding: '30px' }}
                                >
                                    <img src={previewUrl} alt="Upload Preview" width={80} className="mb-2" style={{ objectFit: 'cover', borderRadius: '8px' }}/>
                                    <span className="text-muted fw-semibold">
                                        {image ? image.name : "Click to upload image"}
                                    </span>
                                </label>
                                <input 
                                    type='file' 
                                    name='image' 
                                    id='image' 
                                    className='form-control' 
                                    hidden 
                                    accept="image/*" 
                                    onChange={handleImageChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="name" className='form-label'>Name</label>
                                <input 
                                    type='text' 
                                    name='name' 
                                    id='name' 
                                    className='form-control' 
                                    placeholder='Category Name' 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className='form-label'>Description</label>
                                <textarea 
                                    rows={5} 
                                    name='description' 
                                    id='description' 
                                    className='form-control' 
                                    placeholder='Write content here...'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="bgcolor" className='form-label'>Background color</label>
                                <div>
                                    <input 
                                        type="color" 
                                        name='bgcolor' 
                                        id='bgcolor' 
                                        className="form-control form-control-color" 
                                        title="Choose your color" 
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button type='submit' className='btn btn-primary w-100'>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}