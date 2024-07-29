import IssueForm from "@/components/issue-form";
import React from "react";

const CreateIssueRoute = () => {
  return (
    <div className="max-w-screen-sm mx-auto flex justify-center flex-col space-y-6 p-4 rounded my-6 border bg-neutral-50">
      <h3 className="text-xl font-semibold tracking-tight">Create Issue</h3>
      <IssueForm />
    </div>
  );
};

export default CreateIssueRoute;
