import { Outlet, useLoaderData } from "@remix-run/react"

export function loader() {
  console.log("parent loader called!")
  return {
    data: "loader data of action",
  };
}

export default function Route() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div>
      <Outlet />
      <p>loader data: {data}</p>
    </div>
  );
}
