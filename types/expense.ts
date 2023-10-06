export type Expense = {
  title: string;
  amount: number | string;
  currency: 'RUB' | 'USD' | 'EUR'
  date?: string;
  category?: string;
};
