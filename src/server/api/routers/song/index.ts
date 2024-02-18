import { createTRPCRouter } from "../../trpc";
import { upload, update, list } from "./procedures";

export const songRouter = createTRPCRouter({
  upload,
  update,
  list,
});
