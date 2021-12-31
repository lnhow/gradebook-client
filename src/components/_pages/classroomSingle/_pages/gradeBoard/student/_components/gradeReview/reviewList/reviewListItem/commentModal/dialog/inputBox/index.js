import {
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import { useState } from 'react';

export default function CommentForm() {
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formValue) {
      //Form value is empty
      return;
    }
    

    setFormValue('');
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <TextField
          placeholder='Nhập comment...'
          variant='outlined'
          size='medium'
          fullWidth
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton color='primary' size='small' type='submit'>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  )
}
