import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { formatRelative, subDays } from "date-fns";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CardCont = styled(CardContent)(({}) => ({
  paddingTop: 4,
}));
export const GradeCard = ({ grade, onView }) => {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <Grid container style={{ padding: 8 }}>
        <Grid item xs={12}>
          <div style={{ display: "flex" }}>
            <Avatar style={{ marginRight: 10 }}>H</Avatar>
            <Grid container>
              <Grid item xs={12}>
                {grade.student_name}
              </Grid>
              <Grid item xs={12}>
                <span style={{ fontSize:"13px",color:"gray" }}>{formatRelative(subDays(new Date(), 3), new Date())}</span>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <CardCont className="card_content">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              {`Số điểm hiện tại: ${grade.expected_grade}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Số điểm phúc khảo: ${grade.expected_grade}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {`Lý do phúc khảo: ${grade.explanation}`}
            </Typography>
          </Grid>
        </Grid>
      </CardCont>
      <CardActions>
        <Grid container>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if(onView) onView(grade)
              }}
            >
              {`Bình luận`}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default GradeCard;
