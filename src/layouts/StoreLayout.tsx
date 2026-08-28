import type { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function StoreLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-neutral-950 text-white"><Header /><div>{children}</div><Footer /></div>;
}
