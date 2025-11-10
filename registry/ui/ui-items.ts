
import { RegistryItem } from "../../lib/schema";

export const UiItems: RegistryItem[] = [
  {
    name: "tooltip-button",
    type: "registry:ui",
    title: "Tooltip Button",
    dependencies: ["button", "tooltip"],
    description: "A button component with a tooltip that appears on hover, combining the functionality of a button with additional explanatory text that helps users understand its purpose. Useful for providing context without cluttering the interface.",
    files: [
      {
        type: "registry:ui",
        path: "registry/ui/tooltip-button/tooltip-button.tsx",
        target: "components/area/ui/tooltip-button.tsx",
      },
    ],
  },
  {
    name: "hello-world",
    type: "registry:ui",
    title: "Hello World",
    description: "Hello World component",
    files: [
      {
        type: "registry:ui",
        path: "registry/ui/hello-world/hello-world.tsx",
        target: "components/area/ui/hello-world.tsx",
      },
    ],
  },
  {
    name: "select",
    type: "registry:ui",
    title: "Select",
    description: "A select component that allows users to choose an option from a list of options. Useful for providing a list of options to the user.",
    files: [
      {
        type: "registry:ui",
        path: "registry/ui/select/select.tsx",
        target: "components/area/ui/select.tsx",
      },
    ],
  },
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
  
];
