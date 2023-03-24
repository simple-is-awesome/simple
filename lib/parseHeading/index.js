import { remark } from 'remark'
import { visit } from 'unist-util-visit'
import slug from 'remark-slug'

export default function parseHeading(contentMarkdown) {
	const headings = []
	remark()
		.use(slug)
		.use(() => (tree) => {
			visit(tree, 'heading', (node) => {
				// 只解析 h2 和 h3
				if (node.depth === 2 || node.depth === 3) {
					const id = node.data.id
					const heading = {
						depth: node.depth,
						value: node.children[0].value,
						id,
					}
					headings.push(heading)
				}
			})
		})
		.processSync(contentMarkdown)
	return headings
}
