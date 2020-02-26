export const requestFormat = (content: {}) => {
  return {
    transactionTime: new Date(), // TODO: change to time in millies
    content
  };
};
