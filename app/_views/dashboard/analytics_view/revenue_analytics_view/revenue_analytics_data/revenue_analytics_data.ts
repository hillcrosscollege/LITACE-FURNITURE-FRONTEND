import {
  RevenueStats,
  RevenueSummaryRow,
  RevenueSource,
  DailyRevenue,
  TopRevenueProduct,
  RevenueComparison,
  Insight,
} from "../revenue_analytics_types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fakeRevenueStats: RevenueStats = {
  totalRevenue: { value: 18450000, change: 12.5, direction: "up" },
  netRevenue: { value: 16780000, change: 11.4, direction: "up" },
  avgOrderValue: { value: 148000, change: 3.4, direction: "up" },
  grossMargin: { value: 42.6, change: 1.2, direction: "up" },
  refunds: { value: 420000, change: 5.2, direction: "down" },
  discountsGiven: { value: 1250000, change: 3.6, direction: "down" },
};

export const fakeRevenueSummary: RevenueSummaryRow[] = [
  {
    metric: "Total Revenue",
    thisPeriod: "R18,450,000",
    previousPeriod: "R16,400,000",
    change: "↑ 12.5%",
    direction: "up",
  },
  {
    metric: "Net Revenue",
    thisPeriod: "R16,780,000",
    previousPeriod: "R15,080,000",
    change: "↑ 11.3%",
    direction: "up",
  },
  {
    metric: "Discounts Given",
    thisPeriod: "R1,250,000",
    previousPeriod: "R1,050,000",
    change: "↑ 19.0%",
    direction: "up",
  },
  {
    metric: "Refunds",
    thisPeriod: "R420,000",
    previousPeriod: "R380,000",
    change: "↑ 10.5%",
    direction: "up",
  },
  {
    metric: "Shipping Revenue",
    thisPeriod: "R980,000",
    previousPeriod: "R980,000",
    change: "↑ 10.1%",
    direction: "up",
  },
  {
    metric: "Average Order Value",
    thisPeriod: "R148,000",
    previousPeriod: "R142,600",
    change: "↑ 3.8%",
    direction: "up",
  },
];

export const fakeRevenueSources: RevenueSource[] = [
  {
    source: "Website Orders",
    revenue: 14300000,
    orders: 842,
    pctOfTotal: 77.6,
    change: 10.2,
    direction: "up",
  },
  {
    source: "Manual Orders",
    revenue: 2150000,
    orders: 156,
    pctOfTotal: 11.7,
    change: 6.3,
    direction: "up",
  },
  {
    source: "Phone Orders",
    revenue: 1250000,
    orders: 68,
    pctOfTotal: 6.8,
    direction: "up",
    change: 4.1,
  },
  {
    source: "Other",
    revenue: 750000,
    orders: 32,
    pctOfTotal: 4.1,
    change: 2.8,
    direction: "up",
  },
];

export const fakeDailyRevenue: DailyRevenue[] = [
  {
    date: "18 May 2024",
    orders: 98,
    grossRevenue: 2120000,
    discounts: 150000,
    refunds: 20000,
    shippingRevenue: 110000,
    netRevenue: 1930000,
    orderRows: [
      {
        id: "#FC12435",
        customer: "John Doe",
        amount: 250000,
        discount: 15000,
        refund: 0,
        shipping: 15000,
        net: 230000,
      },
      {
        id: "#FC12434",
        customer: "Jane Smith",
        amount: 180000,
        discount: 10000,
        refund: 0,
        shipping: 15000,
        net: 185000,
      },
      {
        id: "#FC12437",
        customer: "Michael Brown",
        amount: 420000,
        discount: 20000,
        refund: 0,
        shipping: 15000,
        net: 380000,
      },
      {
        id: "#FC12438",
        customer: "Emily Davis",
        amount: 95000,
        discount: 5000,
        refund: 0,
        shipping: 15000,
        net: 85000,
      },
    ],
  },
  {
    date: "17 May 2024",
    orders: 112,
    grossRevenue: 2150000,
    discounts: 160000,
    refunds: 30000,
    shippingRevenue: 120000,
    netRevenue: 1980000,
    orderRows: [
      {
        id: "#FC12430",
        customer: "Daniel Wilson",
        amount: 210000,
        discount: 12000,
        refund: 0,
        shipping: 15000,
        net: 198000,
      },
      {
        id: "#FC12429",
        customer: "Sarah Johnson",
        amount: 540000,
        discount: 25000,
        refund: 0,
        shipping: 15000,
        net: 510000,
      },
    ],
  },
  {
    date: "16 May 2024",
    orders: 105,
    grossRevenue: 2430000,
    discounts: 140000,
    refunds: 30000,
    shippingRevenue: 130000,
    netRevenue: 2260000,
    orderRows: [],
  },
  {
    date: "15 May 2024",
    orders: 89,
    grossRevenue: 1950000,
    discounts: 120000,
    refunds: 40000,
    shippingRevenue: 110000,
    netRevenue: 1780000,
    orderRows: [],
  },
  {
    date: "14 May 2024",
    orders: 95,
    grossRevenue: 2100000,
    discounts: 110000,
    refunds: 40000,
    shippingRevenue: 120000,
    netRevenue: 1930000,
    orderRows: [],
  },
];

