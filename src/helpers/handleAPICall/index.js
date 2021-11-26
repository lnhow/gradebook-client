import { toast } from 'react-toastify';
import { isErrorResponse, getErrorMessage } from '../error';

export const handleAPICallSuccess = (
  successCallback = () => {}, 
  successMessage = 'Thành công', 
  errorMessage = 'Lỗi'
) => (res) => {
  if (!isErrorResponse(res)) {
    const data = res.data.data;
    successCallback(data);
    toast.success(successMessage);
  } else {  // There is an error
    const err = { response: res };
    handleAPICallError(errorMessage)(err);
  }
}

export const handleAPICallError = (
  errorMessage = 'Lỗi'
) => (err) => {
  toast.error(`${errorMessage} - ${getErrorMessage(err)}`);
}

const APICallHandler = {
  handleAPICallSuccess,
  handleAPICallError,
}

export default APICallHandler;
