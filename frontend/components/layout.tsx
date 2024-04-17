"use client";
import Head from "next/head";
import { useState } from "react";

interface LayoutProps {
  children?: React.ReactNode;
}
export const navLinks = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "#",
    title: "Company",
  },
  {
    id: "#",
    title: "Products",
  },
  {
    id: "#",
    title: "Blogs",
  },
];

export default function Layout({ children }: LayoutProps) {
  const [active, setActive] = useState("Home");
  //   const [toggle, setToggle] = useState(false);
  return (
    <div>
      <nav className="w-full py-6 navbar">
        <ul className="list-none sm:flex hidden justify-evenly items-center mr-10">
          <a href="#" target="_blank">
            <img src="logo.png" width="60" alt="logo" />
          </a>
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] hover:text-white ${
                active === nav.title ? "text-white" : "colorOrange"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container mx-auto">
        <Head>
          <title>DFS</title>
        </Head>
        <main>{children}</main>
      </div>
    </div>
  );
}
