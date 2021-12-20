import { useState, useContext } from 'react';
import { CurrentClassContext } from '../../../../../../context/currentClassContext';

import LoadingMenuItem from '../../../../../../../../_common/loadingMenuItem';
import MediaAPI from '../../../../../../../../../helpers/api/media';
import DownloadHelper from '../../../../../../../../../helpers/download';
import { handleAPICallError } from '../../../../../../../../../helpers/handleAPICall';

export default function ExportMenuItem() {
  const { currentClass } = useContext(CurrentClassContext);
  const [isLoading, setIsLoading] = useState(false);
  const handleExport = () => {
    setIsLoading(true);

    const classId = currentClass.class_id;
    MediaAPI.getExportedGrades(classId)
    .then((res) => {
      const filename = `export_grade_class${classId}.xlsx`;
      DownloadHelper.downloadFileExcel(res.data, filename);
    })
    .catch(handleAPICallError('Không được lấy được mẫu'))
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <LoadingMenuItem
      loading={isLoading}
      text={'Export bảng điểm'}
      loadingText={'Đang export'}
      onClick={handleExport}
    />
  )
}
