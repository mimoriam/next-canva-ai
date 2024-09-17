import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="relative size-8 shrink-0">
        <Image
          src="/favicon.ico"
          alt="Logo"
          fill
          className="shrink-0 transition hover:opacity-75"
        ></Image>
      </div>
    </Link>
  );
};
