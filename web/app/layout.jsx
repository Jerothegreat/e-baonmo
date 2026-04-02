import "./globals.css";

export const metadata = {
  title: "E-baonmo Dashboard",
  description: "Local-first expense tracker dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
