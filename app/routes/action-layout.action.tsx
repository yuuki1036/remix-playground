import { useLoaderData } from "@remix-run/react";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  console.log("submit data", formData)
  return null;
}

export function loader() {
  console.log("children loader called!")
  return {
    data: "loader data of children",
  };
}

export default function Route() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div>
      <form method="post">
        <p>action form</p>
        <input type="text" name="text" />
        <button type="submit">submit</button>
      </form>
      <p>loader data: {data}</p>
    </div>
  );
}
