import React from "react";
import styled from "styled-components";
import { palette, media } from "../../lib/styles";
import { Link } from "react-router-dom";

const MainPostsBlock = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 320px);
  grid-gap: 5rem;
  cursor: pointer;
  ${media.medium} {
    grid-template-columns: 1fr;
  }
  ${media.small} {
    grid-template-columns: 1fr;
  }
`;

const MainPostCard = styled.div`
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid ${palette.border};
  background-color: white;
  overflow: hidden;
  margin: 0;
  transition: box-shadow 0.15s linear 0s, transform 0.15s linear 0s;
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 12px 20px 0px;
  }
  &:hover .backdrop-thumbnail {
    background-color: transparent;
  }
  &:active {
    transform: translate3d(0px, -6px, 0px);
  }
`;

const MainPostImageBox = styled.div`
  display: flex;
  width: 100%;
  height: 185px;
  position: relative;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
  .backdrop-thumbnail {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.35);
  }
`;

const MainPostContentBox = styled.div`
  padding: 2.25rem;
  span {
    color: ${palette.grey6};
    font-size: 1.2rem;
  }
  div {
    margin-top: 2.5rem;
  }
`;

const MainPostDescriptionBox = styled.div`
  display: flex;
  padding: 1rem 2.25rem;
  align-items: center;
  cursor: pointer;
  border-top: 1px solid rgb(217, 227, 237);
  font-weight: 400;
  transition: all 0.1s linear;
  &:hover {
    color: ${palette.grey6};
  }
  span {
    margin-left: 1rem;
  }
`;

const MainPostUserProfile = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: 50%;
    margin-right: 1rem;
  }
`;

interface MainPostsProps {
  thumbnail?: string;
  title?: string;
  publishedData?: string;
  body?: string;
}

const dummyData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MainPosts: React.FC<MainPostsProps> = props => {
  const renderPosts = () => {
    return dummyData.map((el: any, i: number) => {
      return (
        <div id={el}>
          <MainPostCard>
            <Link to='/@username/postId'>
              <MainPostImageBox>
                <div className='backdrop-thumbnail'></div>
              </MainPostImageBox>
              <MainPostContentBox>
                <h2>What is Koa?</h2>
                <span>march 22, 2020</span>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta eius tempora minima facere perspiciatis, alias dicta
                  rem molestiae praesentium aspernatur ut itaque atque quibusdam
                  quisquam quas! Laboriosam vero veniam ducimus.
                </div>
              </MainPostContentBox>
            </Link>
            <Link to='/@username'>
              <MainPostDescriptionBox>
                <MainPostUserProfile></MainPostUserProfile>
                <span>
                  by&nbsp;<b>horimz</b>
                </span>
              </MainPostDescriptionBox>
            </Link>
          </MainPostCard>
        </div>
      );
    });
  };
  return <MainPostsBlock>{renderPosts()}</MainPostsBlock>;
};

export { MainPosts };
