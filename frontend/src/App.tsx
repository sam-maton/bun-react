import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { clientRpc } from '@/lib/client-rpc';
import { useQuery } from '@tanstack/react-query';

async function getTotalSpent() {
  const res = await clientRpc.api.expenses['total'].$get();

  if (!res.ok) throw new Error('Failed to fetch total spent');

  const data = await res.json();
  return data.total;
}

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-total'],
    queryFn: getTotalSpent
  });

  if (error) return <p>An error has occured: {error.message}</p>;

  return (
    <>
      <div className="flex flex-col items-center mx-auto pt-14 gap-4 max-w-md">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>The total amount you have spent</CardDescription>
          </CardHeader>
          <CardContent>{isPending ? 'loading data...' : data}</CardContent>
        </Card>
      </div>
    </>
  );
}

export default App;
