import { Editor } from "@/app/features/editor/components/editor";
import { protectServer } from "@/app/features/auth/utils";

export default async function EditorProjectIdPage() {
  await protectServer();

  return <Editor />;
}
