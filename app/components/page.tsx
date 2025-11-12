"use client";

import SectionTile from "@/components/tile-section";
import ComponentContentView from "@/components/content-view-components";
import ListGroup from "@/components/list-group";
import RegistryBreadcrumb from "@/components/registry-breadcrumb";
import { Searchbar } from "@/components/searchbar";
import { Accordion } from "@/components/ui/accordion";
import { RegistryItem } from "@/lib/schema";
import registry from "@/registry";
import { useMemo, useState } from "react";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";

export default function ComponentsPage() {
  const [query, setQuery] = useState("");
  const { activeSection, scrollToSection } = useIntersectionObserver();

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    scrollToSection(id);
  };

  const uiItems: RegistryItem[] = useMemo(() => {
    return registry.items
      .filter((item) => item.type === "registry:ui")
      .filter((item) => item.title!.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.title!.localeCompare(b.title!)) as RegistryItem[];
  }, [query]);

  const blockItems: RegistryItem[] = useMemo(() => {
    return registry.items
      .filter((item) => item.type === "registry:block")
      .filter((item) => item.title!.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.title!.localeCompare(b.title!)) as RegistryItem[];
  }, [query]);

  const [openAccordion, setOpenAccordion] = useState<string[]>(["Block", "UI"]);
  const [selectedItem, setSelectedItem] = useState<RegistryItem>(uiItems[0]);

  return (
    <main className="h-full w-full flex overflow-hidden gap-10">
      <div key={'left-panel'} className="flex h-full w-1/6 flex-col gap-2 overflow-hidden">
        <section className="w-full pl-0 pr-2">
          <Searchbar
            className="w-full"
            value={query}
            onChange={(value) => setQuery(value)}
          />
        </section>
        <Accordion
          type="multiple"
          className="flex flex-col gap-0"
          value={openAccordion}
          onValueChange={(value) => setOpenAccordion(value)}
        >
          <ListGroup
            iconName="Folder"
            title="Block"
            options={blockItems}
            selectedItem={selectedItem}
            onSelectedItem={setSelectedItem}
          />
          <ListGroup
            iconName="Folder"
            title="UI"
            options={uiItems}
            selectedItem={selectedItem}
            onSelectedItem={setSelectedItem}
          />
        </Accordion>
      </div>
      <div key={'main-content'} className="h-full flex flex-5 flex-col gap-6 overflow-hidden">
        <RegistryBreadcrumb />
        <div className="overflow-y-auto flex-1">
          <ComponentContentView registryItem={selectedItem} />
        </div>
      </div>
      <div key={'page-anchors'} className="h-full flex flex-1 flex-col gap-2">
        <p>On this page</p>
        <nav className="flex flex-col gap-1">
          <SectionTile
            label="Description"
            href="#description"
            active={activeSection === "description"}
            onClick={(e) => handleSectionClick(e, "description")}
          />
          <SectionTile
            label="Preview"
            href="#preview"
            active={activeSection === "preview"}
            onClick={(e) => handleSectionClick(e, "preview")}
          />
          <SectionTile
            label="Installation"
            href="#installation"
            active={activeSection === "installation"}
            onClick={(e) => handleSectionClick(e, "installation")}
          />
          <SectionTile
            label="Dependencies"
            href="#dependencies"
            active={activeSection === "dependencies"}
            onClick={(e) => handleSectionClick(e, "dependencies")}
          />
          <SectionTile
            label="Destination"
            href="#destination"
            active={activeSection === "destination"}
            onClick={(e) => handleSectionClick(e, "destination")}
          />
          <SectionTile
            label="Usage"
            href="#usage"
            active={activeSection === "usage"}
            onClick={(e) => handleSectionClick(e, "usage")}
          />
        </nav>
      </div>
    </main>
  );
}
