import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";

export function loader() {
  return {
    child: "from child",
  };
}

export default function Route() {
  const { child } = useLoaderData<typeof loader>();
  const { parent } = useOutletContext<{ parent: string }>();

  return (
    <div className="bg-slate-200 p-3">
      <p>render by routes/_parent.child.tsx</p>
      <p>useLoaderData: {child}</p>
      <p>useOutletContext: {parent}</p>
      <Outlet context={{ child }} />
    </div>
  );
}
