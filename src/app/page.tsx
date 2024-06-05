import { PageWrapper } from "./_components/PageWrapper";

export default async function Page() {
  return (
    <div className="h-full w-full">
      <PageWrapper pageTitle="Home">
        <div className="h-full bg-red-100"></div>
      </PageWrapper>
    </div>
  );
}
