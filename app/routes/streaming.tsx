import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export async function loader() {
  const lightData = "light";
  const heavyData = new Promise<string>(resolve => {
    setTimeout(() => {
      resolve("heavy");
    }, 3000);
  });
  return { lightData, heavyData };
}

export default function Route() {
  const { lightData, heavyData } = useLoaderData<typeof loader>();
  return <div>
    <p>streaming</p>
    <p>lightData: {lightData}</p>
    <Suspense fallback={<p>loading...</p>}>
      <Await resolve={heavyData}>
        {heavyData => <p>heavyData: {heavyData}</p>}
      </Await>
    </Suspense>
  </div>
}