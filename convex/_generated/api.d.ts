/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as aggregates from "../aggregates.js";
import type * as auth from "../auth.js";
import type * as authz from "../authz.js";
import type * as http from "../http.js";
import type * as ingest from "../ingest.js";
import type * as packages from "../packages.js";
import type * as setup from "../setup.js";
import type * as validators from "../validators.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  aggregates: typeof aggregates;
  auth: typeof auth;
  authz: typeof authz;
  http: typeof http;
  ingest: typeof ingest;
  packages: typeof packages;
  setup: typeof setup;
  validators: typeof validators;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  ordersAggregate: import("@convex-dev/aggregate/_generated/component.js").ComponentApi<"ordersAggregate">;
  inquiriesAggregate: import("@convex-dev/aggregate/_generated/component.js").ComponentApi<"inquiriesAggregate">;
};
