'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { sidebarLinks } from './data';
import SidebarLink from './sidebar-link';
import * as React from 'react';
import useCustomNavigation from '@/hooks/use-navigation';

import SidebarDropdown from './sidebar-link/sidebar-dropdown';
import AppHeader from './app-header';
import { Separator } from '@/components/ui/separator';
import AppLogo from '../app-logo';

export default function AppSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeLink, setActiveLink] = React.useState('');
  const [currentPath, setCurrentPath] = React.useState('');
  const { pathname } = useCustomNavigation();

  React.useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);
  const props = {
    activeLink,
    setActiveLink,
    currentPath,
  };
  return (
    <SidebarProvider>
      <Sidebar className=' !bg-black-base'>
        <SidebarHeader className='py-3.5 bg-black-base'>
          <AppLogo scope='7' size={109} />
        </SidebarHeader>
        <SidebarContent className='!px-2  !justify-start !bg-black-base py-5 gap-0'>
          {sidebarLinks.map((item) => {
            if (item.subLinks?.length) {
              return <SidebarDropdown key={item.name} {...item} {...props} />;
            }
            return <SidebarLink key={item.name} {...item} {...props} />;
          })}
        </SidebarContent>
        <Separator className='h-px bg-white' />
        {/* <AppSidebarFooter /> */}
      </Sidebar>
      <div className='flex flex-col w-full overflow-hidden'>
        <AppHeader />
        {children}
      </div>
    </SidebarProvider>
  );
}

{
  /* <SidebarGroup className={"pt-0"}>
	<SidebarGroupContent>
		<SidebarMenu>
			{links.map((item) => (
				<SidebarMenuItem key={item.title}>
					<SidebarMenuButton asChild>
						<Link href={item.href}>
							<item.icon />
							<span>{item.title}</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	</SidebarGroupContent>
</SidebarGroup>; */
}
