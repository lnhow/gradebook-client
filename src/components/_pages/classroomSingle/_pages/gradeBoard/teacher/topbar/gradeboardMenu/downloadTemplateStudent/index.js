import { useState } from 'react';
import MediaAPI from '../../../../../../../../../helpers/api/media';
import LoadingMenuItem from '../../../../../../../../_common/loadingMenuItem';
import { handleAPICallError } from '../../../../../../../../../helpers/handleAPICall';
import DownloadHelper from '../../../../../../../../../helpers/download';

export default function DownloadTemplateStudentMenuItem() {
  const [isLoading, setIsLoading] = useState(false);
  const handle = () => {
    setIsLoading(true);
    MediaAPI.getTemplateStudent()
    .then((res) => {
      DownloadHelper.downloadFileExcel(res.data, 'template_student.xlsx');
    })
    .catch(handleAPICallError('Không được lấy được mẫu'))
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <LoadingMenuItem
      loading={isLoading}
      text={'Mẫu danh sách lớp'}
      onClick={handle}
    />
  )
}
