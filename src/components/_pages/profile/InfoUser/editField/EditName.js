import React from 'react'
import clsx from 'clsx'
import * as yup from 'yup'
import { useFormik } from 'formik';
import styles from '../InfoUser.module.scss'

const validationSchema = yup.object({
    full_name: yup
      .string('Nhập họ tên')
      .min(6, 'Tối thiểu 6 ký tự')
      .max(30, 'Tối đa 50 ký tự')
      .required('Bắt buộc'),
  });

const EditName = ({currentName,handleEditName,closeEditName}) => {
    const formik = useFormik({
        initialValues: {
          full_name:'',
        },
        validationSchema: validationSchema,
        onSubmit: handleEditName
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div >
                <div className={styles.editRow}>
                    <span className={styles.editTitle}>Họ tên</span>
                    <span style={{marginLeft:10,opacity:0.7}}>{currentName || "Chưa cập nhật"}</span>
                </div>
                <div className={styles.editRow}>
                    <span className={styles.editTitle}>Họ tên mới</span>
                    <input  id="full_name" value={formik.values.full_name} onChange={formik.handleChange} className={styles.inputEdit}/>
                    <div style={{paddingLeft:10,color:'red'}}>{formik.errors.full_name}</div>
                </div>
                <div className={styles.editRow}>
                    <button className={clsx(styles.btnEdit,styles.btnConfirmEdit)} type='submit'>Thay đổi tên</button>
                    <button className={styles.btnEdit} onClick={closeEditName}>Đóng</button>
                </div>
            </div>
        </form>

    )
}

export default EditName
