import { createServerFn } from "@tanstack/react-start";
import {
  fetchShopifyProducts as fetchShopifyProductsApi,
  fetchShopifyProductByHandle as fetchShopifyProductByHandleApi,
} from "./shopify";

export const fetchShopifyProducts = createServerFn({ method: "GET" }).handler(async () => {
  return fetchShopifyProductsApi();
});

export const fetchShopifyProductByHandle = createServerFn({ method: "GET" })
  .inputValidator((input: { handle: string }) => input)
  .handler(async ({ data }) => {
    return fetchShopifyProductByHandleApi(data.handle);
  });
