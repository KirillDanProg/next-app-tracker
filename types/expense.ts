export type Expense = {
  _id: string,
  title: string;
  amount: number | string;
  currency: 'RUB' | 'USD' | 'EUR'
  date?: string;
  category?: string;
};
