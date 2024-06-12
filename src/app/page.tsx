import { type Metadata } from "next";
import { type Props, generateAppMetadata } from "~/server/metadata/generate";

export const generateMetadata = async (props: Props): Promise<Metadata> =>
  await generateAppMetadata(props);

export default async function Page() {
  return <div className="h-full w-full" />;
}
