import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleVolume } from '../../../api/series_volumeData';
import EditVolumeForm from '../../../components/forms/EditVolumeForm';

export default function EditVolume() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleVolume(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <div><EditVolumeForm obj={editItem} /></div>
  );
}
