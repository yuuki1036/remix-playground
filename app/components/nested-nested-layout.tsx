import { useOutletContext } from "@remix-run/react";


export const NestedNestedLayout = () => {
  const { nestedLayout } = useOutletContext<{ nestedLayout: string }>();
  return (
    <div className="bg-slate-300 p-3">
      <p>rendered by app/components/nested-nested-layout.tsx</p>
      <p>outlet context: {nestedLayout}</p>
    </div>
  );
};
