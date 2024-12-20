import { Outlet, useLoaderData } from "@remix-run/react"

export function loader() {
  return {
    parent: "from parent",
  };
}

export default function Route() {
  const { parent } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen items-center justify-center p-2">
      <div className="bg-slate-100 text-black p-3">
        <p>render by routes/_parent.tsx</p>
        <p>useLoaderData: {parent}</p>
        <Outlet context={{ parent }} />
      </div>
    </div>
  );
}
