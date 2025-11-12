
import { RegistryItem } from "../../lib/schema";

export const UiItems: RegistryItem[] = [
  {
    name: "icon-boolean",
    type: "registry:ui",
    title: "Icon Boolean",
    description: "A boolean icon component that displays a check or cross icon based on a boolean value. Supports different sizes, variants, and fallback states for null/undefined values.",
    dependencies: ["lucide-react", "class-variance-authority"],
    files: [
      {
        type: "registry:ui",
        path: "registry/ui/icon-boolean/icon-boolean.tsx",
        target: "components/area/ui/icon-boolean.tsx",
      },
    ],
  },
  {
    name: "switch-boolean",
    type: "registry:ui",
    title: "Switch Boolean",
    description: "A boolean switch component that displays a switch based on a boolean value. Supports different sizes, variants, and fallback states for null/undefined values.",
    dependencies: ["lucide-react", "class-variance-authority"],
    files: [
      {
        type: "registry:ui",
        path: "registry/ui/switch-boolean/switch-boolean.tsx",
        target: "components/area/ui/switch-boolean.tsx",
      },
    ],
  },
];
