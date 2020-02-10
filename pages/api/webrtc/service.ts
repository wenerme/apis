import {NextApiRequest, NextApiResponse} from 'next';
import {handleErrors} from 'libs/nexts/middlewares/errors';
import {flow} from 'lodash';
import {ServiceInvocation} from 'apis/services/types';
import {createPeerServiceRegistry} from 'modules/webrtc/services';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const registry = await createPeerServiceRegistry();

  let invocation: ServiceInvocation;
  if (typeof req.body === 'string') {
    invocation = JSON.parse(req.body)
  } else {
    invocation = req.body
  }

  // console.log(`Handle invoke`, invocation, req.body, req.query);
  const response = await registry.invoke(invocation);
  res
    .status(200)
    .json(response)
};


export default flow([handleErrors()])(handler)
// export default handler
