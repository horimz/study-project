export const responseFormat = (content: {}) => {
  return {
    // TODO: change to time in millies
    transactionTime: new Date(),
    content
  };
};
