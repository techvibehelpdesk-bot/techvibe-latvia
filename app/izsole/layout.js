import './globals.css';  // Ja ir, vai izveido tukšu

export const metadata = {
  title: 'Techvibe Izsoles',
  description: 'Izsoļu sistēma',
};

export default function RootLayout({ children }) {
  return (
    <html lang="lv">
      <body className="antialiased">{children}</body>
    </html>
  );
}
