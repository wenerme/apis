import {HashPage} from 'modules/hash/components/HashPage';
import {NextPage} from 'next';
import {fetchHashing} from 'modules/hash/apis/fetchs';

const Page: NextPage<{ algorithm, content?, initialData? }> = HashPage;
Page.getInitialProps = async ({query: {algorithm, content}}) => {
  algorithm = (algorithm + '').replace(/[.]html$/, '');
  if (!content) {
    return {algorithm}
  }
  content = (content + '').replace(/[.]html$/, '');
  const data = await fetchHashing({algorithm, content});
  return {algorithm, content, initialData: data}
};
export default Page
