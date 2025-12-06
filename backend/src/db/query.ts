import { pool } from "./index";
import { QueryResult } from "pg";

export const query = async (
  text: string,
  params?: any[]
): Promise<QueryResult> => {
  return pool.query(text, params);
};
