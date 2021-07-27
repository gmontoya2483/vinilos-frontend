export interface SideNavItem {
  description: string;
  path: string;
  icon: string | null;
  children: SideNaveChildItem [];
}

export interface SideNaveChildItem {
  description: string;
  icon?: string;
  path: string;
}
