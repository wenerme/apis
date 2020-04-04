import { HashPage } from 'src/modules/hash/components/HashPage';
import { NextPage } from 'next';
import { fetchHashing } from 'src/modules/hash/apis/fetchs';
import { firstOfMaybeArray } from '@wener/utils/src';

const Page: NextPage<{ algorithm; content?; initialData? }> = HashPage;
Page.getInitialProps = async ({ query: { algorithm, content } }) => {
  algorithm = firstOfMaybeArray(algorithm)?.replace(/[.]html$/, '') || 'md5';
  if (algorithm === 'index') {
    algorithm = 'md5';
  }
  if (!content) {
    return { algorithm };
  }
  content = (content + '').replace(/[.]html$/, '');
  const data = await fetchHashing({ algorithm, content });
  return { algorithm, content, initialData: data };
};
export default Page;
