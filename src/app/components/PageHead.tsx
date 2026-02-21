import { Helmet } from "react-helmet-async";

const BASE_URL = "https://context-vault.com";
const SITE_NAME = "Context Vault";
const DEFAULT_DESCRIPTION =
  "Context Vault gives Claude, Cursor, and MCP-compatible AI tools persistent memory across sessions. Local-first, open-core, and setup in under 5 minutes.";

type PageHeadProps = {
  title: string;
  description?: string;
  canonical: string;
};

export function PageHead({ title, description, canonical }: PageHeadProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const desc = description ?? DEFAULT_DESCRIPTION;
  const url = `${BASE_URL}${canonical}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}
