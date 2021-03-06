import { HashPage } from '../../../../modules/crypto/components/HashPage';
import { NextPage } from 'next';
import { fetchHashing } from '../../../../modules/crypto/apis/fetchs';
import { firstOfMaybeArray } from '@wener/utils';

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
