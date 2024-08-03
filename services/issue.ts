import { Issue } from "@prisma/client";
import { headers } from "next/headers";

export const getIssues = async () => {
  const host = headers().get("host");
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
  const url = new URL(`${protocol}://${host}/api/issue`);
  const response = await fetch(url, { cache: "no-store" });
  return (await response.json()) as Issue[];
};
