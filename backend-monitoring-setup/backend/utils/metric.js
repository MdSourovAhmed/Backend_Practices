const client = require("prom-client");

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const metrics = {
  totalOrders: new client.Gauge({ name: "app_total_orders", help: "Total number of orders" }),
  totalRevenue: new client.Gauge({ name: "app_total_revenue_usd", help: "Total revenue in USD" }),
  ordersByStatus: new client.Gauge({
    name: "app_orders_by_status",
    help: "Orders by status",
    labelNames: ["status"],
  }),
};

Object.values(metrics).forEach((m) => register.registerMetric(m));

module.exports = { metrics, register };
