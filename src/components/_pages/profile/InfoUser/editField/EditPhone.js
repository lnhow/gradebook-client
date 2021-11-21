import React from 'react'
import clsx from 'clsx'
import * as yup from 'yup'
import { useFormik } from 'formik';

import styles from '../InfoUser.module.scss'

const validationSchema = yup.object({
    phone: yup
      .string('Nhập số điện thoại')
      .required('Bắt buộc')
      .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,'Số điện thoại không hợp lệ')
  });

const EditPhone = ({currentPhone,handleEditPhone,closeEditPhone}) => {
    const formik = useFormik({
        initialValues: {
          phone:'',
        },
        validationSchema: validationSchema,
        onSubmit: handleEditPhone
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div >
                <div className={styles.editRow}>
                    <span className={styles.editTitle}>Số điện thoại</span>
                    <span style={{marginLeft:10,opacity:0.7}}>{currentPhone || "Chưa cập nhật"}</span>
                </div>
                <div className={styles.editRow}>
                    <span className={styles.editTitle}>Số điện thoại mới</span>
                    <input  id="phone" value={formik.values.phone} onChange={formik.handleChange} className={styles.inputEdit}/>
                    <div style={{paddingLeft:10,color:'red'}}>{formik.errors.phone}</div>
                </div>
                <div className={styles.editRow}>
                    <button className={clsx(styles.btnEdit,styles.btnConfirmEdit)} type='submit'>Thay đổi số điện thoại </button>
                    <button className={styles.btnEdit} onClick={closeEditPhone}>Đóng</button>
                </div>
            </div>
        </form>

    )
}

export default EditPhone
