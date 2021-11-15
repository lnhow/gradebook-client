import React from 'react'
import { Avatar, Typography } from '@mui/material'
import styles from './InfoUser.module.css'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useState ,useEffect} from 'react'
import UserAPI from '../../../../helpers/api/user'
import Loader from '../../../_common/loader'

const InfoUser = () => {
    const [user, setUser] = useState({});
    const [birth,setBirth] = useState({date:'',month:'',year:''});
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);  
    useEffect(() => {
        loadUser();
      }, []);
      console.log(birth)
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
    if (!isLoaded) 
        return <Loader/>
    else
    return (
        <div className={clsx(styles.wrapperInfoBasic)}>
            <Typography style={{paddingTop:20,textAlign:'center'}} variant="h4" component="div">Thông tin cá nhân</Typography>
            <ul className={clsx(styles.InfoUserList)}>
                <li className={clsx(styles.InfoUserListItem)}>
                    <span className={clsx(styles.ItemTitle)}>Ảnh</span>
                    <span style={{fontSize:12}} className={clsx(styles.ItemContent)}>Một bức ảnh giúp cá nhân hóa tài khoản của bạn</span>
                    <Avatar className={clsx(styles.ItemArrow)} style={{width:60,height:60}} alt={user.full_name} src={user.avatar}/>
                </li>
                <li className={clsx(styles.InfoUserListItem)}>
                    <span className={clsx(styles.ItemTitle)}>Họ và tên</span>
                    <span className={clsx(styles.ItemContent)}>{user.full_name}</span>
                    <FontAwesomeIcon  icon={faAngleRight} style={{height:30,width:15}}/>
                </li>
                <li className={clsx(styles.InfoUserListItem)}>
                    <span className={clsx(styles.ItemTitle)}>Ngày sinh</span>
                    <span className={clsx(styles.ItemContent)}>{`Ngày ${birth.date} tháng ${birth.month} năm ${birth.year}`}</span>
                    <FontAwesomeIcon icon={faAngleRight} style={{height:30,width:15}}/>
                </li>
                <li className={clsx(styles.InfoUserListItem)}>
                    <span className={clsx(styles.ItemTitle)}>Giới tính</span>
                    <span className={clsx(styles.ItemContent)}>{user.sex === "M" ? "Nam" : "Nữ"}</span>
                    <FontAwesomeIcon icon={faAngleRight} style={{height:30,width:15}}/>
                </li>
                <li className={clsx(styles.InfoUserListItem)}>
                    <span className={clsx(styles.ItemTitle)}>Số điện thoại</span>
                    <span className={clsx(styles.ItemContent)}>{user.phone}</span>
                    <FontAwesomeIcon icon={faAngleRight} style={{height:30,width:15}}/>
                </li>
                <li className={clsx(styles.InfoUserListItem)}>
                    <span className={clsx(styles.ItemTitle)}>Mã code</span>
                    <span className={clsx(styles.ItemContent)}>{user.user_code}</span>
                    <FontAwesomeIcon icon={faAngleRight} style={{height:30,width:15}}/>
                </li>
            </ul>
        </div>
    )
}

export default InfoUser
