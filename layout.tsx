import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "InferX AI", description: "AI assistant powered by OpenRouter" };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="id"><body>{children}</body></html>;
}
