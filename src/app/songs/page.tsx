import { PageWrapper } from "../_components/PageWrapper";
import { DataTable } from "./DataTable";

export default async function Page() {
  return (
    <div className="h-full w-full">
      <PageWrapper pageTitle="Songs">
        <DataTable />
      </PageWrapper>
    </div>
  );
}
