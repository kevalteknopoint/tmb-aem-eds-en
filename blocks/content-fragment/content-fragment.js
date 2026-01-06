import { fetchPlaceholders } from "../../scripts/placeholders.js";

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders();

  const graphqlUrl = `${placeholders.graphqlurl}genericContentByPath;path=`;

  try {
    const fragUrl = block?.querySelector("a")?.getAttribute("href");

    if (!fragUrl) return;

    const res = await fetch(`${graphqlUrl}${fragUrl}`);
    const data = await res.json();
    const cf = data?.data?.genericContentByPath?.item;

    if (!cf) return;

    const htmlContent = cf.blockContent.html;
    block.innerHTML = htmlContent;
  } catch (err) {
    console.error("Error loading PDP Customer:", err);
  }
}
