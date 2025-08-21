import ClientAuthForm from "@/components/ClientAuthForm";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const modeParam = params?.mode;
  const mode = Array.isArray(modeParam) ? modeParam[0] : modeParam;

  return <ClientAuthForm mode={mode} />;
}
