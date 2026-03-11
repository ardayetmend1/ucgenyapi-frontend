import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchSiteContent } from '../services/api';

const SiteContentContext = createContext({});
const SiteContentReloadContext = createContext(() => {});

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState({});

  const load = useCallback(() => {
    fetchSiteContent()
      .then((data) => {
        const map = {};
        data.forEach((item) => {
          map[item.key] = item.value;
        });
        setContent(map);
      })
      .catch(() => {});
  }, []);

  useEffect(() => { load(); }, [load]);

  const c = useCallback(
    (key, fallback = '') => content[key] || fallback,
    [content]
  );

  return (
    <SiteContentContext.Provider value={c}>
      <SiteContentReloadContext.Provider value={load}>
        {children}
      </SiteContentReloadContext.Provider>
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}

export function useSiteContentReload() {
  return useContext(SiteContentReloadContext);
}
