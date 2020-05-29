import React from 'react';

const DemoPageContent: React.FC = () => {
  return (
    <div className="red">
      Hello
      <style jsx>{`
        .red {
          color: red;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
};

const Page = () => {
  return (
    <div>
      <DemoPageContent />
    </div>
  );
};
export default Page;
