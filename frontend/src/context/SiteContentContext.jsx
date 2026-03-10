import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchSiteContent } from '../services/api';

const SiteContentContext = createContext({});

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    fetchSiteContent()
      .then((data) => {
        const map = {};
        data.forEach((item) => {
          map[item.key] = item.value;
        });
        setContent(map);
      })
      .catch(() => {
        // API kapalıysa fallback değerler kullanılacak
      });
  }, []);

  const c = useCallback(
    (key, fallback = '') => content[key] || fallback,
    [content]
  );

  return (
    <SiteContentContext.Provider value={c}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
