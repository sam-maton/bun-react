import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from '@hono/zod-validator'

type Expense = {
  id: number;
  amount: number;
  title: string;
};

const postExpenseSchema = z.object({
  amount: z.number().int().positive(),
  title: z.string().min(3).max(100)
});

const fakeExpenses: Expense[] = [
  {
    id: 1,
    amount: 100,
    title: "Coffee"
  },
  {
    id: 2,
    amount: 200,
    title: "Lunch"
  }
];

export const expensesRoute = new Hono()

//Get all
expensesRoute.get("/", c => {
  return c.json({expenses: fakeExpenses});
})

//Get :id
expensesRoute.get("/:id{[0-9]+}", c => {
  const id = Number.parseInt(c.req.param("id"));

  const expense = fakeExpenses.find(e => e.id === id);

  if (!expense) {
    return c.notFound();
  }

  return c.json({expense})
})

//Post new
expensesRoute.post("/", zValidator('json', postExpenseSchema), async c => {
  const expense = c.req.valid("json");
  fakeExpenses.push({...expense, id: (fakeExpenses.length + 1)})
  return c.json(expense.title);
})

//Delete :id
expensesRoute.post("/:id{[0-9]+}", c => {
  const id = Number.parseInt(c.req.param("id"));

  const expenseIndex = fakeExpenses.findIndex(e => e.id === id);

  if (expenseIndex < 0) {
    return c.notFound();
  }

  fakeExpenses.splice(expenseIndex, 1);


  return c.json(fakeExpenses)
})
