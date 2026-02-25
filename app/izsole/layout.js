export const metadata = {
  title: 'Techvibe Izsoles',
  description: 'Izsoļu sistēma',
};

export default function RootLayout({ children }) {
  return (
    <html lang="lv">
      <body>{children}</body>
    </html>
  );
}
