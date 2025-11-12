import { Registry } from "../lib/schema";
import { UiItems } from "./ui/ui-items";
import { BlockItems } from "./block/block-items";
import { HookItems } from "./hooks/hook-items";
import { LibraryItems } from "./lib/lib-items";

const registry: Registry = {
  name: "3D Registry",
  homepage: "https://3dinformatica.github.io/3D-registry/",
  items: [...UiItems, ...BlockItems, ...HookItems, ...LibraryItems]
};

export default registry; 