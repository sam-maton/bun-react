import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { clientRpc } from '@/lib/client-rpc';

function App() {
  const [spent, setSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const res = await clientRpc.api.expenses['total'].$get();
      const data = await res.json();
      setSpent(data.total);
    }

    fetchTotalSpent();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mx-auto pt-14 gap-4 max-w-md">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>The total amount you have spent</CardDescription>
          </CardHeader>
          <CardContent>{spent}</CardContent>
        </Card>
      </div>
    </>
  );
}

export default App;
