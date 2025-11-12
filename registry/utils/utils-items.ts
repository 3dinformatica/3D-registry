import { RegistryItem } from "../../lib/schema";

export const UtilsItems: RegistryItem[] = [
  {
    name: "util-date-formatters",
    type: "registry:lib",
    title: "Date Formatters Utility",
    description:
      "A utility functions to format dates in various formats. Supports multiple date formats including ISO, European, US, and readable formats with month names.",
    dependencies: [],
    files: [
      {
        type: "registry:lib",
        path: "registry/utils/util-date-formatters/util-date-formatters.ts",
        target: "lib/utils/util-date-formatters.ts",
      },
    ],
  },
  {
    name: "util-categorize-schema-fields",
    type: "registry:lib",
    title: "Schema Fields Utility",
    description:
      "A utility functions to categorize schema fields by their data type, returning an object with the fields grouped by type and returning the default values for the fields. Useful for dynamic form generation and schema analysis.",
    dependencies: [],
    files: [
      {
        type: "registry:lib",
        path: "registry/utils/util-categorize-schema-fields/util-categorize-schema-fields.ts",
        target: "lib/utils/util-categorize-schema-fields.ts",
      },
    ],
  },
];

