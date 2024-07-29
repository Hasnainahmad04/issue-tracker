import { createIssue } from "@/services/issue";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

const useCreateIssue = () => {
  return useMutation({
    mutationFn: createIssue,
    mutationKey: ["create-issue"],
  });
};

export default useCreateIssue;
