import { RegistryItem } from "../../lib/schema";

export const BlockItems: RegistryItem[] = [
  {
    name: "sheet",
    type: "registry:block",
    title: "Sheet",
    description: "A modal dialog that slides in from the bottom of the screen. Useful for providing a sheet to the user.",
    dependencies: ["sheet", "button", "separator", "lucide-react"],
    files: [
      {
        type: "registry:block",
        path: "registry/block/sheet/sheet.tsx",
        target: "components/area/block/sheet.tsx",
      },
    ],
  },
  {
    name: "navbar",
    type: "registry:block",
    title: "Navbar",
    description: "A responsive navigation bar component with customizable icon and content sections. Useful for providing a navigation bar to the user.",
    dependencies: ["next", "react", "react-dom"],
    files: [
      {
        type: "registry:block",
        path: "registry/block/navbar/navbar.tsx",
        target: "components/area/block/navbar.tsx",
      },
      {
        type: "registry:ui",
        path: "components/navbar-content.tsx",
        target: "components/area/ui/navbar-content.tsx",
      }
    ],
  },
  {
    name: "sidebar",
    type: "registry:block",
    title: "Sidebar",
    description: "A collapsible side navigation panel for organizing content and navigation links. Useful for providing a sidebar to the user.",
    files: [
      {
        type: "registry:block",
        path: "registry/block/sidebar/sidebar.tsx",
        target: "components/area/block/sidebar.tsx",
      },
    ],
  },
  {
    name: "combobox",
    type: "registry:block",
    title: "Combobox",
    description: "A searchable dropdown component that allows selecting from a list of items with keyboard navigation and filtering capabilities. Useful for providing a combobox to the user.",
    dependencies: ["combobox", "popover"],
    files: [
      {
        type: "registry:block",
        path: "registry/block/combobox/combobox.tsx",
        target: "components/area/block/combobox.tsx",
      },
    ]
  }
];
