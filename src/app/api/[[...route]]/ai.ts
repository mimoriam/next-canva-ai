import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { replicate } from "@/lib/replicate";

const app = new Hono()
  .post(
    "/remove-bg",
    // verifyAuth(),
    zValidator(
      "json",
      z.object({
        image: z.string(),
      }),
    ),
    async (c) => {
      const { image } = c.req.valid("json");

      const input = {
        image: image,
      };

      const output: unknown = await replicate.run(
        "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
        { input },
      );

      const res = output as string;

      return c.json({ data: res });
    },
  )
  .post(
    "/generate-image",
    // verifyAuth(),
    zValidator(
      "json",
      z.object({
        prompt: z.string(),
      }),
    ),
    async (c) => {
      const { prompt } = c.req.valid("json");

      const input = {
        prompt: prompt,
        num_outputs: 1,
        aspect_ratio: "3:2",
        output_quality: 90,
        extra_lora_scale: 0.8,
        num_inference_steps: 50,
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
