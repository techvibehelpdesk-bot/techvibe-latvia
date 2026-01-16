export const metadata = {
  title: 'TechVibe',
  description: 'TechVibe sludinājumu portāls',
};

export default function RootLayout({ children }) {
  return (
    <html lang="lv">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
