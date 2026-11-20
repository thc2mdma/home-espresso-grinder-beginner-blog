/**
 * Generated articles repeat their own title as the first `# Heading`, while the
 * post layout already renders that title as the page's H1. Left alone the page
 * ships two H1s (an SEO fault) and shows the title twice.
 *
 * This plugin drops that leading H1 when it restates the front matter title,
 * and demotes any other H1 in the body to H2 so exactly one H1 survives.
 */
const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const textOf = (node) => {
  if (!node) return "";
  if (node.type === "text") return node.value;
  return (node.children || []).map(textOf).join("");
};

export default function rehypeArticleHeadings() {
  return (tree, file) => {
    const title = file?.data?.astro?.frontmatter?.title;
    const children = tree.children || [];
    let seenFirst = false;

    tree.children = children.filter((node) => {
      if (node.type !== "element" || node.tagName !== "h1") return true;
      if (!seenFirst) {
        seenFirst = true;
        // Same text as the layout's H1 → redundant, drop it entirely.
        if (title && normalize(textOf(node)) === normalize(title)) return false;
      }
      node.tagName = "h2";
      return true;
    });
  };
}
