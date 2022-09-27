import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/api';

//делаем асинхронный запрос (называтся будет /posts/fetchPosts) на посты из блога
export const fetchPosts = createAsyncThunk('/posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('/tags/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducer: {},
  //отлавливаем loading
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = 'loading';
    },
    //если загрузка прошла и есть данные
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    //если произошла ошибка
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    [fetchTags.pending]: (state) => {
      state.tags.status = 'loading';
    },
    //если загрузка прошла и есть данные
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    //если произошла ошибка
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
  },
});

export const postsReduces = postsSlice.reducer;
