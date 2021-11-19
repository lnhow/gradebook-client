import React from 'react'
import clsx from 'clsx'
import { useState } from 'react'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import styles from '../InfoUser.module.scss'


const EditBirth = ({currentBirth,handleEditBirth,closeEditBirth,setBirth}) => {
    const [date, setDate] = useState(new Date(currentBirth))
    const [errMess,setErrMess] = useState("")
    const handleChange = (newValue) => {
        setDate(newValue);
        setErrMess("")
      };
    const handleSubmit = () =>
    {
        let now= new Date()
        if (date !== "Invalid Date" && date != null && now > date )
        {
            setBirth({date:date.getDate(),month:date.getMonth()+1,year:date.getFullYear()})
            handleEditBirth({date_of_birth:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`})
        }
        else
            setErrMess("Ngày sinh không hợp lệ")
    }
    return (
            <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Chọn ngày sinh"
                        inputFormat="MM/dd/yyyy"
                        value={date}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <div className={styles.errMess}>{errMess}</div>
                </LocalizationProvider>
                <div style={{marginTop:20}} className={styles.editRow}>
                    <button className={clsx(styles.btnEdit,styles.btnConfirmEdit)} onClick={handleSubmit}>Lưu thay đổi  </button>
                    <button className={styles.btnEdit} onClick={closeEditBirth}>Đóng</button>
                </div>
            </div>

    )
}

export default EditBirth
