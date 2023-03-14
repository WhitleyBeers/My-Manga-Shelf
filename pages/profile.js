import Head from 'next/head';
import React from 'react';
import UserProfile from '../components/UserProfile';

export default function ProfileView() {
  return (
    <>
      <Head>
        <title>My Profile</title>
      </Head>
      <UserProfile />
    </>
  );
}
