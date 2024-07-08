import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getItems = () => axios.get(`${API_URL}/items`);
export const homepage = () => axios.get(`${API_URL}/home`);

export const getCart = () => axios.get(`${API_URL}/cart`);
export const addToCart = (item) => axios.post(`${API_URL}/cart`, item);
export const getToken = () => axios.get(`${API_URL}/telegram`); // Зміна на GET
export const getChatId = () => axios.get(`${API_URL}/telegram1`); // Зміна на GET
export const removeFromCart = (id) => axios.delete(`${API_URL}/cart/${id}`);

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const createOrder = (orderData) => axios.post(`${API_URL}/create-order`, orderData);
