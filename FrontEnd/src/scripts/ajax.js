import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/',
  // Diğer axios yapılandırma seçenekleri
});

// BASIC GET
const fetchData = async (endpoint, onSuccess, onError) => {
  try {
    const response = await apiClient.get(endpoint);
    onSuccess(response.data);
  } catch (error) {
    onError(error);
  }
};

// BASIC POST
const postData = async (endpoint, data, onSuccess, onError) => {
  try {
    const response = await apiClient.post(endpoint, data);
    onSuccess(response.data);
  } catch (error) {
    onError(error);
  }
};

// PROMISE GET
const fetchDataPromise = (endpoint) => {
  return new Promise((resolve, reject) => {
    apiClient.get(endpoint)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

export { fetchData, postData, fetchDataPromise };