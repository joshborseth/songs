import { type Metadata } from "next";
import { type Props, generateAppMetadata } from "~/server/metadata/generate";
import { PageWrapper } from "../_components/PageWrapper";
import { Search } from "./components/Search";

export const generateMetadata = async (props: Props): Promise<Metadata> =>
  await generateAppMetadata(props);

export default async function Page() {
  return (
    <div className="h-full w-full">
      <PageWrapper pageTitle="Explore">
        <Search />
      </PageWrapper>
    </div>
  );
}
