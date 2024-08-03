import { IssueForm } from "@/components/issue-form";
import { useMutation } from "@tanstack/react-query";

export const createIssue = async (data: IssueForm) => {
  return fetch("/api/issue", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const useCreateIssue = () => {
  return useMutation({
    mutationFn: createIssue,
    mutationKey: ["create-issue"],
  });
};

export default useCreateIssue;
