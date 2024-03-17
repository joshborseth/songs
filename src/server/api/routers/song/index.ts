import { createTRPCRouter } from "../../trpc";
import { upload, update, list, deleteSong } from "./procedures";

export const songRouter = createTRPCRouter({
  upload,
  update,
  list,
  deleteSong,
});
