import { useFetcher } from "@remix-run/react";

type FormData = {
  text: string;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const text = formData.get("text") as string;

  return {
    text,
  };
}

export default function Route() {
  const fetcher = useFetcher<FormData>();

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    fetcher.submit(formData, {
      method: "post",
    });
  }

  return (
    <div>
      <fetcher.Form method="post" onChange={handleChange}>
        <p>fetcher form</p>
        <input type="text" name="text" />
      </fetcher.Form>
      {fetcher.data && <p>{fetcher.data.text}</p>}
    </div>
  );
}
