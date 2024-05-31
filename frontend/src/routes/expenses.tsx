import { createFileRoute } from '@tanstack/react-router';
import { clientRpc } from '@/lib/client-rpc';
import { useQuery } from '@tanstack/react-query';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from '@/components/ui/table';

export const Route = createFileRoute('/expenses')({
  component: Expenses
});

async function getExpenses() {
  const res = await clientRpc.api.expenses['$get']();

  if (!res.ok) throw new Error('Failed to fetch total spent');

  const data = await res.json();

  return data.expenses;
}

function Expenses() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-expenses'],
    queryFn: getExpenses
  });

  if (error) return <p>An error has occured: {error.message}</p>;

  return (
    <div className="pt-4">
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead className="w-48">Title</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell colSpan={2}>Loading expenses...</TableCell>
            </TableRow>
          ) : null}
          {data?.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.id}</TableCell>
              <TableCell className="font-medium">{expense.title}</TableCell>
              <TableCell className="text-right">{expense.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
