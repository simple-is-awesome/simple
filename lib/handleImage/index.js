import { visit } from 'unist-util-visit'

export default function rehypeWrapImage() {
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName === 'img') {
				const src = node.properties.src
				const alt = node.properties.alt || ''
				const a = {
					type: 'element',
					tagName: 'a',
					properties: {
						href: src,
						'data-fancybox': 'gallery',
						'data-caption': alt,
					},
					children: [node],
				}
				parent.children[index] = a
			}
		})
	}
}
