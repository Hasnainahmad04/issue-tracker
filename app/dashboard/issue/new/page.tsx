import React from 'react';

import IssueForm from '@/components/issue-form';

const CreateIssueRoute = () => {
  return (
    <div className="mx-auto my-6 flex max-w-screen-sm flex-col justify-center space-y-6 rounded border bg-neutral-50 p-4">
      <h3 className="text-xl font-semibold tracking-tight">Create Issue</h3>
      <IssueForm />
    </div>
  );
};

export default CreateIssueRoute;
