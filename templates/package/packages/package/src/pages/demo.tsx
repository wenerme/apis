import React from 'react';

const DemoPageContent: React.FC = () => {
  return <div>Content</div>;
};

const Page = () => {
  return (
    <div className="layout">
      <DemoPageContent />
    </div>
  );
};
export default Page;
