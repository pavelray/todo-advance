import { createUserMutation, getUserQuery } from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAPHBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAPHBASE_API_KEY || ""
  : "letmein";
const serverUrl = isProduction
  ? process.env.NEXTAUTH_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};

export const getUser = (email) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name, email, imageUrl) => {
  const variables = {
    input: {
      name,
      email,
      imageUrl,
    },
  };
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(createUserMutation, variables);
};
