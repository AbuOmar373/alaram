export async function readJson(request: Request, limit = 32_000): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader || !request.headers.get("content-type")?.startsWith("application/json"))
    throw new Error("Invalid request");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const next = await reader.read();
    if (next.done) break;
    size += next.value.length;
    if (size > limit) {
      await reader.cancel();
      throw new Error("Request too large");
    }
    chunks.push(next.value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
