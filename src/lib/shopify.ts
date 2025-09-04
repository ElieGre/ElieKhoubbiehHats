import { GraphQLClient } from "graphql-request";

const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`;

export const shopify = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN!,
    "Content-Type": "application/json",
  },
});

export async function gql<T>(query: string, variables?: Record<string, any>) {
  return shopify.request<T>(query, variables);
}
