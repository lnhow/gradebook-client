import { useState } from 'react';
import MediaAPI from '../../../../../../../../../helpers/api/media';
import LoadingMenuItem from '../../../../../../../../_common/loadingMenuItem';
import { handleAPICallError } from '../../../../../../../../../helpers/handleAPICall';
import DownloadHelper from '../../../../../../../../../helpers/download';

export default function DownloadTemplateGradeMenuItem() {
  const [isLoading, setIsLoading] = useState(false);
  const handle = () => {
    setIsLoading(true);
    MediaAPI.getTemplateGrade()
    .then((res) => {
      DownloadHelper.downloadFileExcel(res.data, 'template_grade.xlsx');
    })
    .catch(handleAPICallError('Không được lấy được mẫu'))
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <LoadingMenuItem
      loading={isLoading}
      text={'Mẫu nhập cột điểm'}
      onClick={handle}
    />
  )
}
