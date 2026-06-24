import type { Metadata } from 'next';
import DirectoryClient from './DirectoryClient';

export const metadata: Metadata = {
  title: "Directory | HYDRASAURUS",
  description: "Elite creator directory mapping active broadcast nodes across the Hydrasaurus network.",
};

export default function DirectoryPage() {
  return <DirectoryClient />;
}
