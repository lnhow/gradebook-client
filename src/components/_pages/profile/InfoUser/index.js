import React from 'react'
import { Avatar, Typography } from '@mui/material'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useState ,useEffect} from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import { updateUser } from '../../../../redux/slices/user'
import UserAPI from '../../../../helpers/api/user'
import Loader from '../../../_common/loader'
import EditName from './editField/EditName'
import EditPhone from './editField/EditPhone'
import EditCode from './editField/EditCode'
import EditSex from './editField/EditSex'
import EditBirth from './editField/EditBirth'
import ModalChangeAvatar from './ModalChangeAvatar/ModalChangeAvatar'
import styles from './InfoUser.module.scss'
import { USER_INFO } from '../../../../helpers/constants'

const DEFAULT_THEME = 'default';

const InfoUser = () => {
    const [user, setUser] = useState({});
    const [birth,setBirth] = useState({date:'',month:'',year:''});
    const [isLoaded, setIsLoaded] = useState(false);
    const [openName,setOpenName] = useState(false);
    const [openPhone,setOpenPhone] = useState(false)
    const [openCode,setOpenCode] = useState(false)
    const [openSex,setOpenSex] = useState(false) 
    const [openBirth,setOpenBirth] = useState(false)
    const [openAvatar,setOpenAvatar] = useState(false)
    const currentTheme = localStorage.getItem('theme') || DEFAULT_THEME;
    const theme = currentTheme === "dark" ? true : false
    const dispatch = useDispatch()

    useEffect(() => {
        loadUser();
      }, []);

    const loadUser = () => {
        setUser({});
        setIsLoaded(false);
        UserAPI.getUserInfo()
        .then(
          (result) => {
            setIsLoaded(true);
            let date = new Date(Date.parse(result.data.data.date_of_birth))
            setBirth({
                date:date.getDate(),
                month:date.getMonth()+1,
                year:date.getFullYear()
            })
            setUser(result.data.data);
          },
        )  
        .catch(
          (error) => {
            let res = {};
            if (error.response && error.response.data) {
              if (error.response.data) {
                res = {...error.response.data};
              }
              //Incase cannot request to server
              res.data = error.response.data;
              res.status = error.response.status;
            }
            else {
              res.message = error.message;
            }
            res.message = error.message;
            setIsLoaded(true);
          }
        )
      }
      const handleEdit = async (values) =>
      {
        setUser(
          {
            ...user,
            ...values
          }
        )
        setOpenName(false)
        setOpenPhone(false)
        setOpenCode(false)
        setOpenSex(false)
        setOpenBirth(false)
        UserAPI.updateUser(values)
        .then((res)=>
        {
          dispatch(updateUser(res.data.data))
          console.log(res.data.data)
          const {full_name,avatar} =res.data.data
          let current = localStorage.getItem(USER_INFO)
          localStorage.setItem(USER_INFO,JSON.stringify({...JSON.parse(current),full_name,avatar}))
          toast.success(res.data.message);

        })
        .catch((err)=>{
          let message = err.message;
          if (err.response && err.response.data) {
            message = err.response.data.message;
          }
          toast.error(message);
        })
      }

    const openEditName = () =>
    {
        if(!openName) 
        {
          setOpenName(true)
          setOpenPhone(false)
          setOpenCode(false)
          setOpenSex(false)
          setOpenBirth(false)
        }
    }

    const closeEditName = () =>
    {
        setOpenName(false)
    }


    const openEditPhone = () =>
    {
        if(!openPhone) 
        {
          setOpenPhone(true)
          setOpenName(false)
          setOpenCode(false)
          setOpenSex(false)
          setOpenBirth(false)
        }
    }

    const closeEditPhone = () =>
    {
        setOpenPhone(false)
    }

    const openEditCode = () =>
    {
        if(!openCode)
        {
          setOpenCode(true)
          setOpenName(false)
          setOpenPhone(false)
          setOpenSex(false)
          setOpenBirth(false)
        }
    }

    const closeEditCode = () =>
    {
        setOpenCode(false)
    }

    const openEditSex= () =>
    {
        if(!openSex)
        {
          setOpenSex(true)
          setOpenName(false)
          setOpenPhone(false)
          setOpenCode(false)
          setOpenBirth(false)
        }
    }

    const closeEditSex = () =>
    {
        setOpenSex(false)
    }

    const openEditBirth= () =>
    {
        if(!openBirth)
        {
          setOpenBirth(true)
          setOpenSex(false)
          setOpenName(false)
          setOpenPhone(false)
          setOpenCode(false)
        }
    }

    const closeEditBirth = () =>
    {
        setOpenBirth(false)
    }

    const openEditAvatar = () =>
    {
      setOpenAvatar(true)
    }

    const closeEditAvatar = () =>
    {
      setOpenAvatar(false)
    }

    if (!isLoaded) 
        return <Loader/>
    else
    return (
        <div className={clsx(styles.wrapperInfoBasic)}>
            <Typography style={{paddingTop:20,textAlign:'center'}} variant="h4" component="div">Thông tin cá nhân</Typography>
            <ul className={styles.InfoUserList}>
                <li onClick={openEditAvatar}  className={clsx(styles.InfoUserListItem,styles.hideEdit)}>
                    <span className={clsx(styles.ItemTitle)}>Ảnh</span>
                    <span style={{fontSize:12}} className={clsx(styles.ItemContent)}>Một bức ảnh giúp cá nhân hóa tài khoản của bạn</span>
                    <Avatar style={{width:60,height:60}} alt={user.full_name } src={user.avatar || "None"}/>
                </li>
                <li onClick={openEditName} className={clsx(styles.InfoUserListItem,{[styles.hideEdit]:!openName})}>
                    <span className={clsx(styles.ItemTitle)}>Tên</span>
                    {openName ?
                      <EditName currentName={user.full_name} handleEditName={handleEdit} closeEditName={closeEditName}/>
                      :
                      <>
                        <span className={clsx(styles.ItemContent)}>{user.full_name || "Chưa cập nhật"}</span>
                        <FontAwesomeIcon icon={faAngleRight} style={{height:30,width:15}}/>
                      </>
                    }
                </li>
                <li onClick={openEditBirth}  className={clsx(styles.InfoUserListItem,{[styles.hideEdit]:!openBirth})}>
                    <span className={clsx(styles.ItemTitle)}>Ngày sinh</span>
                    {openBirth ?
                      <EditBirth currentBirth={user.date_of_birth} handleEditBirth={handleEdit} closeEditBirth={closeEditBirth} setBirth={setBirth}/>
                      :
                      <>
                        <span className={clsx(styles.ItemContent)}>{user.date_of_birth ? `Ngày ${birth.date} tháng ${birth.month} năm ${birth.year}` : "Chưa cập nhật"}</span>
                        <FontAwesomeIcon icon={faAngleRight} style={{height:30,width:15}}/>
                      </>
                    }
                </li>
                <li onClick={openEditSex} className={clsx(styles.InfoUserListItem,{[styles.hideEdit]:!openSex})}>
                    <span className={clsx(styles.ItemTitle)}>Giới tính</span>
                    {openSex ?
                      <EditSex currentSex={user.sex} handleEditSex={handleEdit} closeEditSex={closeEditSex}/>
                      :
                      <>
                        <span className={clsx(styles.ItemContent)}>{user.sex === "M" ? "Nam" : (user.sex === "F" ? "Nữ" : "Chưa cập nhật")}</span>
                        <FontAwesomeIcon icon={faAngleRight} style={{height:30,width:15}}/>
                      </>
                    }
                </li>
                <li onClick={openEditPhone} className={clsx(styles.InfoUserListItem,{[styles.hideEdit]:!openPhone})}>
                    <span className={clsx(styles.ItemTitle)}>Liên lạc</span>
                    {openPhone ?
                      <EditPhone currentPhone={user.phone} handleEditPhone={handleEdit} closeEditPhone={closeEditPhone}/>
                      :
                      <>
                        <span className={clsx(styles.ItemContent)}>{user.phone || "Chưa cập nhật"}</span>
                        <FontAwesomeIcon icon={faAngleRight} style={{height:30,width:15}}/>
                      </>
                    }
                </li>
                <li onClick={openEditCode} className={clsx(styles.InfoUserListItem,{[styles.hideEdit]:!openCode})}>
                    <span className={clsx(styles.ItemTitle)}>Mã sinh viên</span>
                    {openCode ?
                      <EditCode currentCode={user.user_code} handleEditCode={handleEdit} closeEditCode={closeEditCode}/>
                      :
                      <>
                        <span className={clsx(styles.ItemContent)}>{user.user_code || "Chưa cập nhật"}</span>
                        <FontAwesomeIcon icon={faAngleRight} style={{height:30,width:15}}/>
                      </>
                    }
                </li>
            </ul>
          {openAvatar && <ModalChangeAvatar handleEdit ={handleEdit} avatar={user.avatar} closeEditAvatar={closeEditAvatar} fullName={user.full_name} theme={theme}/>}
        </div>
    )
}

export default InfoUser
