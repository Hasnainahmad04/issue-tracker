import { IssueResponse, QueryParams } from "@/types";
import { Issue } from "@prisma/client";
import { headers } from "next/headers";

export const getIssues = async (params: QueryParams) => {
  const host = headers().get("host");
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
  const url = new URL(`${protocol}://${host}/api/issue`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, value.toString());
    }
  });

  const response = await fetch(url, { cache: "no-cache" });
  return (await response.json()) as IssueResponse;
};
