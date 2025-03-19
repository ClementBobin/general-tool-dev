import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { dropAndBounce } from "@/lib/motion";

export function AlertDestructive({ title, description, className }: { title: string; description: string; className?: string }) {
  return (
    <motion.div initial="hidden" animate="show" exit="hidden" variants={dropAndBounce(0.5, 15, 590, 2000, 590, 370, 1)}>
      <Alert variant="destructive" className={`${className ? className : "fixed bottom-0 right-0 m-4 w-fit"}`}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </motion.div>
  );
}
