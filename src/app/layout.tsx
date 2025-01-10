import Image from "next/image";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-wrap justify-center items-center content-evenly h-27 w-full border-b-2" >
          {/* <h1 className="text-4xl">Property Listings</h1> */}
          <Image src="/titlePhoto.jpeg" alt="" className="w-full" width={400} height={40}/>
        </div>
        {children}
      </body>
    </html>
  )
}
