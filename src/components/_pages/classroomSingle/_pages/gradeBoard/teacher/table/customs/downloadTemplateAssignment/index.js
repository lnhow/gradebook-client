import { useState } from 'react';
import LoadingMenuItem from '../../../../../../../../_common/loadingMenuItem';
import { handleAPICallError } from '../../../../../../../../../helpers/handleAPICall';
import DownloadHelper from '../../../../../../../../../helpers/download';

export default function DownloadAssignmentTemplateMenuItem({
  getTemplate = () => {},
  field = ''
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handle = () => {
    setIsLoading(true);
    getTemplate(field)
    .then((res) => {
      DownloadHelper.downloadFileExcel(res.data, `template_grade_${field}.xlsx`);
    })
    .catch(handleAPICallError('Không được lấy được mẫu'))
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <LoadingMenuItem
      loading={isLoading}
      text={'Mẫu import'}
      onClick={handle}
    />
  )
}
