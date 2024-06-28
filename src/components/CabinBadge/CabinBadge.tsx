import { CabinClass } from "@/shared/enums/CabinClass";
import { Badge } from "../ui/badge";

export type CabinBadgeProps = {
  cabin: CabinClass;
}

export const CabinBadge = ({ cabin }: CabinBadgeProps) => {
  const cabinColor = () => {
    switch (cabin.toString()) {
      case "Econômica":
        return 'bg-primary';
      case "Executiva":
        return 'bg-green-600';
      case "Econômica Premium":
        return 'bg-blue-600';
      case "Primeira Classe":
        return 'bg-cyan-600';
      default:
        return 'bg-primary';
    }
  }

  return <Badge className={`${cabinColor()}`}>{cabin}</Badge>
}