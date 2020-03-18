import { keyframes } from "styled-components";

const animation = {
  fadeInFromBottom: keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }`,
  fadeOutToBottom: keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(30px);
  }`,
  scaleUp: keyframes`
  0%{
    opacity: 0;
    transform: scale(0);
  }
  100%{
    opacity: 1;
    transform: scale(1);
  }`,
  scaleDown: keyframes`
  0%{
    opacity: 1;
    transform: scale(1);
  }
  100%{
    opacity: 0;
    transform: scale(0);
  }`,
  scaleUpFromBottom: keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
    top: 60%;
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    top: 50%;
    box-shadow: 0 0 black;
  }
  `,
  scaleDownToBottom: keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    top: 50%;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
    top: 60%;
  }`,
  fadeIn: keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }`,
  fadeOut: keyframes`
    0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }`,
  scaleUpFromTopLeft: keyframes`
  0% {
    opacity: 0;
    transform: translate(-5px, 20px) scale(0);
  }
  100% {
    opacity: 1;
    transform: translate(-5px, 35px) scale(1);
  }`,
  scaleDownToTopLeft: keyframes`
  0% {
    opacity: 1;
    transform: translate(-5px, 35px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-5px, 20px) scale(0);;
  }`,
  moveInFromRight: keyframes`
  0% {
    transform: translateX(380px);
  }
  80% {
    transform: translateX(-25px);
  }
  100% {
    transform: translateX(0px);
  }
  `,
  moveInToRight: keyframes`  
  0% {
    transform: translateX(0px);
  }
  20% {
    transform: translateX(-25px);
  }
  100% {
    transform: translateX(380px);
  }`,
  shrink: keyframes`
  0% {
    transform: translateX(380px);
  }
  100% {
    transform: translateX(380px);
    height: 0;
    margin: 0;
    padding: 0;
  }`
};

export { animation };
