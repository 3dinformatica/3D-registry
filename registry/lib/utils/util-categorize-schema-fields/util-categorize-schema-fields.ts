/**
 * Categorizes Zod schema fields by their data type.
 * Useful for dynamic form generation and schema analysis.
 */

import {
  ZodArray,
  ZodBoolean,
  ZodEnum,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodString,
} from "zod";
import type { z } from "zod";

// ============================== EXPORTED TYPES ==============================

/**
 * Extracts the string keys from a type.
 */
export type StringKeyOf<TData> = Extract<keyof TData, string>;

/**
 * Schema fields grouped by type.
*/
export type SchemaFieldsByType<T extends z.ZodTypeAny> = {
  uuid: Array<StringKeyOf<z.infer<T>>>;
  string: Array<StringKeyOf<z.infer<T>>>;
  number: Array<StringKeyOf<z.infer<T>>>;
  datetime: Array<StringKeyOf<z.infer<T>>>;
  boolean: Array<StringKeyOf<z.infer<T>>>;
  enum: Array<StringKeyOf<z.infer<T>>>;
  arrayString: Array<StringKeyOf<z.infer<T>>>;
  arrayEnum: Array<StringKeyOf<z.infer<T>>>;
  arrayDatetime: Array<StringKeyOf<z.infer<T>>>;
  arrayUuid: Array<StringKeyOf<z.infer<T>>>;
  arrayNumber: Array<StringKeyOf<z.infer<T>>>;
};

/**
 * Schema fields grouped by type, including excluded fields.
 * The `excluded` array contains all field keys that were explicitly excluded
 * from categorization via the `excludedKeysList` option.
 */
export type SchemaFieldsByTypeWithExcluded<T extends z.ZodTypeAny> =
  SchemaFieldsByType<T> & {
    excluded: Array<StringKeyOf<z.infer<T>>>;
  };

// ============================== INTERFACES ==============================

interface CategorizeSchemaFieldsProps<T extends z.ZodTypeAny> {
  schema: T;
  excludedKeysList?: Array<StringKeyOf<z.infer<T>>>;
  withExcluded?: boolean;
}

interface UnwrappedOptionalNullable {
  unwrapped: z.ZodTypeAny;
  isOptional: boolean;
  isNullable: boolean;
}

// ============================== HELPER FUNCTIONS ==============================

/**
 * Unwraps optional and nullable wrappers from a Zod field.
 * Returns the unwrapped field and flags indicating if it was optional/nullable.
 */
function unwrapOptionalNullable(field: z.ZodTypeAny): UnwrappedOptionalNullable {
  let unwrapped = field;
  let isOptional = false;
  let isNullable = false;

  while (unwrapped instanceof ZodOptional || unwrapped instanceof ZodNullable) {
    if (unwrapped instanceof ZodOptional) {
      isOptional = true;
    }
    if (unwrapped instanceof ZodNullable) {
      isNullable = true;
    }
    unwrapped = unwrapped.unwrap() as z.ZodTypeAny;
  }

  return { unwrapped, isOptional, isNullable };
}

/**
 * Gets a field from a ZodObject schema by key.
 * Returns undefined if schema is not a ZodObject or field doesn't exist.
 */
function getSchemaField<T extends z.ZodTypeAny>(
  schema: T,
  fieldName: string,
): z.ZodTypeAny | undefined {
  if (!(schema instanceof ZodObject)) {
    console.log("schema is not a ZodObject");
    return undefined;
  }

  const field = schema.shape[fieldName as keyof typeof schema.shape];
  return field;
}

/**
 * Gets the default value for a Zod type (after unwrapping).
 * Does not handle optional/nullable - those should be unwrapped first.
 */
