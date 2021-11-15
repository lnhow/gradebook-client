import { Grid } from "@mui/material";

import InfoUser from "./InfoUser";
import InfoMenu from "./InfoMenu";

function ProfilePage() {
  return (
    <>
      {/* <FontAwesomeIcon icon={faUserCircle}/> */}
      <Grid p={5} container spacing={10} >
        <Grid item xs={12} md={12} lg={4} >
          <InfoMenu/>
        </Grid>
        <Grid item xs={12} md={12} lg={8} >
          <InfoUser/>
        </Grid>
      </Grid>
    </>
  )
}

export default ProfilePage;
