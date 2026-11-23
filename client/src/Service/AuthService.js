import axios from 'axios'
import React from 'react'

export const login = async (data) => {
    return await axios.post("http://localhost:3000/api/v1.0/login", data);
}
