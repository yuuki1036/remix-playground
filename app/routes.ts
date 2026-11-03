import {
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  route("action-layout", "routes/action-layout.tsx", [
    route("use-fetcher", "routes/action-layout.use-fetcher.tsx"),
    route("action", "routes/action-layout.action.tsx"),
  ]),
  route("auto-complete", "routes/auto-complete.tsx"),
  route("optimistic-ui", "routes/optimistic-ui.tsx"),
  route("use-fetcher", "routes/use-fetcher.tsx"),
  route("streaming", "routes/streaming.tsx"),
  layout("routes/_parent.tsx", [
    route("child", "routes/_parent.child.tsx", [
      route("nested-child", "routes/_parent.child.nested-child.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
