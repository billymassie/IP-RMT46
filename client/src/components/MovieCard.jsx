import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Divider } from '@mui/material';

export default function MovieCard({
  title,
  posterUrl,
  overview,
  handleClick,
  btnCaption,
  children,
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          image={posterUrl}
          height={518}
        />
        <Divider />
        <CardContent
          style={{
            height: '130px',
            overflow: 'scroll',
          }}
        >
          <Typography
            gutterBottom
            variant='h5'
            component='div'
          >
            {title}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
          >
            {overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size='small'
          color='primary'
          onClick={handleClick}
        >
          {btnCaption}
        </Button>
        {children}
      </CardActions>
    </Card>
  );
}
