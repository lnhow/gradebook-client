import { Grid } from "@mui/material";
import {useState} from 'react';

import InfoUser from "./InfoUser";
import InfoMenu from "./InfoMenu";
import ChangePassword from "./ChangePassword/ChangePassword";

function ProfilePage() {
  const [actived, setActived] = useState('user-info')
  const [openInfo, setOpenInfo] = useState(true)
  const [openSecurity, setOpenSecurity] = useState(false)
  const setAct = (actived) =>
  {
    setActived(actived)
    if (actived === "user-info")
    {
      setOpenInfo(true)
      setOpenSecurity(false)
    }
    else{
      setOpenInfo(false)
      setOpenSecurity(true)
    }
  }
  return (
    <>
      <Grid p={5} container spacing={10} >
        <Grid item xs={12} md={12} lg={4} >
          <InfoMenu actived={actived} setAct={setAct} />
        </Grid>
        <Grid item xs={12} md={12} lg={8} >
          {openInfo && <InfoUser/>}
          {openSecurity && <ChangePassword actived={actived} setAct={setAct}/>}
        </Grid>
      </Grid>
    </>
  )
}

export default ProfilePage;
