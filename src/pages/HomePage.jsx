import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncAddThread } from '../states/threads/action';
import NewThreadInput from '../components/NewThreadInput';
import CategoryFilters from '../components/CategoryFilters';
import ThreadList from '../components/ThreadList';

function HomePage() {
  // <-- PERUBAHAN: Ambil setiap state secara terpisah untuk optimisasi
  // Ini mencegah re-render yang tidak perlu jika state lain (misal: theme) berubah.
  const threads = useSelector((states) => states.threads || []);
  const users = useSelector((states) => states.users || []);
  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();

  // State lokal untuk filter kategori
  const [category, setCategory] = useState('');

  // Ambil data saat komponen pertama kali dimuat
  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  // Handler untuk menambah thread baru
  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
  };

  // Handler untuk mengubah filter kategori
  const onCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  // Buat daftar kategori unik dari data threads
  const categoryList = threads.map((thread) => thread.category);
  const uniqueCategories = [...new Set(categoryList)];

  // Filter threads berdasarkan kategori yang aktif, lalu gabungkan dengan data user
  const threadList = threads
    .filter((thread) => (category ? thread.category === category : true))
    .map((thread) => ({
      ...thread,
      user: users.find((user) => user.id === thread.ownerId),
      authUser: authUser.id,
    }));

  return (
    <section id="home-page-content">
      <NewThreadInput addThread={onAddThread} />

      <CategoryFilters
        categories={uniqueCategories}
        currentCategory={category}
        onCategoryChange={onCategoryChange}
      />

      <ThreadList threads={threadList} />
    </section>
  );
}

export default HomePage;