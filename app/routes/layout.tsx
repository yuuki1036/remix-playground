import { Outlet, useLoaderData } from "@remix-run/react"

export function loader() {
  return {
    layout: "loader data of layout",
  };
}

export default function Route() {
  const { layout } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen items-center justify-center p-2">
      <div className="bg-slate-100 p-3">
        <p>rendered by routes/layout.tsx</p>
        <p>useLoaderData: {layout}</p>
        <Outlet context={{ layout }} />
      </div>
    </div>
  );
}
