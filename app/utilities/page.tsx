"use client";

import UtilityContentView from "@/components/content-view-utils";
import ListGroup from "@/components/list-group";
import RegistryBreadcrumb from "@/components/registry-breadcrumb";
import { Searchbar } from "@/components/searchbar";
import SectionTile from "@/components/tile-section";
import { Accordion } from "@/components/ui/accordion";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";
import { RegistryItem } from "@/lib/schema";
import registry from "@/registry";
import { useState, useMemo, useEffect } from "react";

export default function UtilitiesPage() {
  const [query, setQuery] = useState("");
  const { activeSection, scrollToSection } = useIntersectionObserver();
  const [openAccordion, setOpenAccordion] = useState<string[]>(["Utilities"]);

  const utilItems: RegistryItem[] = useMemo(() => {
    const filtered = registry.items
      .filter((item) => item.type === "registry:lib")
      .filter((item) => item.title!.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.title!.localeCompare(b.title!)) as RegistryItem[];
    
    // Debug: log to see what's being filtered
    if (process.env.NODE_ENV === "development") {
      console.log("All registry items:", registry.items.map(i => ({ name: i.name, type: i.type })));
      console.log("Filtered utils items:", filtered.map(i => ({ name: i.name, title: i.title })));
    }
    
    return filtered;
  }, [query]);

  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);

  // Update selectedItem when utilsItems changes
  useEffect(() => {
    if (utilItems.length > 0 && !selectedItem) {
      setSelectedItem(utilItems[0]);
    } else if (utilItems.length > 0 && selectedItem) {
      // If query changed, try to keep the same item if it's still in the filtered list
      const stillExists = utilItems.find((item) => item.name === selectedItem.name);
      if (!stillExists) {
        setSelectedItem(utilItems[0]);
      }
    }
  }, [utilItems, selectedItem]);

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    scrollToSection(id);
  };

  if (utilItems.length === 0) {
    return (
      <main className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">No Utilities Available</h1>
          <p className="text-muted-foreground">
            Add utility functions to the registry to see them here.
          </p>
        </div>
      </main>
    );
  }

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
            title="Utilities"
            options={utilItems}
            selectedItem={selectedItem}
            onSelectedItem={setSelectedItem}
          />
        </Accordion>
      </div>
      <div key={'main-content'} className="h-full flex flex-5 flex-col gap-6 overflow-hidden">
        <RegistryBreadcrumb />
        <div className="overflow-y-auto flex-1">
          {selectedItem && <UtilityContentView registryItem={selectedItem} />}
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
          <SectionTile
            label="Code"
            href="#code"
            active={activeSection === "code"}
            onClick={(e) => handleSectionClick(e, "code")}
          />
        </nav>
      </div>
    </main>
  );
}

