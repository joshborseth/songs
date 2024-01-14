import { createTRPCRouter } from "../../trpc";
import { upload, update } from "./procedures";

export const songRouter = createTRPCRouter({
  upload,
  update,
});
