import { useMutation } from '@tanstack/react-query';

import type { IssueFormType } from '@/components/IssueForm';

export const updateIssue = async (id: number, data: IssueFormType) => {
  return fetch(`/api/issue/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

const useUpdateIssue = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: IssueFormType }) =>
      updateIssue(id, data),
    mutationKey: ['update-issue'],
  });
};

export default useUpdateIssue;
