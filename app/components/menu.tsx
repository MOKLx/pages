import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { LogOut } from "lucide-react";
import { basePath } from "../../vite.config"

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
            <Link to={basePath + "/calendar"}>Kalendář</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to={basePath + "/myappts"}>Mé termíny</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList className="flex items-center">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to={basePath + "/profile"}>{user}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to={basePath + "/"}>
              <LogOut size={1} className="text-muted-foreground" />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

    </NavigationMenu>
  )
}