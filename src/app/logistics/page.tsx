import type { Metadata } from 'next';
import LogisticsClient from './LogisticsClient';

export const metadata: Metadata = {
  title: "Logistics | HYDRASAURUS",
  description: "Enterprise sponsorship allocation and yield optimization for premium variety creator operations.",
};

export default function LogisticsPage() {
  return <LogisticsClient />;
}
