import React from 'react'
import clsx from 'clsx'
import * as yup from 'yup'
import { useFormik } from 'formik';

import styles from '../InfoUser.module.scss'

const validationSchema = yup.object({
    user_code: yup
      .string('Nhập số mã sinh viên')
      .required('Bắt buộc')
      .matches(/[\w-]{6,8}/,'Mã sinh viên không hợp lệ')
  });

const EditCode = ({currentCode,handleEditCode,closeEditCode}) => {
    const formik = useFormik({
        initialValues: {
          user_code:'',
        },
        validationSchema: validationSchema,
        onSubmit: handleEditCode
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <div className={styles.editRow}>
                    <span className={styles.editTitle}>Mã hiện tại</span>
                    <span style={{marginLeft:10,opacity:0.7}}>{currentCode || "Chưa cập nhật"}</span>
                </div>
                <div className={styles.editRow}>
                    <span className={styles.editTitle}>Mã mới</span>
                    <input  id="user_code" value={formik.values.user_code} onChange={formik.handleChange} className={styles.inputEdit}/>
                    <div style={{paddingLeft:10,color:'red'}}>{formik.errors.user_code}</div>
                </div>
                <div className={styles.editRow}>
                    <button className={clsx(styles.btnEdit,styles.btnConfirmEdit)} type='submit'>Thay đổi mã </button>
                    <button className={styles.btnEdit} onClick={closeEditCode}>Đóng</button>
                </div>
            </div>
        </form>

    )
}

export default EditCode
