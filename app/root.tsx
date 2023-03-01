import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Header } from "./components/header";

import reset from "@unocss/reset/tailwind.css";
import styles from "~/styles/app.css";
import unocss from "~/styles/uno.css";

export const links: LinksFunction = () => [
  {
    rel: "preload",
    href: "/fonts/Inter.var.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  // styles
  { rel: "stylesheet", href: reset },
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: unocss },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "kirdes.dev",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-black color-white">
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
