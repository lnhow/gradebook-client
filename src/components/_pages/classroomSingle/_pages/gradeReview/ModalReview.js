import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { formatRelative, subDays } from "date-fns";
import { GRADE_MODAL } from "../../../../variables";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalReview = ({ open, handleClose, handleOpen }) => {
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        width={350}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Class comment
          </Typography>
          {GRADE_MODAL.map((i) => {
            return (
              <Grid container style={{ padding: 10 }}>
                <Grid item xs={12}>
                  <div style={{ display: "flex" }}>
                    <Avatar style={{ marginRight: 5 }}>{i.owner_avatar ?? 'H'}</Avatar>
                    <Grid container>
                      <Grid item xs={12}>
                        <div style={{ display: "flex" }}>
                          <Typography style={{ marginRight: 5 }}>
                            {i.owner_name}
                          </Typography>
                          <Typography>
                            <span style={{fontSize:"13px",color:"gray"}}>{formatRelative(subDays(new Date(), 3), new Date())}</span>
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>{i.content}</Typography>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            );
          })}
          <Divider />
          <Grid container style={{ marginTop: 20 }}>
            <Grid item xs={12}>
              <div style={{ display: "flex" }}>
                <Avatar style={{ marginRight: 10 }}>H</Avatar>
                <Paper
                  component="form"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Nhập nội dung"
                    inputProps={{ "aria-label": "Nhập nội dung" }}
                  />
                  <IconButton
                    color="primary"
                    sx={{ p: "10px" }}
                    aria-label="directions"
                  >
                    <SendOutlinedIcon />
                  </IconButton>
                </Paper>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalReview;
