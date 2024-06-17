import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export type LoadingButtonProps = {
  loading?: boolean;
  text: string;
  onClick?: () => void;
  type: 'submit' | 'button';
  disabled?: boolean;
  className?: string
}

const LoadingButton = ({ loading = false, text, onClick, disabled = false, type = 'button', className }: LoadingButtonProps) => {
  return (
    <Button disabled={disabled || loading} onClick={onClick} type={type} className={className}>
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : text}
    </Button>
  )
}

export default LoadingButton;