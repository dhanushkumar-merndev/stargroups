import type { ReactNode } from "react";

/**
 * Renders company names with the brand-consistent red accent on specific
 * venture keywords, matching the official identity in /public/company-logo.
 *
 * Examples:
 * - Starline Solutions       -> Starline [Solutions] (red)
 * - Star Production House    -> Star [Production] (red) House
 * - Star Tech India          -> Star [Tech] (red) India
 * - Star Growth Hub          -> Star [Growth] (red) Hub
 * - Star Infra Developers    -> Star [Infra] (red) Developers
 * - Star Venture Capital     -> Star [Venture] (red) Capital
 * - Starline Import & Export -> Starline [Import] (red) & [Export] (red)
 * - MAC Reality              -> [MAC] (red) Reality
 */
export function BrandCompanyName({
  slug,
  name,
}: {
  slug: string;
  name: string;
}): ReactNode {
  switch (slug) {
    case "starline-solutions":
      return (
        <>
          <span>Starline </span>
          <span className="text-sg-red">Solutions</span>
        </>
      );
    case "star-production-house":
      return (
        <>
          <span>Star </span>
          <span className="text-sg-red">Production</span>
          <span> House</span>
        </>
      );
    case "star-tech-india":
      return (
        <>
          <span>Star </span>
          <span className="text-sg-red">Tech</span>
          <span> India</span>
        </>
      );
    case "star-growth-hub":
      return (
        <>
          <span>Star </span>
          <span className="text-sg-red">Growth</span>
          <span> Hub</span>
        </>
      );
    case "star-infra-developers":
      return (
        <>
          <span>Star </span>
          <span className="text-sg-red">Infra</span>
          <span> Developers</span>
        </>
      );
    case "star-capital-venture":
      return (
        <>
          <span>Star </span>
          <span className="text-sg-red">Venture</span>
          <span> Capital</span>
        </>
      );
    case "starline-import-export":
      return (
        <>
          <span>Starline </span>
          <span className="text-sg-red">Import</span>
          <span> &amp; </span>
          <span className="text-sg-red">Export</span>
        </>
      );
    case "mac-reality":
      return (
        <>
          <span className="text-sg-red">MAC</span>
          <span> Reality</span>
        </>
      );
    case "land-in-coorg":
      return (
        <>
          <span>Land in </span>
          <span className="text-sg-red">Coorg</span>
        </>
      );
    default:
      return <span>{name}</span>;
  }
}
