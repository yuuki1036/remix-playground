import { Outlet, useLoaderData } from "@remix-run/react"

export function action() {
  console.log("parent action called!")
}

export function loader() {
  console.log("parent loader called!")
  return {
    action: "loader data of action",
  };
}

export default function Route() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { action } = useLoaderData<typeof loader>();

  return (
    <div>
      <Outlet />
    </div>
  );
}
