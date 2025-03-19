import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
        NavigationMenu,
        NavigationMenuContent,
        NavigationMenuItem,
        NavigationMenuLink,
        NavigationMenuList,
        NavigationMenuTrigger,
        navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import menu from "@/config/menu.config.json"

type MenuItem = {
        title: string;
        href: string;
        description: string;
};

type Menu = {
        Validation: MenuItem[];
}[];

const menuPlan: Menu = menu;

export async function Wrapper({
        children,
}: Readonly<{
        children: React.ReactNode;
}>) {

        return (
                <div className="flex flex-col items-center justify-around min-h-screen">
                        <section className="border-3 border-black w-fit rounded-lg">
                                <NavigationMenu>
                                        <NavigationMenuList>
                                                {menuPlan.map((menuCategory, index) => (
                                                        Object.keys(menuCategory).map((category) => (
                                                                <NavigationMenuItem key={index}>
                                                                        <NavigationMenuTrigger>{category}</NavigationMenuTrigger>
                                                                        <NavigationMenuContent>
                                                                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                                                                        {menuCategory[category as keyof typeof menuCategory].map((item: MenuItem) => (
                                                                                                <ListItem key={item.href} href={item.href} title={item.title}>
                                                                                                        {item.description}
                                                                                                </ListItem>
                                                                                        ))}
                                                                                </ul>
                                                                        </NavigationMenuContent>
                                                                </NavigationMenuItem>
                                                        ))
                                                ))}
                                        </NavigationMenuList>
                                </NavigationMenu>
                        </section>
                        <div>
                                {children}
                        </div>
                </div>
        )
}

const ListItem = React.forwardRef<
        React.ComponentRef<"a">,
        React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
        return (
                <li>
                        <NavigationMenuLink asChild>
                                <a
                                        ref={ref}
                                        className={cn(
                                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                                className
                                        )}
                                        {...props}
                                >
                                        <div className="text-sm font-medium leading-none">{title}</div>
                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                {children}
                                        </p>
                                </a>
                        </NavigationMenuLink>
                </li>
        )
})
ListItem.displayName = "ListItem"
