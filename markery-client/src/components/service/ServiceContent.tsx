import React, { useEffect } from 'react';
import {
  useFolder,
  useContent,
  useCustomLocation,
  useSelectedContent
} from '../../modules/hooks';
import { RootState } from '../../modules/redux';
import { useSelector } from 'react-redux';
import { Content, ContentTypes } from './Content';
import { NoContents } from './NoContents';
import './ServiceContent.scss';

interface ServiceContentProps {}

export const ServiceContent: React.FC<ServiceContentProps> = props => {
  const rootFolderId = useSelector((state: RootState) => state.rootFolderId);
  const { fetchRootFolderId } = useFolder();
  const { contents, fetchContents, resetContentsArray } = useContent();
  const { isServiceHome, folderId } = useCustomLocation();
  const { resetContents } = useSelectedContent();

  // Fetch contents when component mounts
  useEffect(() => {
    // Set contents array to null
    resetContentsArray();

    // Reset selected contents
    resetContents();
    if (isServiceHome && !rootFolderId) {
      fetchRootFolderId();
    } else {
      if (isServiceHome && rootFolderId) {
        fetchContents(rootFolderId);
      } else {
        fetchContents(folderId);
      }
    }
  }, [
    fetchContents,
    fetchRootFolderId,
    isServiceHome,
    folderId,
    rootFolderId,
    resetContentsArray,
    resetContents
  ]);

  const renderContents = () => {
    if (contents === null) return null;
    if (contents.length === 0) return <NoContents />;

    // TODO: Fix unexpected behavior (contents are sorted by time but they do not render in order)
    // console.log(contents);
    return contents.map((content: any) => {
      let contentType;

      if (content.folderName) contentType = ContentTypes.folder;
      else if (content.url) contentType = ContentTypes.url;

      return (
        <div key={content._id} className='service-content__box'>
          <Content type={contentType} content={content} />
        </div>
      );
    });
  };

  return (
    <div className='service-content'>
      <div className='service-content__container'>{renderContents()}</div>
    </div>
  );
};
