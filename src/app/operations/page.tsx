import type { Metadata } from 'next';
import OperationsClient from './OperationsClient';

export const metadata: Metadata = {
  title: "Operations | HYDRASAURUS",
  description: "Technical broadcast engineering and custom creator overlays designed by Hydrasaurus.",
};

export default function OperationsPage() {
  return <OperationsClient />;
}
