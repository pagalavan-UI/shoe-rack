export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
  items: number;
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-73921',
    customerName: 'Marcus Johnson',
    customerEmail: 'marcus.j@example.com',
    date: '2024-10-24',
    total: 29998,
    status: 'Delivered',
    items: 2
  },
  {
    id: 'ORD-73922',
    customerName: 'Sarah Williams',
    customerEmail: 'sarah.w@example.com',
    date: '2024-10-25',
    total: 8999,
    status: 'Shipped',
    items: 1
  },
  {
    id: 'ORD-73923',
    customerName: 'David Chen',
    customerEmail: 'd.chen@example.com',
    date: '2024-10-25',
    total: 34998,
    status: 'Processing',
    items: 2
  },
  {
    id: 'ORD-73924',
    customerName: 'Elena Rodriguez',
    customerEmail: 'elena.r@example.com',
    date: '2024-10-26',
    total: 15999,
    status: 'Processing',
    items: 1
  },
  {
    id: 'ORD-73925',
    customerName: 'James Wilson',
    customerEmail: 'jwilson99@example.com',
    date: '2024-10-22',
    total: 44997,
    status: 'Cancelled',
    items: 3
  },
  {
    id: 'ORD-73926',
    customerName: 'Amira Patel',
    customerEmail: 'apatel@example.com',
    date: '2024-10-21',
    total: 14999,
    status: 'Delivered',
    items: 1
  },
  {
    id: 'ORD-73927',
    customerName: 'Michael Chang',
    customerEmail: 'mchang.tech@example.com',
    date: '2024-10-26',
    total: 18999,
    status: 'Processing',
    items: 1
  },
  {
    id: 'ORD-73928',
    customerName: 'Chloe Bennett',
    customerEmail: 'chloe.b@example.com',
    date: '2024-10-20',
    total: 24999,
    status: 'Delivered',
    items: 2
  }
];
