export const getAxiosCallMock = jest.fn()
const axios = {
  get: getAxiosCallMock
};

export default axios;
