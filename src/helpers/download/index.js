import { saveAs } from 'file-saver';

export const downloadFileExcel = (data, filename) => {
  downloadFile(
    data,
    'application/vnd.ms-excel;charset=utf-8',
    filename
  )
}

export const downloadFile = (data, type, filename) => {
  saveAs(data, filename, {
    type,
  });
}

const DownloadHelper = {
  downloadFile,
  downloadFileExcel,
}

export default DownloadHelper;