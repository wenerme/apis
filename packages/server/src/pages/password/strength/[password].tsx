import { PasswordStrengthPage } from 'src/modules/password/components/PasswordStrengthPage';
import { NextPage } from 'next';

const Page: NextPage<{ initialValue }> = PasswordStrengthPage;
Page.getInitialProps = ({ query: { password: initialValue } }) => {
  return { initialValue: (initialValue + '').replace(/[.]html$/, '') };
};

export default Page;
