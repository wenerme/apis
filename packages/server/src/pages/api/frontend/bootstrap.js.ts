import { NextApiHandler } from 'next';

const code = `
System.import('single-spa')
  .then(({ registerApplication, start }) => {
      console.info('Initializing');

      registerApplication({
        name: '@wener/apis-test',
        app: () => System.import('@wener/apis-test'),
        activeWhen: ['/'],
      });

      start({
        urlRerouteOnly: true,
      });
    },
  );
`;

const handler: NextApiHandler = (req, res) => {
  res.status(200).setHeader('content-type', 'application/javascript');
  res.send(code);
};
export default handler;
