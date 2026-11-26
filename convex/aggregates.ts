import { TableAggregate } from "@convex-dev/aggregate";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";

export const ordersAggregate = new TableAggregate<{
  Key: [string, string];
  DataModel: DataModel;
  TableName: "orders";
}>(components.ordersAggregate, {
  sortKey: (doc) => [doc.mode, doc.status],
  sumValue: (doc) => (doc.status === "paid" ? doc.amountMinor : 0),
});
export const inquiriesAggregate = new TableAggregate<{
  Key: [string, string];
  DataModel: DataModel;
  TableName: "inquiries";
}>(components.inquiriesAggregate, {
  sortKey: (doc) => [doc.kind, doc.status],
});
