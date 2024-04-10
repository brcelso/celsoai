export const metadata = {
    title: "Kinde Auth",
    description: "Kinde with NextJS App Router",
  };
  
  export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    
    return (
      <html lang="en">
        <body>
          
          {children}
         
        </body>
      </html>
    );
  }