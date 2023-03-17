/**
 * IMPORTANT For consume to api is necessary install "npm install axios"
 */

// Base URL: https://api.themoviedb.org/3/ 
// Resources: movie/now_playing
// Param API key: ?api_key=9e410252d84569eef779475a902d9330

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;