## ネストしたレイアウト

`<Outlet/>`による route のネストは 1 回しかできない

```
routes/
├── layout.tsx ✅
└── layout.nested-layout.tsx ✅
└── layout.nested-layout.nested-nested-layout.tsx ❌
```

`/layout/nested-layout/nested-nested-layout`は 404 になる

## useLoadContext

Outlet が 1 階層しかネストできないので、Outlet の引数に渡して使用する `useLoaderContext` も孫のレイアウトでは使用できない

## action と useFetcher の使い分け

action は URL の変更が伴う操作に使用する
action 実行時は親 route の loader データを含めて revalidate される

useFetcher は URL を変更せずバックグラウンドで UI の更新を行う場合に使用する
