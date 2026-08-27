import {
  Building2,
  Clapperboard,
  Code,
  Compass,
  Home,
  Landmark,
  Leaf,
  Network,
  Ship,
  Sofa,
  Star,
  TrendingUp,
  Truck,
  Video,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  "trending-up": TrendingUp,
  code: Code,
  sofa: Sofa,
  leaf: Leaf,
  "building-2": Building2,
  home: Home,
  compass: Compass,
  ship: Ship,
  truck: Truck,
  network: Network,
  clapperboard: Clapperboard,
  video: Video,
  landmark: Landmark,
};

export function CompanyIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? Star;
  return <Icon className={className} strokeWidth={1.5} aria-hidden="true" />;
}
