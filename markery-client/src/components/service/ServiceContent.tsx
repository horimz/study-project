import React, { useEffect } from 'react';
import { useFolder } from '../../modules/hooks';
import { useContent } from '../../modules/hooks';
import { useCustomLocation } from '../../modules/hooks';
import { RootState } from '../../modules/redux';
import { useSelector } from 'react-redux';
import { Content, ContentTypes } from './Content';
import './ServiceContent.scss';

interface ServiceContentProps {}

export const ServiceContent: React.FC<ServiceContentProps> = props => {
  const rootFolderId = useSelector((state: RootState) => state.rootFolderId);
  const { fetchRootFolderId } = useFolder();
  const { contents, fetchContents } = useContent();
  const { isServiceHome, folderId } = useCustomLocation();

  // Fetch contents when component mounts
  useEffect(() => {
    if (isServiceHome && !rootFolderId) {
      fetchRootFolderId();
    } else {
      if (isServiceHome && rootFolderId) {
        fetchContents(rootFolderId);
      } else {
        fetchContents(folderId);
      }
    }
  }, [fetchContents, fetchRootFolderId, isServiceHome, folderId, rootFolderId]);

  const renderContents = () => {
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
