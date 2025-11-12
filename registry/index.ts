import { Registry } from "../lib/schema";
import { UiItems } from "./ui/ui-items";
import { BlockItems } from "./block/block-items";
import { HookItems } from "./hooks/hook-items";
import { UtilsItems } from "./utils/utils-items";

const registry: Registry = {
  name: "3D Registry",
  homepage: "https://3dinformatica.github.io/registry/",
  items: [...UiItems, ...BlockItems, ...HookItems, ...UtilsItems]
};

export default registry; 