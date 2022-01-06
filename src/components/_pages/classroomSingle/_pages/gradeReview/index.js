import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import GradeCard from "./gradeCard";
import { GRADE_REVIEWS } from "../../../../variables";
import ModalReview from "./ModalReview";

export const GradeReview = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <React.Fragment>
      {open && (
        <ModalReview
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
        />
      )}
      <Grid container spacing={2} style={{ paddingTop: 20 }}>
        {GRADE_REVIEWS.map((i) => {
          return (
            <Grid item xs={12}>
              <GradeCard
                grade={i}
                onView={() => setOpen(true)}
                handleOpen={handleOpen}
                handleClose={handleClose}
              />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default GradeReview;
