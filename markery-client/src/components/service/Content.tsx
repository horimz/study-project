import React from 'react';
import { ContentFolder } from './ContentFolder';
import { ContentUrl } from './ContentUrl';

export enum ContentTypes {
  folder,
  url
}

type ContentType = ContentTypes;

interface ContentProps {
  type: ContentType | undefined;
  content: any;
}

export const Content: React.FC<ContentProps> = ({ type, content }) => {
  switch (type) {
    case ContentTypes.folder:
      return <ContentFolder folder={content} />;
    case ContentTypes.url:
      return <ContentUrl url={content} />;
    default:
      throw new Error('Unexpected content type.');
  }
};
