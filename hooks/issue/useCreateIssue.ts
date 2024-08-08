import { useMutation } from '@tanstack/react-query';

import type { IssueFormType } from '@/components/IssueForm';

export const createIssue = async (data: IssueFormType) => {
  return fetch('/api/issue', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

const useCreateIssue = () => {
  return useMutation({
    mutationFn: createIssue,
    mutationKey: ['create-issue'],
  });
};

export default useCreateIssue;
