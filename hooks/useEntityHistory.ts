import { useEffect } from 'react';
import { localStorageHelper } from '../store';

export default function useEntityHistory(callback: (result: any) => void, entity_id: string) {
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorageHelper.getAccessToken();
      if (!accessToken) {
        callback(null);
        return;
      }
      const result = await fetch(`/api/history/period?filter_entity_id=${entity_id}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((res: any) => res.json());

      callback(result);
    };
    fetchData();
  }, [entity_id]);
}
