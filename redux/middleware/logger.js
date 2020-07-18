const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('Action: ', action.type);
  const returnValue = next(action);
  console.log('Next state', store.getState());
  console.groupEnd();
  return returnValue;
};
export default logger;
