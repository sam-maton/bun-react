import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

export const Route = createRootRoute({
  component: () => (
    <>
      <NavBar />
      <hr />
      <div className="flex flex-col items-center mx-auto gap-4 max-w-md">
        <Outlet />
      </div>
    </>
  )
});

function NavBar() {
  return (
    <NavigationMenu className="p-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            Home
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/expenses" className={navigationMenuTriggerStyle()}>
            Expenses
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/create-expense" className={navigationMenuTriggerStyle()}>
            +
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
