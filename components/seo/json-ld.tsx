type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

// Escape "<" so content can never close the script tag early.
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
