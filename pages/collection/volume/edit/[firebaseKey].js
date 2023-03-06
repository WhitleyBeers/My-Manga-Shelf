import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSingleVolume } from '../../../../api/series_volumeData';
import CollectionVolumeForm from '../../../../components/forms/CollectionVolumeForm';

export default function EditCollectionVolume() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleVolume(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <CollectionVolumeForm obj={editItem} />
  );
}
