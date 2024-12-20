import { Outlet, useLoaderData, useOutletContext, } from "@remix-run/react";

export function loader() {
  return {
    nestedChild: "from nested-child",
  };
}

export default function Route() {
  const { nestedChild } = useLoaderData<typeof loader>();
  const { parent, child } = useOutletContext<{ parent: string, child: string }>();
  return (
    <div className="bg-slate-300 p-3">
      <p>render by routes/_parent.child.nested-child.tsx</p>
      <p>useLoaderData: {nestedChild}</p>
      <p>useOutletContext(child): {child}</p>
      <p>useOutletContext(parent): {parent}</p>
      <Outlet />
    </div>
  );
}
