import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  throw new Error("SANITY_API_TOKEN is missing in environment variables.");
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});