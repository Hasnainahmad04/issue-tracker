import { useMutation } from '@tanstack/react-query';

export const updateIssue = async (id: number) => {
  return fetch(`/api/issue/${id}`, {
    method: 'DELETE',
  });
};

const useDeleteIssue = () => {
  return useMutation({
    mutationFn: updateIssue,
    mutationKey: ['delete-issue'],
  });
};

export default useDeleteIssue;
