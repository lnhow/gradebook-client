import React, { Component } from 'react';
import { Typography, Container, Box, Button, Grid, Avatar, Card, CardHeader, CardMedia, CardContent, CardActions } from '@mui/material';
import Loader from '../../_common/loader';
import { fetchClassroomByInvite } from '../../../helpers/api/classrooms';
import { JoinInvite } from '../../../helpers/api/invite';
import { toast } from 'react-toastify';
import { USER_INFO } from '../../../helpers/constants';
import { Redirect } from 'react-router-dom';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState = () => ({
    classInfo: null,
    isLoading: true,
    redirectTo: null,
    coverClass: null,
    user_info: JSON.parse(window.localStorage.getItem(USER_INFO)),
    class_id: null,
    token: null
  });

  async componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('invitation');
    let class_id = urlParams.get('class_id');
    let res = await fetchClassroomByInvite(token, class_id);
    if (res.data.success) {
      if (res.data.message === "Bạn đã tham gia lớp này") {
        // return <Redirect to={`/class/${class_id}`} />
      }
      this.setState({ classInfo: res.data.data, class_id, token, coverClass: this.getRandomCover(), isLoading: false });
    }
    else {
      toast.error("Lỗi hệ thống");
    }
  }

  getRandomCover() {
    let list_cover = [
      "https://res.cloudinary.com/dungpho/image/upload/v1637338264/images/bg_classroom3_sz8acx.jpg",
      "https://res.cloudinary.com/dungpho/image/upload/v1637338262/images/bg_classroom2_z4uv5r.jpg",
      "https://res.cloudinary.com/dungpho/image/upload/v1637338255/images/bg_classroom1_a5cl6k.jpg"
    ]

    let random_number = Math.floor(Math.random() * 3);
    return list_cover[random_number];
  }

  async onJoin() {
    let { token, class_id } = this.state;
    let params = {
      token, class_id
    }
    let res = await JoinInvite(params);
    if (res.data.success) {
      this.setState({ 
        isLoading: false,
        redirectTo: `/class/${class_id}`,
      });
    }
    else {
      toast.error("Lỗi hệ thống");
    }
  }

  render() {
    let { classInfo, isLoading, coverClass, user_info, redirectTo } = this.state;

    if (isLoading) {
      return <Loader />;
    }

    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }

    return (
      <Container maxWidth='md'>
        <Grid
          container
          display='flex'
          direction='column'
          alignItems='center'
          justifyContent='center'
          style={{ minHeight: '50vh' /* Layout height */ }}
        >
          <Grid item xs={12}>
            <Box maxWidth='600px'>
              <h4>Xin chào <span style={{ fontStyle: "italic" }}>{user_info.full_name}</span>, bạn có lời mời tham gia từ </h4>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar src={classInfo.owner_avatar}>
                    </Avatar>
                  }
                  title={classInfo.owner_name}
                  subheader="Giáo viên phụ trách"
                />
                <CardMedia
                  component="img"
                  alt="cover classroom"
                  height="140"
                  image={coverClass}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {classInfo.class_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {classInfo.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => {
                    this.onJoin()
                  }}>Tham gia</Button>
                  {/* <Button size="small" onClick>Từ chối</Button> */}
                </CardActions>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container >
    )
  }
}

export default index;