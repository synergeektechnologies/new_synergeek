import {
  Code,
  Cloud,
  Shield,
  Database,
  Lightbulb,
  TrendingUp,
  Share2,
  Webhook,
  Globe,
  Camera,
  PenTool,
  Rocket,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Code,
  Cloud,
  Shield,
  Database,
  Lightbulb,
  TrendingUp,
  Share2,
  Webhook,
  Globe,
  Camera,
  PenTool,
  Rocket,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Code
}
