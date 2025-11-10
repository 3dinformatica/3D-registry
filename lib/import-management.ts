/**
 * @fileoverview Component Import Management
 * 
 * This file manages dynamic imports for the component registry system.
 * It provides a centralized mapping of component paths to their dynamically
 * imported React components using Next.js dynamic imports.
 *
 * The componentMap object contains pre-defined mappings for known components,
 * allowing lazy-loading of components when they are needed. This helps with
 * code-splitting and performance optimization.
 *
 * @typedef {Object.<string, React.ComponentType<any>>} ComponentMap
 */

import dynamic from "next/dynamic";

type ComponentImportMap = {
  [key: string]: React.ComponentType<any>;
};

// Pre-define dynamic imports for ui components
export const uiDynamicImports: ComponentImportMap = {
  "registry/ui/switch-boolean/switch-boolean.tsx": dynamic(
    () => import("@/registry/ui/switch-boolean/switch-boolean.preview").then((mod) => mod.SwitchBooleanPreview)
  ),
  "registry/ui/icon-boolean/icon-boolean.tsx": dynamic(
    () => import("@/registry/ui/icon-boolean/icon-boolean.preview").then((mod) => mod.IconBooleanPreview)
  ),
};

// Pre-define dynamic imports for block components
export const blockDynamicImports: ComponentImportMap = {
  "registry/block/navbar/navbar.tsx": dynamic(
    () => import("@/registry/block/navbar/navbar").then((mod) => mod.Navbar)
  ),
  "registry/block/combobox/combobox.tsx": dynamic(
    () => import("@/registry/block/combobox/combobox").then((mod) => mod.default)
  ),
  "registry/block/sidebar/sidebar.tsx": dynamic(
    () => import("@/registry/block/sidebar/sidebar").then((mod) => mod.default)
  ),
 
};
