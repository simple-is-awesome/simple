import parseHeading from 'lib/parseHeading';

export default function Sidebar({ contentMarkdown, showtoc }) {
  const headings = parseHeading(contentMarkdown);
  return (
    <>
      {showtoc && (
        <nav className="flex justify-center items-center p-4 my-5">
          <ul className="w-full">
            {headings.map((heading, index) => (
              <li key={index} className={`level-${heading.depth} text-center`}>
                {heading.value}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
