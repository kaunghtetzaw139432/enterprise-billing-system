import { createContext, useEffect, useState } from "react";
import { getAllCategories } from "../Service/CategoryService";
import { fetchItems } from "../Service/ItemService";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
    const [categories, setCategories] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [auth, setAuth] = useState({ token: null, role: null });
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem => cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }])
        }
    }
    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.itemId !== itemId));
    }
    const updateQuantity = (itemId, newQuantity) => {
        setCartItems(cartItems.map(item => item.itemId === itemId ? { ...item, quantity: newQuantity } : item))
    }

    async function loadData() {
        try {
            const response = await getAllCategories();
            const itemResponse = await fetchItems();
            setCategories(response.data ? response.data : response);
            setItemData(itemResponse.data);
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);
    const setAuthData = (token, role) => {
        setAuth({ token, role });
    }
    const clearCart = () => {
        setCartItems([]);
    };

    const contextValue = {
        categories,
        setCategories,
        auth,
        setAuthData,
        itemData,
        setItemData,
        addToCart,
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart

    };
    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};