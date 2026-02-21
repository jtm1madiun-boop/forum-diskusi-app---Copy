import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncAddThread, asyncToggleVoteThread } from '../states/threads/action'; // <-- PERUBAHAN: Import aksi vote
import NewThreadInput from '../components/NewThreadInput';
import CategoryFilters from '../components/CategoryFilters';
import ThreadList from '../components/ThreadList';

function HomePage() {
  const threads = useSelector((states) => states.threads || []);
  const users = useSelector((states) => states.users || []);
  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();
  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
  };

  const onCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  // <-- PERUBAHAN: Fungsi handler untuk vote thread
  const onVote = (threadId, voteType) => {
    dispatch(asyncToggleVoteThread(threadId, voteType));
  };

  const categoryList = threads.map((thread) => thread.category);
  const uniqueCategories = [...new Set(categoryList)];

  const threadList = threads
    .filter((thread) => (category ? thread.category === category : true))
    .map((thread) => ({
      ...thread,
      user: users.find((user) => user.id === thread.ownerId),
      authUser: authUser ? authUser.id : null, // Mencegah error jika belum login
    }));

  return (
    <section id="home-page-content">
      <NewThreadInput addThread={onAddThread} />

      <CategoryFilters
        categories={uniqueCategories}
        currentCategory={category}
        onCategoryChange={onCategoryChange}
      />

      {/* <-- PERUBAHAN: Teruskan onVote ke ThreadList */}
      <ThreadList threads={threadList} onVote={onVote} />
    </section>
  );
}

export default HomePage;