"use client";

import HooksContentView from "@/components/content-view-hooks";
import ListGroup from "@/components/list-group";
import RegistryBreadcrumb from "@/components/registry-breadcrumb";
import { Searchbar } from "@/components/searchbar";
import SectionTile from "@/components/tile-section";
import { Accordion } from "@/components/ui/accordion";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";
import { RegistryItem } from "@/lib/schema";
import registry from "@/registry";
import { useState } from "react";

export default function HooksPage() {
  const [query, setQuery] = useState("");
  const { activeSection, scrollToSection } = useIntersectionObserver();
  const [openAccordion, setOpenAccordion] = useState<string[]>(["Hooks"]);

  const hookItems = registry.items.filter(
    (item) => item.type === "registry:hook"
  );
  const [selectedItem, setSelectedItem] = useState<RegistryItem>(hookItems[0]);

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    scrollToSection(id);
  };

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
            title="Hooks"
            options={hookItems}
            selectedItem={selectedItem}
            onSelectedItem={setSelectedItem}
          />
        </Accordion>
      </div>
      <div key={'main-content'} className="h-full flex flex-5 flex-col gap-6 overflow-hidden">
        <RegistryBreadcrumb />
        <div className="overflow-y-auto flex-1">
          <HooksContentView registryItem={selectedItem} />
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
            label="Installation"
            href="#installation"
            active={activeSection === "installation"}
            onClick={(e) => handleSectionClick(e, "installation")}
          />
          <SectionTile
            label="Destination"
            href="#destination"
            active={activeSection === "destination"}
            onClick={(e) => handleSectionClick(e, "destination")}
          />
        </nav>
      </div>
    </main>
  );
}