function getDefaultValueByZodType(field: z.ZodTypeAny): any {
  // Handle arrays
  if (field instanceof ZodArray) {
    return [];
  }

  // Handle primitive types
  if (field instanceof ZodString) {
    return "";
  } else if (field instanceof ZodNumber) {
    return 0;
  } else if (field instanceof ZodBoolean) {
    return undefined;
  } else if (field instanceof ZodEnum) {
    // Return the first enum value as default, or null if no values
    // In Zod v4, use the public .options property instead of _def.values
    const enumValues = field.options;
    return enumValues && enumValues.length > 0 ? enumValues[0] : null;
  }

  // For other types (objects, etc.), return undefined
  return undefined;
}

// ============================== EXPORTED FUNCTIONS ==============================

/**
 * Categorizes schema fields by their Zod type (uuid, string, number, datetime, boolean, enum, and their array variants).
 * When `withExcluded` is true, also includes an `excluded` array containing all keys that were excluded from categorization.
 */
export function categorizeSchemaFields<T extends z.ZodTypeAny>(
  props: CategorizeSchemaFieldsProps<T>,
): SchemaFieldsByType<T> | SchemaFieldsByTypeWithExcluded<T> {
  const { schema, excludedKeysList, withExcluded = false } = props;

  const excludeKeys = excludedKeysList ?? [];
  const schemaShape = schema instanceof ZodObject ? schema.shape : schema;
  const schemaKeys = Object.keys(schemaShape);

  const filteredKeys = schemaKeys.filter(
    (key) => !excludeKeys.includes(key as StringKeyOf<z.infer<T>>),
  ) as Array<StringKeyOf<z.infer<T>>>;

  const fieldsByType: SchemaFieldsByType<T> = {
    uuid: [],
    string: [],
    number: [],
    datetime: [],
    boolean: [],
    enum: [],
    arrayString: [],
    arrayEnum: [],
    arrayDatetime: [],
    arrayUuid: [],
    arrayNumber: [],
  };

  filteredKeys.forEach((key) => {
    const field = schemaShape[key as keyof typeof schemaShape];
    const { unwrapped: unwrappedField } = unwrapOptionalNullable(field);

    // Handle arrays by checking the inner element type
    if (unwrappedField instanceof ZodArray) {
      // In Zod v4, use the public .element property instead of _def.type
      const { unwrapped: innerType } = unwrapOptionalNullable(
        unwrappedField.element as z.ZodTypeAny,
      );

      if (innerType instanceof ZodString) {
        // In Zod v4, use .def.checks (public API) and check .format property instead of .kind
        const isDatetime = innerType.def.checks?.some(
          (check: any) => check.format === "datetime",
        ) ?? false;
        const isUUID = innerType.def.checks?.some(
          (check: any) => check.format === "uuid",
        ) ?? false;

        if (isDatetime) {
          fieldsByType.arrayDatetime.push(key);
        } else if (isUUID) {
          fieldsByType.arrayUuid.push(key);
        } else {
          fieldsByType.arrayString.push(key);
        }
      } else if (innerType instanceof ZodEnum) {
        fieldsByType.arrayEnum.push(key);
      } else if (innerType instanceof ZodNumber) {
        fieldsByType.arrayNumber.push(key);
      }
      // Arrays of other types are not categorized
      return;
    }

    // Handle primitive types
    if (unwrappedField instanceof ZodNumber) {
      fieldsByType.number.push(key);
    } else if (unwrappedField instanceof ZodBoolean) {
      fieldsByType.boolean.push(key);
    } else if (unwrappedField instanceof ZodEnum) {
      fieldsByType.enum.push(key);
    } else if (unwrappedField instanceof ZodString) {
      // In Zod v4, use .def.checks (public API) and check .format property instead of .kind
      const isDatetime = unwrappedField.def.checks?.some(
        (check: any) => check.format === "datetime",
      ) ?? false;
      const isUUID = unwrappedField.def.checks?.some(
        (check: any) => check.format === "uuid",
      ) ?? false;

      if (isDatetime) {
        fieldsByType.datetime.push(key);
      } else if (isUUID) {
        fieldsByType.uuid.push(key);
      } else {
        fieldsByType.string.push(key);
      }
    }
  });

  console.log(
    "fieldsByType: ",
    JSON.stringify(
      withExcluded
        ? { ...fieldsByType, excluded: excludedKeysList ?? [] }
        : fieldsByType,
      null,
      2,
    ),
  );

  return withExcluded
    ? { ...fieldsByType, excluded: excludedKeysList ?? [] }
    : fieldsByType;
}

