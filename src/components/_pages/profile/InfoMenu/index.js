import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faAddressCard, faUserCircle, faToggleOn, faUnlockAlt, faMoneyCheckAlt, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import styles from './InfoMenu.module.css'

const InfoMenu = () => {
    return (
        <div className={clsx(styles.wrapperInfoMenu)}>
            <ul className={clsx(styles.infoMenu)}>
                <li className={clsx(styles.infoMenuItem)}>
                    <FontAwesomeIcon icon={faUserCircle}/>
                    <span>Trang chủ</span>
                </li>
                <li className={clsx(styles.infoMenuItem,styles.actived)}>
                    <FontAwesomeIcon icon={faAddressCard}/>
                    <span>Thông tin cá nhân</span>
                </li>
                <li className={clsx(styles.infoMenuItem)}>    
                    <FontAwesomeIcon icon={faToggleOn}/>
                    <span>Dữ liệu và thông tin cá nhân</span>
                </li>
                <li className={clsx(styles.infoMenuItem)}>
                    <FontAwesomeIcon icon={faUnlockAlt}/>
                    <span>Bảo mật</span>
                </li>
                <li className={clsx(styles.infoMenuItem)}>
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
