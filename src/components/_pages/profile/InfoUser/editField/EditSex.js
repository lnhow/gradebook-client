import React from 'react'
import clsx from 'clsx'
import { useState } from 'react'

import styles from '../InfoUser.module.scss'


const EditSex = ({currentSex,handleEditSex,closeEditSex}) => {
    const [sex, setSex] = useState(currentSex === "F" ? false : true)
    return (
            <div>
                <input className={styles.inputRadioSex} name="sex" value="M" type="radio" checked={sex} onChange={() => setSex(true)}/>Nam
                <input className={styles.inputRadioSex} name="sex" value="F" type="radio" checked={!sex} onChange={() => setSex(false)}/>Nữ
                <div style={{marginTop:20}} className={styles.editRow}>
                    <button className={clsx(styles.btnEdit,styles.btnConfirmEdit)} onClick={()=>handleEditSex(sex ? {sex:"M"} : {sex:"F"})}>Lưu thay đổi  </button>
                    <button className={styles.btnEdit} onClick={closeEditSex}>Đóng</button>
                </div>
            </div>
    )
}

export default EditSex
