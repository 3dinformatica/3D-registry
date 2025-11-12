import { RegistryItem } from "../../lib/schema";

export const LibraryItems: RegistryItem[] = [
  {
    name: "persistable-entity",
    type: "registry:lib",
    title: "Persistable Entity",
    description:
      "A schema for a persistable entity. Includes id, disabledAt, createdAt, and updatedAt fields. Useful for creating entities that can be persisted to a database.",
    dependencies: ["zod"],
    files: [
      {
        type: "registry:lib",
        path: "registry/lib/utils/persistable-entity/persistable-entity.ts",
        target: "lib/utils/persistable-entity.ts",
      },
    ],
  },
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
        path: "registry/lib/utils/util-date-formatters/util-date-formatters.ts",
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
    dependencies: ["zod"],
    files: [
      {
        type: "registry:lib",
        path: "registry/lib/utils/util-categorize-schema-fields/util-categorize-schema-fields.ts",
        target: "lib/utils/util-categorize-schema-fields.ts",
      },
    ],
  },
];

