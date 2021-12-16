import { useState, useContext } from 'react';
import {
  Input,
  Button,
  Box,
} from '@mui/material';
import { toast } from 'react-toastify';

import { CurrentClassContext } from '../../../../../../context/currentClassContext';

const acceptFileMimetype = 'application/vnd.ms-excel';

export default function ImportStudentForm({
  onSuccess = () => {},
  handleClose = () => {}
}) {
  const { currentClass } = useContext(CurrentClassContext);
  const classId = currentClass.class_id;

  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImport = () => {
    if (file) {
      if (file.type !== acceptFileMimetype) {
        setFile(null);
        toast.error('Chỉ có thể upload file excel');
        return;
      }

      setIsSubmitting(true);
      console.log(classId);
      const formData = new FormData();
      formData.append('importFile', file);
      console.log(formData);
      // Call API here
      setIsSubmitting(false);
      onSuccess();
    }
  }

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (!newFile || newFile.type !== acceptFileMimetype) {
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
        <Button 
          variant='contained'
          disabled={
            (file == null) || isSubmitting
          }
          onClick={handleImport}
        >
          Import
        </Button>
        <Button onClick={handleClose}>
          Hủy
        </Button>
      </Box>
    </div>
  )
}
