import items from '@/config'
import { Item } from '../item';
import type { Metadata } from "next";
import { AlertDestructive } from "@/components/ui/alert-error";

export const metadata: Metadata = {
  title: "Item",
  description: "Item details",
};

// Page Component
export default async function Page({
  params,
}: {
  params: Promise<{ ref: string }>
}) {
  const { ref } = await params
  
  // Prevent rendering before the `ref` is available
  if (!ref) {
    return <div>Loading...</div>
  }

  const item = items.find((item) => item.ref === ref)

  // If item is not found, show a 404-like message
  if (!item) {
    return <AlertDestructive title="Item not found" description="The item you are looking for does not exist." />
  }

  return (<Item item={item} className='w-[80%]'/>);
}
