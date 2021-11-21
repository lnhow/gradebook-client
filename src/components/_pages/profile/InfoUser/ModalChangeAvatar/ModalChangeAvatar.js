import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt ,faPen} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState ,useEffect} from 'react'
import { Avatar } from '@mui/material'
import FormData from 'form-data'

import { uploadImg } from '../../../../../helpers/api/upload'
import styles from './ModalChangeAvatar.module.scss'

const ModalChangeAvatar = ({avatar,closeEditAvatar,theme,fullName,handleEdit}) => {
    const [file, setFile] = useState()
    const [deleteError, setDeleteError] = useState()
    avatar = avatar ? avatar : "None"
    useEffect(() => {
        return () => {
            file && URL.revokeObjectURL(file.preview)
        }
    }, [file])
    const handleDeleteAvatar = () =>
    {
        if (avatar === "NULL" || avatar === "")
            {
                setDeleteError("Bạn chưa cập nhật ảnh nào lên hồ sơ")
                setTimeout(()=>setDeleteError(""), 3000);
            }
        else
            setFile({preview:"None"})
    }
    const handleFileChange = (e) =>
    {
        const file = e.target.files[0]
        file.preview=URL.createObjectURL(file)
        setFile(file)
    }

    const handleChangeAvatar = () => 
    {
        if (file.preview !== "None"){
            let formData = new FormData();
            formData.append("image", file);
            uploadImg(formData)
            .then((result)=>
            {
                let linkImg=result.data.data
                handleEdit({avatar:linkImg})
                closeEditAvatar()
            })
            .catch((error) => 
                console.log(error)
            )
        } 
        else{
            handleEdit({avatar:"NULL"})
            closeEditAvatar()
        }
    }

    const cancleChangeAvatar = () =>
    {
        setFile("")
    }

    const stopPropagation = (e) =>
    {
        e.stopPropagation()
    }
    return (
        <div id="modalChangeAvatar" onClick={closeEditAvatar} className={clsx(styles.modal,{[styles.dark]:theme,[styles.default]:!theme})}>
            <div onClick={stopPropagation} className={styles.modalContainer}>
                <FontAwesomeIcon onClick={closeEditAvatar} style={{height:20,width:20,marginTop:20,marginLeft:20}} icon={faTimes}/>
                <div className={styles.avatarContent}>
                    <Avatar style={{width:300,height:300,fontSize:200}}  src={file ? file.preview : avatar} alt={fullName}/>
                    <div className={styles.avatarContentTitle}>Ảnh hồ sơ</div>
                    <p className={styles.avatarContentDesc}>Ảnh hồ sơ giúp người khác nhận ra bạn và cũng giúp bạn nhận biết được rằng mình đã đăng nhập vào tài khoản</p>
                </div>
                <div className={styles.avatarControl}>
                    <div className={styles.avatarControlItem}>
                        {file ? 
                        <label onClick={cancleChangeAvatar} className={clsx(styles.avatarControlButton,styles.ButtonDelete)}>
                            Hủy
                        </label>
                        :
                        <label onClick={handleDeleteAvatar} className={clsx(styles.avatarControlButton,styles.ButtonDelete)}>
                            <FontAwesomeIcon className={styles.avatarButonIcon} icon={faTrashAlt}/>
                            Xóa
                        </label>
                        }
                    </div>
                    <div className={styles.avatarControlItem}>
                        <div className={styles.fileInputContainer}>
                            {file ?
                                <label onClick={handleChangeAvatar} className={clsx(styles.avatarControlButton,styles.ButtonChange)}>
                                    Cập nhật ảnh
                                </label>
                                :
                                <>
                                    <input accept="image/png, image/jpeg ,image/jpg"  onChange={(e)=>handleFileChange(e)} type="file" id="file" className={styles.fileInput}/>
                                    <label  htmlFor="file" className={clsx(styles.avatarControlButton,styles.ButtonChange)}>
                                        <FontAwesomeIcon className={styles.avatarButonIcon} icon={faPen}/>
                                        Thay đổi
                                    </label>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.ButtonDeleteError}>{deleteError}</div>
            </div>
        </div>
    )
}
export default ModalChangeAvatar
