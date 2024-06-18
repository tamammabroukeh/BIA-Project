import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { IChildren } from "@/interfaces/interfaces";
import { Metadata } from "next";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://bia-tsp-project.vercel.app/"),
  title: {
    default: "BIA HW",
    template: "%s | BIA",
  },
  description:
    "I`m Tammam Mabroukeh. I`m Software Engineer, I code in JavaScript, especially ReactJS and NextJS. This project is about the traveling salesman algorithm. The project takes income from the user, representing the capacity of the trucks that will distribute the items and the value of each item, in addition to the city to which the item will go, as well as the distance between all cities, and then the algorithm distributes the trucks to the goods in the optimal way.",
  icons: "/nextjs.svg",
  openGraph: {
    title: "BIA HW",
    description:
      "I`m Tammam Mabroukeh. I`m Software Engineer, I code in JavaScript, especially ReactJS and NextJS. This project is about the traveling salesman algorithm. The project takes income from the user, representing the capacity of the trucks that will distribute the items and the value of each item, in addition to the city to which the item will go, as well as the distance between all cities, and then the algorithm distributes the trucks to the goods in the optimal way.",
    url: "https://bia-tsp-project.vercel.app/",
    images: [
      {
        url: "../public/images.jpg",
        width: 1200,
        height: 630,
        href: "https://www.google.com/imgres?q=tsp%20problem%20images&imgurl=https%3A%2F%2Fmiro.medium.com%2Fv2%2Fresize%3Afit%3A679%2F0*X69vJTYh6Dxa2W_X&imgrefurl=https%3A%2F%2Fmedium.com%2Fstanford-cs224w%2Ftackling-the-traveling-salesman-problem-with-graph-neural-networks-b86ef4300c6e&docid=MV7KxADWw8M5jM&tbnid=UkKiNHKDckPxtM&vet=12ahUKEwir6-vXouWGAxXVUKQEHV-YCZ44ChAzegQIbBAA..i&w=648&h=380&hcb=2&ved=2ahUKEwir6-vXouWGAxXVUKQEHV-YCZ44ChAzegQIbBAA",
        alt: "Open Graph image",
      },
    ],
    type: "website",
    emails: "tamammb367@gmail.com",
  },
};
export default function RootLayout({ children }: IChildren) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.variable,
          "bg-background text-foreground font-inter"
        )}
      >
        {children}
      </body>
    </html>
  );
}
