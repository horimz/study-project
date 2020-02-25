import { useLocation } from 'react-router-dom';

// Url Format
// '/service'
// '/service/show-{folderName}-{folderId}'

export const useCustomLocation = () => {
  const { pathname } = useLocation();

  const path = pathname.substring(
    pathname.lastIndexOf('/') + 1,
    pathname.length
  );

  let [location, folderName, folderId] = path.split('-');
  const isServiceHome = folderId === undefined;
  const isValidPath = location === 'service' || location === 'show';

  return {
    folderName,
    folderId,
    isServiceHome,
    isValidPath
  };
};
