import axios from 'axios'
import { API_NOTIFICATION_MESSEAGES, SERVICE_URLS } from '../constants/config.js';

const API_URl = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URl,
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    }
})

axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)
axiosInstance.interceptors.response.use(
    function(response){
        return processResponse(response);
    },
    function(error){
        return Promise.reject(processError(error));
    }
)


const processResponse = (response) => {
    if (response?.status===200) {
        return {isSucess:true, data: response.data}
    }
    else{
        return{
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }

    }
}

const processError = (error) => {
    if (error.response) {
      console.log("error in response:", error.response);
      return {
        isError: true,
        msg: API_NOTIFICATION_MESSEAGES.responseFailure,
        code: error.response.status,
        responseData: error.response.data,  // Added response data
      };
    } else if (error.request) {
      console.log("error in request:", error.request);
      return {
        isError: true,
        msg: API_NOTIFICATION_MESSEAGES.requestFailure,
        code: "",
      };
    } else {
      console.log("Network error:", error.message);  // Error message instead of toJSON
      return {
        isError: true,
        msg: API_NOTIFICATION_MESSEAGES.networkError,
        code: "",
      };
    }
};


const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = async (body, showUploadProgress, showDownloadProgress) => {
    try {
      // Log the request details for debugging
      console.log('Making request to:', value.url, 'with method:', value.method, 'and body:', body);

      const response = await axiosInstance({
        method: value.method,
        url: value.url,
        data: body,
        responseType: value.responseType,
        onUploadProgress: function (progressEvent) {
          if (showUploadProgress) {
            const percentageCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            showUploadProgress(percentageCompleted);
          }
        },
        onDownloadProgress: function (progressEvent) {
          if (showDownloadProgress) {
            const percentageCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            showDownloadProgress(percentageCompleted);
          }
        },
      });

      // Log the response for debugging
      console.log('Response received:', response);

      if (response.status !== 200) {
        console.warn('Response status not 200:', response);
      }
      return response;
    } catch (error) {
      // Log the error for debugging
      console.error('Error occurred during the request:', error.response ? error.response : error.message);

      // Return the error to the caller
      return error;
    }
  };
}

export { API };