/**
 * Helper to check if a field belongs to a specific category.
 * Useful for component selection based on field type.
 *
 * @example
 * ```ts
 * const fields = categorizeSchemaFields({ schema });
 * if (isFieldOfType(fields, 'enum', 'status')) {
 *   return <FormItemComboBoxEnum ... />
 * }
 * ```
 */
export function isFieldOfType<T extends z.ZodTypeAny>(
  fields: SchemaFieldsByType<T> | SchemaFieldsByTypeWithExcluded<T>,
  category: keyof SchemaFieldsByType<T> | "excluded",
  fieldName: string,
): boolean {
  const fieldArray = fields[category as keyof typeof fields];

  const isPresent = fieldArray.includes(fieldName as StringKeyOf<z.infer<T>>);
  console.log(`${fieldName} is inside category ${category}: `, isPresent);
  return isPresent;
}

/**
 * Helper to get the category type of a specific field.
 * Returns the first matching category or null if not found.
 * Note: This will return 'excluded' if the field was in the excludedKeysList and withExcluded was true.
 *
 * @example
 * ```ts
 * const fields = categorizeSchemaFields({ schema });
 * const fieldType = getFieldType(fields, 'status');
 * // Returns: 'enum' | 'uuid' | 'string' | ... | 'excluded' | null
 * ```
 */
export function getFieldType<T extends z.ZodTypeAny>(
  fields: SchemaFieldsByType<T> | SchemaFieldsByTypeWithExcluded<T>,
  fieldName: string,
): keyof SchemaFieldsByType<T> | "excluded" | null {
  for (const [category, fieldNames] of Object.entries(fields)) {
    if (fieldNames.includes(fieldName as StringKeyOf<z.infer<T>>)) {
      console.log(`${fieldName} is of type ${category}`);
      return category as keyof SchemaFieldsByType<T> | "excluded";
    }
  }
  console.log(`${fieldName} is not found in the schema`);
  return null;
}

/**
 * Gets the default value for a specific field in a Zod schema based on its type.
 * Handles optional/nullable fields by returning undefined.
 *
 * @example
 * ```ts
 * const defaultValue = getDefaultValueByField(mySchema, 'status');
 * // Returns: '' | 0 | false | [] | null | undefined based on field type
 * ```
 */
export function getDefaultValueByField<T extends z.ZodTypeAny>(
  schema: T,
  fieldName: string,
): any {
  const field = getSchemaField(schema, fieldName);
  if (!field) {
    console.log(`field ${fieldName} not found in schema`);
    return undefined;
  }

  const { unwrapped } = unwrapOptionalNullable(field);
  const defaultValue = getDefaultValueByZodType(unwrapped);
  console.log(
    `defaultValue of ${fieldName}:`,
    JSON.stringify(defaultValue, null, 2),
  );

  return defaultValue;
}

/**
 * Gets default values for all fields in a Zod schema based on their types.
 * Returns a record where keys are field names and values are their defaults.
 *
 * @example
 * ```ts
 * const defaults = getDefaultValuesBySchema(mySchema);
 * // Returns: { name: '', age: 0, isActive: false, tags: [], ... }
 * ```
 */
export function getDefaultValuesBySchema<T extends z.ZodTypeAny>(
  schema: T,
): Record<string, any> {
  if (!(schema instanceof ZodObject)) {
    return {};
  }

  const defaults: Record<string, any> = {};
  const schemaShape = schema.shape;
  const schemaKeys = Object.keys(schemaShape);

  schemaKeys.forEach((key) => {
    const defaultValue = getDefaultValueByField(schema, key);
    defaults[key] = defaultValue;
  });

  return defaults;
}
