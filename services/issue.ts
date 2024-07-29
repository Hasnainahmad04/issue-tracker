import { IssueForm } from "@/components/issue-form";

export const createIssue = (data: IssueForm) => {
  return fetch("/api/issue", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
