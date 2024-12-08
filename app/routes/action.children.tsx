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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children } = useLoaderData<typeof loader>();

  const fetcher = useFetcher();

  return (
    <div>
      <form method="post">
        <p>action form</p>
        <input type="text" name="text" />
        <button type="submit">submit</button>
      </form>
      <fetcher.Form method="post">
        <p>fetcher form</p>
        <input type="text" name="text" />
        <button type="submit">submit</button>
      </fetcher.Form>
    </div>
  );
}
