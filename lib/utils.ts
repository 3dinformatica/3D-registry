import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractImports = (content: string | undefined) => {
  if (!content) return "No imports found";

  // Handle escaped newlines
  const unescapedContent = content.replace(/\\n/g, "\n");

  // Match all types of imports:
  // 1. Named imports with curly braces
  // 2. Default imports
  // 3. Side-effect imports
  // 4. Type imports
  // 5. Namespace imports
  const importRegex =
    /import\s*(?:type\s*)?(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+["'].*?["'];|import\s+.*?;/gm;

  const imports = unescapedContent.match(importRegex);
  if (!imports) return "No imports found";

  // Clean up and format imports
  return imports
    .map((imp) => imp.trim())
    .filter((imp) => imp.startsWith("import"))
    .join("\n");
};

export const extractJSX = (content: string | undefined) => {
  if (!content) return "No content found";

  // Handle escaped newlines
  const unescapedContent = content.replace(/\\n/g, "\n");

  // First try to find a return statement
  const returnRegex = /return\s*(?:\(([\s\S]*?)\)|{([\s\S]*?)}|([\s\S]*?));/;
  const returnMatch = unescapedContent.match(returnRegex);

  if (returnMatch) {
    // Get the JSX content from any of the capture groups
    const jsxContent = (
      returnMatch[1] ||
      returnMatch[2] ||
      returnMatch[3]
    ).trim();
    return formatJSX(jsxContent);
  }

  // If no return statement, look for JSX directly
  const jsxRegex = /<[^>]*>[\s\S]*?<\/[^>]*>|<[^>]*\/>/;
  const jsxMatch = unescapedContent.match(jsxRegex);

  if (jsxMatch) {
    return formatJSX(jsxMatch[0]);
  }

  return "No JSX found";
};

const formatJSX = (content: string) => {
  // Format the JSX with proper indentation
  const lines = content.split("\n");
  let indentLevel = 0;

  const formattedLines = lines.map((line) => {
    const trimmedLine = line.trim();

    // Decrease indent level for closing tags and expressions
    if (
      trimmedLine.match(/^<\/[^>]+>/) ||
      trimmedLine === ")" ||
      trimmedLine === "};" ||
      trimmedLine === "}" ||
      trimmedLine === "]"
    ) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // Add proper indentation
    const indentedLine = "  ".repeat(indentLevel) + trimmedLine;

    // Increase indent level for opening tags and expressions
    if (
      trimmedLine.match(/^<[^/][^>]*>/) ||
      trimmedLine === "{" ||
      trimmedLine === "(" ||
      trimmedLine === "["
    ) {
      indentLevel += 1;
    }

    return indentedLine;
  });

  return formattedLines.join("\n");
};


// Mapping for component examples
type ComponentImportMap = {
  [key: string]: () => Promise<{ title: string; description?: string; code: string }[]>;
};
const examplesImports: ComponentImportMap = {
  "icon-boolean": () => import("@/registry/ui/icon-boolean/icon-boolean.examples").then((mod) => mod.iconBooleanExamples),
};

export const loadComponentExamples = async (
  componentName: string
): Promise<Array<{ title: string; description?: string; code: string }> | null> => {
  try {
    const importFn = examplesImports[componentName];
    
    if (!importFn) return null;

    const examples = await importFn();
    return examples.map((example) => ({
      title: example.title,
      description: example.description,
      code: example.code,
    }));
  } catch (error) {
    console.error("Error loading examples:", error);
    return null;
  }
};
