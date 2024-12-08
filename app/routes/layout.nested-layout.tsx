import { useLoaderData, useOutletContext } from "@remix-run/react";
import { NestedNestedLayout } from "~/components/nested-nested-layout";

export function loader() {
  return {
    nestedLayout: "loader data of nested-layout",
  };
}

export default function Route() {
  const { nestedLayout } = useLoaderData<typeof loader>();
  const { layout } = useOutletContext<{ layout: string }>();

  return (
    <div className="bg-slate-200 p-3">
      <p>rendered by routes/layout.nested-layout.tsx</p>
      <p>useLoaderData: {nestedLayout}</p>
      <p>useOutletContext: {layout}</p>
      <NestedNestedLayout />
    </div>
  );
}