export const fakeTopRevenueProducts: TopRevenueProduct[] = [
  {
    id: "1",
    name: "Modern L-Shaped Sofa",
    image: "/conference_chair-2.png",
    revenue: 2450000,
    orders: 128,
    unitsSold: 128,
    pctOfTotal: 13.3,
    performance: [
      {
        metric: "Revenue",
        thisPeriod: "R2,450,000",
        previousPeriod: "R2,100,000",
        change: "↑ 16.7%",
        direction: "up",
      },
      {
        metric: "Orders",
        thisPeriod: "128",
        previousPeriod: "105",
        change: "↑ 21.9%",
        direction: "up",
      },
      {
        metric: "Units Sold",
        thisPeriod: "128",
        previousPeriod: "105",
        change: "↑ 21.9%",
        direction: "up",
      },
      {
        metric: "Average Price",
        thisPeriod: "R19,140",
        previousPeriod: "R20,000",
        change: "↓ 4.3%",
        direction: "down",
      },
    ],
  },
  {
    id: "2",
    name: "Wooden Dining Set",
    image: "/conference_chair-2.png",
    revenue: 1860000,
    orders: 96,
    unitsSold: 96,
    pctOfTotal: 10.1,
    performance: [
      {
        metric: "Revenue",
        thisPeriod: "R1,860,000",
        previousPeriod: "R1,700,000",
        change: "↑ 9.4%",
        direction: "up",
      },
      {
        metric: "Orders",
        thisPeriod: "96",
        previousPeriod: "88",
        change: "↑ 9.1%",
        direction: "up",
      },
      {
        metric: "Units Sold",
        thisPeriod: "96",
        previousPeriod: "88",
        change: "↑ 9.1%",
        direction: "up",
      },
      {
        metric: "Average Price",
        thisPeriod: "R19,375",
        previousPeriod: "R19,318",
        change: "↑ 0.3%",
        direction: "up",
      },
    ],
  },
  {
    id: "3",
    name: "Luxury Wooden Bed",
    image: "/conference_chair-2.png",
    revenue: 1650000,
    orders: 72,
    unitsSold: 72,
    pctOfTotal: 8.9,
    performance: [
      {
        metric: "Revenue",
        thisPeriod: "R1,650,000",
        previousPeriod: "R1,500,000",
        change: "↑ 10.0%",
        direction: "up",
      },
      {
        metric: "Orders",
        thisPeriod: "72",
        previousPeriod: "65",
        change: "↑ 10.8%",
        direction: "up",
      },
      {
        metric: "Units Sold",
        thisPeriod: "72",
        previousPeriod: "65",
        change: "↑ 10.8%",
        direction: "up",
      },
      {
        metric: "Average Price",
        thisPeriod: "R22,917",
        previousPeriod: "R23,077",
        change: "↓ 0.7%",
        direction: "down",
      },
    ],
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    image: "/conference_chair-2.png",
    revenue: 950000,
    orders: 54,
    unitsSold: 54,
    pctOfTotal: 5.2,
    performance: [
      {
        metric: "Revenue",
        thisPeriod: "R950,000",
        previousPeriod: "R880,000",
        change: "↑ 8.0%",
        direction: "up",
      },
      {
        metric: "Orders",
        thisPeriod: "54",
        previousPeriod: "50",
        change: "↑ 8.0%",
        direction: "up",
      },
      {
        metric: "Units Sold",
        thisPeriod: "54",
        previousPeriod: "50",
        change: "↑ 8.0%",
        direction: "up",
      },
      {
        metric: "Average Price",
        thisPeriod: "R17,592",
        previousPeriod: "R17,600",
        change: "↓ 0.0%",
        direction: "down",
      },
    ],
  },
  {
    id: "5",
    name: "Marble Coffee Table",
    image: "/conference_chair-2.png",
    revenue: 750000,
    orders: 48,
    unitsSold: 48,
    pctOfTotal: 4.1,
    performance: [
      {
        metric: "Revenue",
        thisPeriod: "R750,000",
        previousPeriod: "R700,000",
        change: "↑ 7.1%",
        direction: "up",
      },
      {
        metric: "Orders",
        thisPeriod: "48",
        previousPeriod: "45",
        change: "↑ 6.7%",
        direction: "up",
      },
      {
        metric: "Units Sold",
        thisPeriod: "48",
        previousPeriod: "45",
        change: "↑ 6.7%",
        direction: "up",
      },
      {
        metric: "Average Price",
        thisPeriod: "R15,625",
        previousPeriod: "R15,556",
        change: "↑ 0.4%",
        direction: "up",
      },
    ],
  },
];

export const fakeRevenueComparison: RevenueComparison = {
  thisLabel: "This Month (12 May – 18 May)",
  thisValue: 16450000,
  lastLabel: "Last Month (5 May – 11 May)",
  lastValue: 16400000,
  changePct: 12.5,
};

export const fakeInsights: Insight[] = [
  {
    id: "1",
    type: "up",
    title: "Revenue is up by 12.5%",
    detail: "You earned R2,050,000 more than last week.",
  },
  {
    id: "2",
    type: "up",
    title: "Average order value increased",
    detail: "AOV is up by 3.4% compared to last week.",
  },
  {
    id: "3",
    type: "down",
    title: "Refunds increased by 10.5%",
    detail: "You issued R40,000 more in refunds.",
  },
];

export const revenueAnalyticsApi = {
  getRevenueAnalytics: async () => {
    await delay(1100);
    return {
      stats: fakeRevenueStats,
      summary: fakeRevenueSummary,
      sources: fakeRevenueSources,
      dailyRevenue: fakeDailyRevenue,
      topProducts: fakeTopRevenueProducts,
      comparison: fakeRevenueComparison,
      insights: fakeInsights,
    };
  },

  exportReport: async (format: string, includes: string[]): Promise<void> => {
    await delay(900);
    console.log("Export revenue analytics:", { format, includes });
  },

  comparePeriod: async (
    compareWith: string,
    previousRange: string,
    currentRange: string,
  ) => {
    await delay(700);
    return fakeRevenueComparison;
  },
};
