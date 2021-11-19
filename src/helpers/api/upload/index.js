import api from '..'
const baseURL = '/upload';
export const uploadImg = async (img) => {
    return api.post(`${baseURL}/image`, img,{
      headers: {
        "Content-Type": "multipart/form-data",
      }})
  }