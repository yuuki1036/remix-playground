import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";

type Todo = {
  id: string;
  text: string;
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const text = formData.get('text') as string;
  // 疑似DB保存
  const newTodo = await new Promise<Todo>((resolve) =>
    setTimeout(() => {
      resolve({
        id: Math.random().toString(36).substring(7),
        text,
      });
    }, 1000)
  );
  return { todo: newTodo };
}

export async function loader() {
  // 実際のアプリケーションではデータベースから取得
  return {
    todos: [
      { id: '1', text: '起きる' },
      { id: '2', text: '歯磨き' },
    ],
  };
}

export default function Todos() {
  const { todos } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<{ todo: Todo }>();
  const formRef = useRef<HTMLFormElement>(null);

  // 送信完了時にフォームをリセット
  useEffect(() => {
    if (fetcher.state === 'idle' && formRef.current) {
      formRef.current.reset();
    }
  }, [fetcher.state]);

  // 送信完了までの間に表示する一時的なデータ
  let optimisticTodos = [...todos];

  // フォーム送信時のデータをUIに反映
  if (fetcher.formData) {
    const text = fetcher.formData.get('text') as string;
    optimisticTodos = [
      ...todos,
      {
        // DBのデータと区別するためprefixをつける
        id: 'optimistic-' + Math.random(),
        text,
      },
    ];
  }

  // サーバーからの応答データを反映
  if (fetcher.data?.todo) {
    optimisticTodos = [...todos, fetcher.data.todo];
  }

  return (
    <div>
      <p>optimistic todo list</p>
      <fetcher.Form ref={formRef} method="post">
        <input type="text" name="text" required />
        <button type="submit">Add</button>
      </fetcher.Form>

      {/* 送信ステータス */}
      <p>status: {fetcher.state}</p>

      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id} className="list-disc">
            <span>{todo.text}</span>
            {todo.id.startsWith('optimistic') && <span>(保存中...)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}