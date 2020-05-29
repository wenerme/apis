import React from 'react';

const NotFoundPageContent: React.FC = () => {
  return <div>Page Not Found</div>;
};

const Page = () => {
  return (
    <div>
      <NotFoundPageContent />
    </div>
  );
};
export default Page;
