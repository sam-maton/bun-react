import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

function App() {
  const [spent, setSpent] = useState(0);

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
