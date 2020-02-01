import {HashPage} from 'modules/hash/components/HashPage';
import {NextPage} from 'next';

const Page: NextPage<{ algorithm }> = HashPage;
Page.getInitialProps = ({query: {algorithm}}) => {
  algorithm = (algorithm + '').replace(/[.]html$/, '');
  return {algorithm}
};
export default Page
