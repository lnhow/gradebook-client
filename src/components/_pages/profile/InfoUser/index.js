import React from 'react'
import { Avatar, Typography } from '@mui/material'
import styles from './InfoUser.module.scss'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useState ,useEffect} from 'react'
import { toast } from 'react-toastify'

import UserAPI from '../../../../helpers/api/user'
import Loader from '../../../_common/loader'
import EditName from './editField/EditName'
import EditPhone from './editField/EditPhone'
import EditCode from './editField/EditCode'
import EditSex from './editField/EditSex'
import EditBirth from './editField/EditBirth'

const InfoUser = () => {
    const [user, setUser] = useState({});
    const [birth,setBirth] = useState({date:'',month:'',year:''});
    const [isLoaded, setIsLoaded] = useState(false);
    const [openName,setOpenName] = useState(false);
    const [openPhone,setOpenPhone] = useState(false)
    const [openCode,setOpenCode] = useState(false)
    const [openSex,setOpenSex] = useState(false)
    const [openBirth,setOpenBirth] = useState(false)
    const [error, setError] = useState(null); 

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
            if (error.response) {
              res = [...error.response.data];
              //Incase cannot request to server
              res.data = error.response.data;
              res.status = error.response.status;
            }
            res.message = error.message;
            setIsLoaded(true);
            setError(res);
          }
        )
      }
      const handleEdit = async (values) =>
      {
        console.log(values)
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


    if (!isLoaded) 
        return <Loader/>
    else
    return (
        <div className={clsx(styles.wrapperInfoBasic)}>
            <Typography style={{paddingTop:20,textAlign:'center'}} variant="h4" component="div">Thông tin cá nhân</Typography>
            <ul className={clsx(styles.InfoUserList)}>
                <li  className={clsx(styles.InfoUserListItem)}>
                    <span className={clsx(styles.ItemTitle)}>Ảnh</span>
                    <span style={{fontSize:12}} className={clsx(styles.ItemContent)}>Một bức ảnh giúp cá nhân hóa tài khoản của bạn</span>
                    <Avatar style={{width:60,height:60}} alt={user.full_name} src={user.avatar}/>
                </li>
                <li onClick={openEditName} className={clsx(styles.InfoUserListItem,{[styles.hideEdit]:!openName})}>
                    <span className={clsx(styles.ItemTitle)}>Tên</span>
                    {openName ?
                      <EditName currentName={user.full_name} handleEditName={handleEdit} closeEditName={closeEditName}/>
                      :
                      <>
                        <span className={clsx(styles.ItemContent)}>{user.full_name || "Chưa cập nhập"}</span>
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
                        <span className={clsx(styles.ItemContent)}>{user.date_of_birth ? `Ngày ${birth.date} tháng ${birth.month} năm ${birth.year}` : "Chưa cập nhập"}</span>
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
                        <span className={clsx(styles.ItemContent)}>{user.sex === "M" ? "Nam" : (user.sex === "F" ? "Nữ" : "Chưa cập nhập")}</span>
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
                        <span className={clsx(styles.ItemContent)}>{user.phone || "Chưa cập nhập"}</span>
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
                        <span className={clsx(styles.ItemContent)}>{user.user_code || "Chưa cập nhập"}</span>
                        <FontAwesomeIcon icon={faAngleRight} style={{height:30,width:15}}/>
                      </>
                    }
                </li>
            </ul>
        </div>
    )
}

export default InfoUser
