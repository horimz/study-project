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
    z-index: -1;
    transform: translateY(30px);
  }`
};

export { animation };
