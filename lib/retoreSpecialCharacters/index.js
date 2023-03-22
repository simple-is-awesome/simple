import { visit } from 'unist-util-visit';

export default function restoreSpecialCharacters() {
  return (tree) => {
    visit(tree, 'text', (node) => {
      node.value = node.value
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"');
    });
  };
}
