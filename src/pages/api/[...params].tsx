import { handleRequest } from '../../servers/routers/handleRequest';

export default handleRequest;
export const config = {
  api: {
    bodyParser: false,
  },
};
