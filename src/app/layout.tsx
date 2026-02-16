import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
    <html lang="en">
      <body>{children}</body>
      {/* 把组件放在这里，并填入你的 ID */}
      <GoogleAnalytics gaId="G-G06J09XH2K" />
    </html>
  )
}


