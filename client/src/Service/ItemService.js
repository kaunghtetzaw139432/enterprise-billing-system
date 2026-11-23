import axios from "axios";

export const addItems = async (items) => {
    return await axios.post("http://localhost:3000/api/v1.0/admin/items", items, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
}
export const deleteItem = async (itemId) => {
    return await axios.delete(`http://localhost:3000/api/v1.0/admin/items/${itemId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
}
export const fetchItems = async () => {
    return await axios.get("http://localhost:3000/api/v1.0/admin/items", { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
}