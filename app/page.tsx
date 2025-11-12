import { appRoutes } from "@/lib/routes";
import CardRoute from "@/components/card-route";

export default function HomePage() {

  return (
    <main className="h-full w-full flex flex-col gap-6 overflow-scroll items-center justify-center">
      <div className="flex flex-wrap gap-4 w-full items-center justify-center max-w-7xl max-h-[20dvh] min-h-[12dvh] px-4">
        {appRoutes.map((item) => (
          <CardRoute key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
