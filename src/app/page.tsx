import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
      {/*<h1>Test</h1>*/}

      <Link href="/editor/1234">
        <Button>Editor</Button>
      </Link>
    </div>
  );
}
