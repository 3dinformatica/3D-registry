/**
 * Usage examples for icon-boolean component
 * This file contains example code snippets that will be displayed in the registry
 */

export interface ExampleContainer {
  title: string;
  description?: string;
  code: string;
}

export const iconBooleanExamples: ExampleContainer[] = [
  {
    title: "Basic Usage",
    description: "Simple boolean icon usage",
    code: `
<BooleanIcon value={true} />
<BooleanIcon value={false} />
`,
  },
  {
    title: "Sizes",
    description: "Different size variants",
    code: `
<BooleanIcon value={true} size="sm" />
<BooleanIcon value={true} size="base" />
<BooleanIcon value={true} size="lg" />
`,
  },
  {
    title: "Variants",
    description: "Different color variants",
    code: `
<BooleanIcon value={true} variant="success" />
<BooleanIcon value={false} variant="error" />
<BooleanIcon value={null} variant="muted" />
`,
  },
  {
    title: "Null/Undefined Handling",
    description: "Handling null and undefined values",
    code: `
<BooleanIcon value={null} />
<BooleanIcon value={undefined} showFallback={false} />
<BooleanIcon value={null} fallbackText="N/A" />
`,
  },
];
