import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

interface MenuProps {
  user?: string;
}

export function Menu({ user = "Můj Profil" }: MenuProps) {
  return (
    <NavigationMenu 
      viewport={false} 
      className="w-full max-w-none flex items-center justify-between px-4 border-b h-16 bg-background"
    >

      <NavigationMenuList className="flex items-center gap-2">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/calendar">Kalendář</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/myappts">Mé termíny</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList className="flex items-center gap-2">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/profil">{user}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

    </NavigationMenu>
  )
}