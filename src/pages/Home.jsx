import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components';
import { TagsBlock } from '../components';
import { CommentsBlock } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import noImage from '../assets/img/noimage.jpg';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);

  const isLoadingPosts = posts.status === true;
  const isLoadingTags = tags.status === true;

  //получаем статьи с бэка
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isLoadingPosts ? [...Array(5)] : posts.items).map((item, index) =>
            isLoadingPosts ? (
              <Post key={index} isLoading />
            ) : (
              <Post
                id={item._id}
                title={item.title}
                imageUrl={item.imageUrl ? item.imageUrl : noImage}
                user={item.user}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={3}
                tags={item.tags}
                isEditable
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isLoadingTags} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
