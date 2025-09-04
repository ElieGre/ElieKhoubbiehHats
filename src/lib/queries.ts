export const GET_PRODUCTS = /* GraphQL */ `
  query Products($first: Int = 12) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          featuredImage { url altText }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }
  }
`;
