import { useState, useContext } from 'react';
import {
  Input,
  Button,
  Box,
  Stack,
} from '@mui/material';
import {
  LoadingButton
} from '@mui/lab';
import { toast } from 'react-toastify';

import { CurrentClassContext } from '../../../../../../context/currentClassContext';
import MediaAPI from '../../../../../../../../../helpers/api/media';
import { handleAPICallError } from '../../../../../../../../../helpers/handleAPICall';
import { ACCEPT_IMPORT_MIMETYPES } from '../../../../../../../../../helpers/constants';

// This leave rooms for additional special types later
const acceptFileMimetypes = ACCEPT_IMPORT_MIMETYPES;

export default function ImportStudentForm({
  onSuccess = () => {},
  handleClose = () => {}
}) {
  const { currentClass } = useContext(CurrentClassContext);
  const classId = currentClass.class_id;

  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImport = () => {
    if (!file) {
      return;
    }
    if (!acceptFileMimetypes.includes(file.type)) {
      setFile(null);
      toast.error('Chỉ có thể upload file excel');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('file', file);

    MediaAPI.importStudent(classId, formData)
    .then((res) => {
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      toast.success('Import thành công');
      onSuccess();
    })
    .catch(handleAPICallError())
    .finally(() => {
      setIsSubmitting(false);
    })
  }

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    
    if (
      !newFile || 
      !acceptFileMimetypes.includes(newFile.type)
    ) {
      setFile(null);
      return;
    }
    setFile(newFile);
  }

  return (
    <div>
      <Box mb={1}>
        <label htmlFor='import-file'>File (Excel)</label>
      </Box>
      <Input 
        readOnly
        fullWidth
        accept='application/vnd.ms-excel'
        id='import-file'
        name='import-file'
        type='file'
        onChange={handleFileChange}
      />
      <Box mt={3}>
        <Stack direction='row'>
          <LoadingButton
            variant='contained'
            loading={isSubmitting}
            disabled={
              (file == null)
            }
            onClick={handleImport}
          >
            Import
          </LoadingButton>
          <Button onClick={handleClose}>
            Hủy
          </Button>
        </Stack>
      </Box>
    </div>
  )
}
