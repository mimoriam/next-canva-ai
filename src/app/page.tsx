import { auth, signIn } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <h4>{JSON.stringify(session)}</h4>

      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/" });
        }}
      >
        <Button type="submit">Signin with GitHub</Button>
      </form>
      <Link href="/editor/1234">
        <Button>Editor</Button>
      </Link>
    </div>
  );
}
