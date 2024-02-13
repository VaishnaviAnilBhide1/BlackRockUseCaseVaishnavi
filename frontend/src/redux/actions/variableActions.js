export const setVariable = (name, value) => ({
    type: 'SET_VARIABLE',
    payload: { name, value },
  });
  