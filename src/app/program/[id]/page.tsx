import { ProgramDetailContent } from "./program-detail-content";

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  
  return <ProgramDetailContent id={resolvedParams.id} />;
}