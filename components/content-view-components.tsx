"use client";

import { RegistryItem, RegistryItemFile } from "@/lib/schema";
import { loadComponentExamples } from "@/lib/utils";
import CopyButton from "./button-copy";
import { useMemo, useState, useEffect } from "react";
import { uiDynamicImports, blockDynamicImports } from "@/lib/import-management";
import ContentSection from "./content-view-section";
import { ExampleContainer } from "@/registry/ui/icon-boolean/icon-boolean.examples";
import registry from "@/registry";

interface ContentViewProps {
  registryItem: RegistryItem | null;
}

export default function ComponentContentView(props: ContentViewProps) {
  const { registryItem } = props;

  const [fileContent, setFileContent] = useState<RegistryItemFile | null>(null);
  const [examples, setExamples] = useState<ExampleContainer[] | null>(null);

  const component = useMemo(() => {
    if (!registryItem) return null;

    const path = registryItem.files?.find((file) => {
      return file.path.endsWith(".tsx");
    })?.path;

    if (!path) return null;

    // Get the component based on the type
    const Component =
      registryItem.type === "registry:ui"
        ? uiDynamicImports[path]
        : blockDynamicImports[path];

    if (!Component) return null;

    return <Component />;
  }, [registryItem]);

  useEffect(() => {
    if (!registryItem) return;

    const fetchFile = async () => {
      try {
        const res = await fetch(
          process.env.NODE_ENV === "development"
            ? `/r/${registryItem.name}.json`
            : `${registry}/r/${registryItem.name}.json`
        );

        if (!res.ok) {
          console.error("Failed fetching file:", res);
          return;
        }

        const body = await res.json();
        setFileContent(body.files?.at(0));
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchFile();

    // Load examples if available
    if (registryItem.name) {
      loadComponentExamples(registryItem.name).then((loadedExamples) => {
        setExamples(loadedExamples);
      });
    }
  }, [registryItem]);

  if (!registryItem) return null;

  const { dependencies, title, description, name } = registryItem;
  const installationCmd = `pnpm dlx shadcn@latest add ${
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/r/${name}.json`
      : `${registry}/r/${name}.json`
  }`;

  return (
    <div className="flex flex-col gap-10 pb-20 items-start h-fit overflow-y-auto flex-1">
      <h1>{title}</h1>
      <section className="flex flex-col gap-10 w-full h-fit mb-[60%]">
        <ContentSection id="description" title="Description">
          <p>{description}</p>
        </ContentSection>
        <ContentSection id="preview" title="Preview">
          <div className="flex w-full h-full items-center justify-center border-dashed border rounded-sm p-10">
            {component}
          </div>
        </ContentSection>
        <ContentSection id="installation" title="Installation">
          <pre className="bg-accent/60 rounded-md flex w-fit max-w-full p-4 gap-4 items-center">
            <code lang="bash" className="w-fit overflow-x-auto">
              {installationCmd}
            </code>
            <CopyButton toCopy={installationCmd} />
          </pre>
        </ContentSection>
        <ContentSection id="dependencies" title="Dependencies">
          <div className="flex flex-wrap gap-2">
            {dependencies && dependencies.length > 0 ? (
              dependencies.map((dep) => (
                <pre key={dep} className="bg-accent rounded-md px-1 py-0.5">
                  {dep}
                </pre>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No dependencies found
              </p>
            )}
          </div>
        </ContentSection>
        <ContentSection id="destination" title="Destination">
          <div className="flex gap-2 items-center">
            {fileContent
              ? fileContent.target?.split("/").map((item, index, array) => (
                  <section key={item} className="flex gap-2 items-center">
                    <pre className="bg-accent rounded-md px-1 py-0.5">
                      {item}
                    </pre>
                    {index < array.length - 1 && (
                      <span className="text-muted-foreground">/</span>
                    )}
                  </section>
                ))
              : "Loading..."}
          </div>
        </ContentSection>
        <ContentSection id="usage" title="Usage">
          {examples ? (
            <div className="flex flex-col gap-6">
              {examples.map((example) => (
                <div key={example.title} className="flex flex-col gap-2">
                  <header className="flex gap-2 items-center justify-between">
                    <section className="flex flex-col gap-0">
                      <h4 className="text-sm font-semibold">{example.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {example.description}
                      </p>
                    </section>
                    <CopyButton toCopy={example.code.trim()} />
                  </header>
                  <pre className="bg-accent rounded-md flex flex-col w-fit max-w-full">
                    <code
                      className="py-2 px-4 w-full font-mono text-sm whitespace-pre-wrap"
                      lang="tsx"
                    >
                      {example.code.trim()}
                    </code>
                  </pre>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                No examples available
              </p>
            </div>
          )}
        </ContentSection>
      </section>
    </div>
  );
}
