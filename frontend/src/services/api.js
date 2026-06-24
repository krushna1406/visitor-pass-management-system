import axios from "axios";

const API = axios.create({baseURL: import.meta.env.BASE_URL})

API.interceptors.request.use((config) => {
   const user = JSON.parse(localStorage.getItem('user'));

   if(user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
   }
   return config;
})
//Due to this, there is no need to pass headers as parameter to every function

export const createVisitor = async (data) => {
   const response = await API.post('/api/visitors', data);
   return response.data;
}

export const getAllVisitor = async () => {
   const response = await API.get('/api/visitors');
   return response.data;
}

export const getVisitor = async (id) => {
   const response = await API.get(`/api/visitors/${id}`);
   return response.data;
}

export const updateVisitor = async (id, data) => {
   const response = await API.put(`/api/visitors/${id}`, data);
   return response.data;
}

export const deleteVisitor = async (id) => {
   const response = await API.delete(`/api/visitors/${id}`);
   return response.data;
}

export const updateVisitStatus = async (id, status) => {
   const response = await API.patch(`/api/visitors/${id}/status`, status);
   return response.data;
}

export const checkInVisitor = async (id) => {
   const response = await API.patch(`/api/visitors/${id}/checkin`);
   return response.data;
}

export const checkOutVisitor = async (id) => {
   const response = await API.patch(`/api/visitors/${id}/checkout`);
   return response.data;
}

// Login 
export const loginUser = async (loginData) => {
   const response = await API.post('/api/auth/login', loginData);
   return response.data;
}

export default API;