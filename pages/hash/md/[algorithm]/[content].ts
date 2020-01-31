import {HashPage} from 'modules/hash/components/HashPage';
import {NextPage} from 'next';
import {fetchHashing} from 'modules/hash/apis/fetchs';

const Page: NextPage<{ algorithm, content }> = HashPage;
Page.getInitialProps = async ({query: {algorithm, content: rawContent}}) => {
  const content = (rawContent + '').replace(/[.]html$/, '');
  const data = await fetchHashing({algorithm, content});
  return {algorithm, content, initialData: data}
};
export default Page
