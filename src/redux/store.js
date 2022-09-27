import { configureStore } from '@reduxjs/toolkit';
import { postsReduces } from './slices/posts';

//создаем хранилище
const store = configureStore({
  reducer: {
    posts: postsReduces,
  },
});

export default store;
