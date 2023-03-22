/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="text-center m-2">
      <Head>
        <title>My Manga Shelf</title>
      </Head>
      <h1 className="mt-2 mb-3">Welcome, {user.displayName}!</h1>
      <div className="mb-3">
        <button className="btn btn-home p-3 me-2" type="button" onClick={() => router.push('/collection')}>
          <img src="/Shelf.png" alt="shelf logo" />
          <h4 className="mt-2">Collection</h4>
        </button>
        <button className="btn btn-home p-3 ms-2" type="button" onClick={() => router.push('/wishlist')}>
          <img src="/Wishlist.png" alt="wishlist logo" />
          <h4 className="mt-2">Wishlist</h4>
        </button>
      </div>
      <div className="mt-3 mb-3">
        <button className="btn btn-home p-3 me-2" type="button" onClick={() => router.push('/series')}>
          <img src="/allseries.png" alt="all series logo" style={{ height: '100px', width: '100px' }} />
          <h4 className="mt-2">All Series</h4>
        </button>
        <button className="btn btn-home p-3 ms-2" type="button" onClick={() => router.push('/series/newSeries')}>
          <img src="/add.png" alt="new series logo" style={{ height: '90px', width: '90px' }} />
          <h4 className="mt-2">Add Series</h4>
        </button>
      </div>
      <div className="mt-3 mb-3">
        <button className="btn btn-home p-3 me-2" type="button" onClick={() => router.push('/recommendation')}>
          <img src="/recommend.png" alt="recommendations logo" style={{ height: '90px', width: '90px' }} />
          <h4 className="mt-2">Similar Manga</h4>
        </button>
        <button className="btn btn-home p-3 ms-2" type="button" onClick={() => router.push('/profile')}>
          <img src="/profile.png" alt="profile logo" />
          <h4 className="mt-2">Profile</h4>
        </button>
      </div>
    </div>
  );
}

export default Home;
