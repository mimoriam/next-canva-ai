import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { replicate } from "@/lib/replicate";

const app = new Hono().post(
  "/generate-image",
  zValidator(
    "json",
    z.object({
      prompt: z.string(),
    }),
  ),
  async (c) => {
    const { prompt } = c.req.valid("json");

    const input = {
      cfg: 3.5,
      steps: 28,
      prompt: prompt,
      aspect_ratio: "3:2",
      output_format: "webp",
      output_quality: 90,
      negative_prompt: "",
      prompt_strength: 0.85,
    };

    const output = await replicate.run(
      "igorriti/flux-360:d26037255a2b298408505e2fbd0bf7703521daca8f07e8c8f335ba874b4aa11a",
      {
        input,
      },
    );

    const res = output as Array<string>;

    return c.json({ data: res[0] });
  },
);

export default app;
