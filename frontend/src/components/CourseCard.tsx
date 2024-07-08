import { Card, CardContent, Typography, IconButton, LinearProgress, Grid } from '@mui/material';
import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface CourseCardProps {
  title: string;
  author: string;
  lessons: number;
  time: string;
  likes: number;
  coverImage: string;
  progress: number;
  liked: boolean;
  onLike: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  author,
  lessons,
  time,
  likes,
  coverImage,
  progress,
  liked,
  onLike
}) => {
  return (
    <Card>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', height: '150px', overflow: 'hidden' }}>
        <img src={`courses_covers/${coverImage}`} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 10, right: 10, backgroundColor: '#1976d2', color: '#fff', padding: '2px 8px', borderRadius: '0 0 0 8px' }}>
          {progress}% completed
        </div>
      </div>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle1">{author}</Typography>
        <Grid container spacing={2} alignItems="center" style={{ marginTop: 1 }}>
          <Grid item xs={12} sm={6} md={4} style={{ flexGrow: 1 }}>
            <Typography variant="body2">{lessons} lessons</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4} style={{ flexGrow: 1 }}>
            <Typography variant="body2"><AccessTimeIcon /> {time}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4} style={{ textAlign: 'right' }}>
            {likes}
            <IconButton onClick={onLike}>
              {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
