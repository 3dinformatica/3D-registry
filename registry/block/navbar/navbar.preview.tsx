"use client";

import { useState } from "react";
import { Navbar } from "./navbar";
import { Button } from "@/components/ui/button";

export function NavbarPreview() {
  const [activeItem, setActiveItem] = useState<string>("home");

  return (
    <Navbar
      iconSrc="/3d-logo.png"
      iconHref="/"
      leading={[
        <Button
          key="home"
          variant={activeItem === "home" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveItem("home")}
        >
          Home
        </Button>,
        <Button
          key="about"
          variant={activeItem === "about" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveItem("about")}
        >
          About
        </Button>,
      ]}
      trailing={[
        <Button
          key="login"
          variant="outline"
          size="sm"
          onClick={() => setActiveItem("login")}
        >
          Login
        </Button>,
      ]}
    />
  );
}

