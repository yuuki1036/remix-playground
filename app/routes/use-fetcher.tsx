import { useFetcher } from "@remix-run/react";
import { countries, Country } from "~/constants";

type FormData = {
  searchResults: Country[];
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const searchText = formData.get("text") as string;
  // 入力文字数に対して遅延をつける
  const delay = searchText.length * 500;

  // 疑似API呼び出し
  const searchResults = await new Promise<Country[]>(resolve => {
    setTimeout(() => {
      const filteredSuggestions = countries.filter((country) =>
        country.name.toLowerCase().includes(searchText.toLowerCase())
      );
      resolve(filteredSuggestions);
    }, delay);
  });

  return {
    searchResults
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
    <div className="p-24">
      <fetcher.Form method="post" onChange={handleChange}>
        <p>search form by useFetcher</p>
        <input type="text" name="text" />
      </fetcher.Form>
      <div>
        {fetcher.data?.searchResults.map((result) => (
          <div key={result.id}>{result.name}</div>
        ))}
      </div>
    </div>
  );
}
