import React from 'react'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'

import UserAPI from '../../../../helpers/api/user'
import styles from './ChangePassword.module.css'
import stylesInfoMenu from '../InfoMenu/InfoMenu.module.scss' 

const validationSchema = yup.object({
    oldpassword: yup
    .string('Nhập mật khẩu cũ')
    .min(8, 'Tối thiểu 8 ký tự')
    .required('Bắt buộc'),
    newpassword: yup
    .string('Nhập mật khẩu')
    .min(8, 'Tối thiểu 8 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Ít nhất một ký tự viết hoa, một ký tự viết thường, một chữ số và một ký tự đặc biệt(@#$%^&*)"
    )
    .required('Bắt buộc'),
    repeat_newpassword: yup
    .string('Xác nhận mật khẫu mới')
    .required('Bắt buộc')
    .oneOf([yup.ref('newpassword')], 'Mật khẩu nhập lại không khớp'),
  });
const ChangePassword = ({actived,setAct}) => {
    const handleSubmit = (values) => {
        UserAPI.changePassword({oldpassword:values.oldpassword,newpassword:values.newpassword})
        .then(
          (res) => {
            setAct("user-info")
            document.getElementById("user-info").className=clsx(stylesInfoMenu.infoMenuItem,stylesInfoMenu.actived)
            document.getElementById(actived).className=stylesInfoMenu.infoMenuItem
            toast.success(res.data.message);
          },
        )  
        .catch(
          (err) => {
            let message = err.message;
            if (err.response && err.response.data) {
              message = err.response.data.message;
            }
            toast.error(message);
          }
        )
    }
    const formik = useFormik({
        initialValues: {
          oldpassword:'',
          newpassword:'',
          repeat_newpassword:''
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    });
    return (
        <>
            <div className={styles.Header}>
                <FontAwesomeIcon style={{height:50,width:50,padding:15,marginRight:10}} icon={faKey}/>
                <div>
                    <div className={styles.HeaderTitle}>Đổi mật khẩu</div>
                    <div className={styles.HeaderTitleContent}> Bạn nên sử dụng mật khẩu mạnh mà mình chưa sử dụng ở đâu</div>
                </div>
            </div>
            <div className={styles.Content}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.ContentRow}>
                        <span className={styles.editTitle}>Mật khẩu cũ</span>
                        <input type="password" id="oldpassword" value={formik.values.oldpassword} onChange={formik.handleChange} className={styles.editContent}/>
                    </div>
                    <div className={clsx(styles.ContentRow,styles.ContentError)}>
                        <span className={styles.editTitle}></span>
                        <div className={clsx(styles.editContent,styles.messageError)}>{formik.errors.oldpasword}</div>
                    </div>
                    <div className={styles.ContentRow}>
                        <span className={styles.editTitle}>Mật khẩu mới</span>
                        <input type="password" id="newpassword" value={formik.values.newpassword} onChange={formik.handleChange} className={styles.editContent}/>
                    </div>
                    <div className={clsx(styles.ContentRow,styles.ContentError)}>
                        <span className={styles.editTitle}></span>
                        <div className={clsx(styles.editContent,styles.messageError)}>{formik.errors.newpassword}</div>
                    </div>
                    <div className={styles.ContentRow}>
                        <span className={styles.editTitle}>Nhập lại mật khẩu mới </span>
                        <input type="password" id="repeat_newpassword" value={formik.values.repeat_newpassword} onChange={formik.handleChange} className={styles.editContent}/>
                    </div>
                    <div className={clsx(styles.ContentRow,styles.ContentError)}>
                        <span className={styles.editTitle}></span>
                        <div className={clsx(styles.editContent,styles.messageError)}>{formik.errors.repeat_newpassword}</div>
                    </div>
                    <div className={clsx(styles.ContentRow,styles.ContentError)}>
                        <span className={styles.editTitle}></span>
                        <button type="submit" className={clsx(styles.btnSubmit,styles.editContent)}>Lưu thay đổi  </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangePassword
