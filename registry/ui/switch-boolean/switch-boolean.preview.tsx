"use client";

import { useState } from "react";
import { BooleanSwitch } from "./switch-boolean";


export function SwitchBooleanPreview() {
  const [checked, setChecked] = useState(false);
  return <BooleanSwitch  checked={checked} onCheckedChange={setChecked} />;
}