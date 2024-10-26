import "./globals.css";

export const metadata = {
  title: "InventoRiz",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
          {children}
      </body>
    </html> 
  );
}