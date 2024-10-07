import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignUpCard } from "@/app/features/auth/components/sign-up-card";

const SignUpPage = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <SignUpCard />;
};

export default SignUpPage;
