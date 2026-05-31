import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import rawSiteData from '../../../site-data.txt?raw';

const defaultSiteData = JSON.parse(rawSiteData);
const DOC_URL = 'https://docs.google.com/document/d/1PQPSrYLOcTufFUPSJMUc_KSLquuHyOqNICzioc0A2ws/export?format=txt';

const SiteContext = createContext(defaultSiteData);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [siteData, setSiteData] = useState(defaultSiteData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(DOC_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        
        // Find the first { and last } to extract only the JSON part
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        
        if (start !== -1 && end !== -1) {
          const cleanText = text.substring(start, end + 1);
          const json = JSON.parse(cleanText);
          setSiteData(json);
        } else {
          throw new Error('No valid JSON found in the document');
        }
      } catch (error) {
        console.error('Error fetching site data from Google Doc:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SiteContext.Provider value={siteData}>
      {children}
    </SiteContext.Provider>
  );
}

export const useSiteData = () => useContext(SiteContext);

// Keep the default export for backward compatibility during transition if needed, 
// but we'll move everyone to the hook.
export default defaultSiteData;
