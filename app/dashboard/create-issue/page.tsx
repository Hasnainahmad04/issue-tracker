import IssueForm from "@/components/issue-form";
import React from "react";

const CreateIssueRoute = () => {
  return (
    <div className="max-w-screen-sm mx-auto flex justify-center flex-col space-y-6 py-10 px-4 md:px-0">
      <h3 className="text-2xl font-semibold tracking-tight">Create Issue</h3>
      <IssueForm />
    </div>
  );
};

export default CreateIssueRoute;
