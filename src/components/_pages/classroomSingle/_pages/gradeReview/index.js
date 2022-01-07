import {
  Container,
  Box,
  Typography,
} from '@mui/material'
import ReviewListProvider from './_context/reviewContext'

export default function ClassroomGradeReview() {
  return (
    <ReviewListProvider>
      <Box mt={2}>
        <Container maxWidth='md'>
          <Typography>Danh sách phúc khảo</Typography>
        </Container>
      </Box>
    </ReviewListProvider>
  )
}
