export const formatRequest = (content: {}) => {
  return {
    transactionTime: new Date(),
    content
  };
};
