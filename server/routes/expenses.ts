import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  amount: z.number().int().positive(),
  title: z.string().min(3).max(100)
});

const postExpenseSchema = expenseSchema.omit({ id: true });

type Expense = z.infer<typeof expenseSchema>;

const fakeExpenses: Expense[] = [
  {
    id: 1,
    amount: 100,
    title: 'Coffee'
  },
  {
    id: 2,
    amount: 200,
    title: 'Lunch'
  },
  {
    id: 3,
    amount: 300,
    title: 'Dinner'
  }
];

export const expensesRoute = new Hono()
  .get('/', (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .get('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'));

    const expense = fakeExpenses.find((e) => e.id === id);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })
  .get('/total', (c) => {
    const total = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    return c.json({ total });
  })
  .post('/', zValidator('json', postExpenseSchema), async (c) => {
    const expense = c.req.valid('json');
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json(expense.title);
  })
  .post('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'));

    const expenseIndex = fakeExpenses.findIndex((e) => e.id === id);

    if (expenseIndex === -1) {
      return c.notFound();
    }

    fakeExpenses.splice(expenseIndex, 1);

    return c.json(fakeExpenses);
  });
