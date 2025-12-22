"use client";

import { useParams } from "next/navigation";
import NewsCardGenerator from "../Components/NewsCardGenerator";

export default function Page() {
  const params = useParams();
  const categoryParam = params.category || "general";
  const category = Array.isArray(categoryParam)
    ? categoryParam[0]
    : categoryParam;

  return <NewsCardGenerator category={category} />;
}
