export const responseFormat = (content: {}) => {
  return {
    transactionTime: new Date().toString(), // TODO: change to time in millies
    content
  };
};
