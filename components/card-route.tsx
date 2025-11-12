"use client";

import { CardDescription, CardTitle } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader } from "./ui/card";
import { AppRouteItem } from "@/lib/routes";
import Link from "next/link";

interface CardRouteProps {
    item: AppRouteItem;
}


export default function CardRoute(props: CardRouteProps) {
    const { item } = props;

    return (
        <Card key={item.id} className="w-1/4 cursor-pointer group hover:scale-98 transition-all h-full">
        <Link href={item.href}>
          <CardHeader className="flex flex-col gap-4">
            <CardTitle className="flex items-center gap-1 group-hover:underline text-foreground font-bold text-lg">{item.title}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-all" />
            </CardTitle>
            <CardDescription className="text-foreground text-base">{item.description}</CardDescription>
          </CardHeader>
        </Link>
      </Card>
    )
}