import { handleRequest } from 'src/servers/routers/handleRequest';

export default handleRequest;
export const config = {
  api: {
    bodyParser: false,
  },
};
