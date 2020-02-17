import {createScelDataService, ScelMetadata} from 'libs/sougou/dict/ScelDataService';
import {NextPage} from 'next';
import {ScelDictPage} from 'modules/scel/components/ScelDictPage';

const Page: NextPage<{ dictId, dictVersion?, metadata: ScelMetadata }> = ScelDictPage;

Page.getInitialProps = async ({query: {dictId, dictVersion}}) => {
  if (dictVersion) {
    dictVersion = (dictVersion + '').replace('.html', '');
  }
  const service = createScelDataService();
  const metadata = await service.getMetadata({id: dictId, version: dictVersion});
  return {dictId, dictVersion, metadata}
};

// async function getMetadata({id, version}): Promise<ScelMetadata> {
//   const index = require('public/data/scel/index.full.json');
//   const idx = sortedIndexBy(index, {id, version} as any, v => v.id);
//
//   let metadata = index[idx];
//   if (!metadata) {
//     const service = createScelDataService();
//     metadata = await service.getMetadata({id, version})
//   }
//   return metadata;
// }

// export async function getStaticProps({params: {dictId, dictVersion}}) {
//   if (dictVersion) {
//     dictVersion = (dictVersion + '').replace('.html', '');
//   }
//   if (dictVersion) {
//     dictVersion = (dictVersion + '').replace('.html', '');
//   }
//
//   const metadata = await getMetadata({id: dictId, version: dictVersion});
//   return {props: {dictId, dictVersion, metadata}}
// }
//
// export async function getStaticPaths() {
//   const service = createScelDataService();
//   const index = await service.getIndex();
//
//   return index.map(data => ({params: {dictId: String(data.id), dictVersion: String(data.version)}}));
//   // return [{params: {dictId: '1', dictVersion: '24'}}];
// }

// export const unstable_getStaticProps = getStaticProps;
// export const unstable_getStaticPaths = getStaticPaths;

export default Page
