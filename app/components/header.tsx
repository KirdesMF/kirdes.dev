import { Link, NavLink } from "@remix-run/react";
import { BurgerIcon } from "./icons/burger";
import { GithubIcon } from "./icons/github";
import { TwitterIcon } from "./icons/twitter";
import { clsx } from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

const socials = [
  { href: "", label: "GitHub", icon: GithubIcon },
  { href: "", label: "Twitter", icon: TwitterIcon },
];

function MainMenu() {
  return (
    <ul className="flex items-center gap-x-4 color-neutral">
      {links.map((link) => (
        <li key={link.label}>
          <NavLink
            to={link.href}
            className={({ isActive }) =>
              clsx(
                "text-sm font-300 transition-color transition-font-weight duration-200",
                isActive && "font-600 color-teal-200"
              )
            }
          >
            <span>{link.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

function SocialMenu() {
  return (
    <ul className="flex items-center gap-x-4 color-gray-200/25">
      {socials.map((link) => {
        const Icon = link.icon;
        return (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm font-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Main header component
 */
export function Header() {
  return (
    <header className="fixed z-10 w-full">
      <nav className="ma-auto h-[70px] w-[min(100%,75rem)] flex items-center justify-between px-8 py-4">
        <Link to="/" className="text-sm font-600">
          kirdes.<span className="color-teal-400">dev</span>
        </Link>

        <button
          className="md:hidden"
          aria-expanded="false"
          aria-controls="main-menu"
        >
          <span className="sr-only">Toggle Dark Mode</span>
          <BurgerIcon />
        </button>

        <div className="hidden gap-x-10 md:flex">
          <MainMenu />
          <SocialMenu />
        </div>
      </nav>
    </header>
  );
}
