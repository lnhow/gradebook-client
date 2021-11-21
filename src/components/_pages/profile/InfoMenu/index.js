import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faAddressCard, faUserCircle, faToggleOn, faUnlockAlt, faMoneyCheckAlt, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import styles from './InfoMenu.module.scss'

const InfoMenu = ({actived,setAct}) => {
    const handleClickSecurity = () =>{
        document.getElementById("user-security").className=clsx(styles.infoMenuItem,styles.actived)
        document.getElementById(actived).className=styles.infoMenuItem
        setAct("user-security")
    }
    const handleClickInfo= () =>{
        document.getElementById("user-info").className=clsx(styles.infoMenuItem,styles.actived)
        document.getElementById(actived).className=styles.infoMenuItem
        setAct("user-info")
    }
    return (
        <div className={clsx(styles.wrapperInfoMenu)}>
            <ul className={clsx(styles.infoMenu)}>
                <li className={clsx(styles.infoMenuItem)}>
                    <FontAwesomeIcon icon={faUserCircle}/>
                    <span>Trang chủ</span>
                </li>
                <li onClick={handleClickInfo} id="user-info" className={clsx(styles.infoMenuItem,styles.actived)}>
                    <FontAwesomeIcon icon={faAddressCard}/>
                    <span>Thông tin cá nhân</span>
                </li>
                <li className={clsx(styles.infoMenuItem)}>    
                    <FontAwesomeIcon icon={faToggleOn}/>
                    <span>Dữ liệu và thông tin cá nhân</span>
                </li>
                <li id="user-security" onClick={handleClickSecurity} className={clsx(styles.infoMenuItem)}>
                    <FontAwesomeIcon icon={faUnlockAlt}/>
                    <span>Bảo mật | Đổi mật khẩu</span>
                </li>
                <li  className={clsx(styles.infoMenuItem)}>
                    <FontAwesomeIcon icon={faMoneyCheckAlt}/>
                    <span>Thanh toán</span>
                </li>
                <li className={clsx(styles.infoMenuItem)}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    <span>Giới thiệu</span>
                </li>
            </ul>
        </div>
    )
}

export default InfoMenu
