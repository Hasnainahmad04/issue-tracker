import { useMutation } from '@tanstack/react-query';

import type { IssueFormType } from '@/components/IssueForm';

type IssueWithoutAsset = Omit<IssueFormType, 'assets'>;

export const updateIssue = async (id: number, data: IssueWithoutAsset) => {
  return fetch(`/api/issue/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

const useUpdateIssue = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: IssueWithoutAsset }) =>
      updateIssue(id, data),
    mutationKey: ['update-issue'],
  });
};

export default useUpdateIssue;
