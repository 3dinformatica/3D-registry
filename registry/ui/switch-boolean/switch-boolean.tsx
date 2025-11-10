import { Switch } from "@/components/ui/switch";

interface BooleanSwitchProps {
  label?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function BooleanSwitch(props: BooleanSwitchProps) {
  const { label = "Disable", checked, onCheckedChange } = props;

  return (
    <div
      onClick={() => onCheckedChange(!checked)}
      className="bg-accent/20 flex items-center gap-2 rounded-md border px-2 py-1.5"
    >
      <p className="text-sm font-normal">{label}</p>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
