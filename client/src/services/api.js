import axios from 'axios';


const API_URL = 'http://localhost:3000/api';

const getToken = () => localStorage.getItem('token');


export const signup = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/signup`, {email, password});
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {email, password});
    return response.data;
};

export const getPasswords = async () => {
    const response = await axios.post(`${API_URL}/passwords`,
    { website, username, password},
    { headers: { Authorization: `Bearer ${getToken()}`}}
    );
    return response.data;
};

export const updatePassword = async (id, website, username, password) => {
    const response = await axios.put(`${API_URL}/passwords/${id}`,
    { website, username, password },
    { headers: { Authorization: `Bearer ${getToken()}`}}
    );
    return response.data;
};

export const deletePassword = async (id) => {
    const response = await axios.delete(`${API_URL}/passwords/${id}`,
    { headers: { Authorization: `Bearer ${getToken()}`}}
    );
    return response.data;
}