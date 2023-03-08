/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="text-center m-2">
      <img alt="My Manga Shelf Logo" src="/logo.png" width="300px" height="300px" />
      <h3 className="mt-3">Welcome, {user.displayName}!</h3>
      <button className="btn btn-blue" type="button" onClick={() => router.push('/series')}>
        Click here to check out your shelf
      </button>
    </div>
  );
}

export default Home;
