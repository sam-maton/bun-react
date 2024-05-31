import { createFileRoute } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { useForm } from '@tanstack/react-form';

export const Route = createFileRoute('/create-expense')({
  component: CreateExpense
});

function CreateExpense() {
  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    }
  });

  return (
    <form
      className="flex flex-col gap-8 pt-8 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <form.Field
          name="title"
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            );
          }}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <form.Field
          name="amount"
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name}>Amount</Label>
                <Input
                  type="number"
                  placeholder="Amount"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </>
            );
          }}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" className="w-fit" disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Create expense'}
          </Button>
        )}
      />
    </form>
  );
}
