import { useFetcher, useLoaderData } from "@remix-run/react";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  console.log("submit data", formData)

  return null;
}

export function loader() {
  console.log("children loader called!")
  return {
    children: "loader data of children",
  };
}

export default function Route() {
  const { children } = useLoaderData<typeof loader>();

  const fetcher = useFetcher();

  return (
    <div>
      <fetcher.Form method="post">
        <p>fetcher form</p>
        <input type="text" name="text" />
        <button type="submit">submit</button>
      </fetcher.Form>
      <p>children: {children}</p>
    </div>
  );
}
