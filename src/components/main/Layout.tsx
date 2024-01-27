import { ReactNode } from 'react';
import Background from '../sub/Background';

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Background />
      {children}
    </>
  );
}

export default Layout;