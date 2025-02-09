"use client";

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

export default function ClientHeader() {
  const pathname = usePathname();
  const hideHeaderRoutes = ["/"];

  if (hideHeaderRoutes.includes(pathname)) {
    return null;
  }

  return <Header />;
}
