import React from "react";
import styled from "styled-components";
import { palette, boxShadow, TagColorMap } from "../../lib/styles";
import { FiLink, FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const UrlBlock = styled.div`
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: ${TagColorMap.lightBlue.backgroundColor};
  color: ${TagColorMap.lightBlue.color};
  border-radius: 8px;
  ${boxShadow.segmentBox}
  border: 1px solid ${palette.grey2};
  cursor: pointer;
  transition: all 0.2s;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
  &:hover {
    transform: scale(1.02);
  }
`;

const UrlTopBlock = styled.div`
  display: flex;
  a {
    width: 100%;
    display: flex;
    align-items: center;
  }
  &:hover .url__trash-icon {
    color: ${TagColorMap.lightBlue.color};
  }
  &:hover .url__edit-icon {
    color: ${TagColorMap.lightBlue.color};
  }
`;

const UrlNameBlock = styled.div`
  flex: 1 0;
  display: flex;
  align-items: center;
  .url__url-icon {
    font-size: 2rem;
    margin-right: 1rem;
  }
`;

const UrlRightBlock = styled.div`
  justify-self: flex-end;
  .url__actions {
    font-size: 1.75rem;
    display: flex;
    align-items: center;
  }
  .url__action {
    padding: 0.75rem;
    border-radius: 8px;
    transition: all 0.2s;
    &:hover {
      background-color: ${palette.grey0};
    }
  }
  .url__trash-icon {
    color: transparent;
    display: flex;
    align-items: center;
  }
  .url__edit-icon {
    color: transparent;
    display: flex;
    align-items: center;
  }
`;

interface UrlProps {}

const Url: React.FC<UrlProps> = props => {
  return (
    <UrlBlock>
      <UrlTopBlock>
        <Link to='/'>
          <UrlNameBlock>
            <FiLink className='url__url-icon' />
            <b>Url alias</b>
          </UrlNameBlock>
        </Link>
        <UrlRightBlock>
          <div className='url__actions'>
            <div className='url__action'>
              <FaRegTrashAlt className='url__trash-icon' />
            </div>
            <div className='url__action'>
              <FiEdit className='url__edit-icon' />
            </div>
          </div>
        </UrlRightBlock>
      </UrlTopBlock>
    </UrlBlock>
  );
};

export { Url };
