import Link from "next/link";

function renderText(text) {
  const parts = text.split(/(https?:\/\/[^\s]+|hello@agiledigitaledge\.com)/g);
  return parts.map((part, index) => {
    if (part.startsWith("http")) {
      return (
        <a
          key={index}
          href={part}
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      );
    }
    if (part === "hello@agiledigitaledge.com") {
      return (
        <a
          key={index}
          href="mailto:hello@agiledigitaledge.com"
          className="text-primary hover:underline"
        >
          {part}
        </a>
      );
    }
    if (part.includes("Agile Digital Edge Privacy Policy")) {
      const [before, after] = part.split("Agile Digital Edge Privacy Policy");
      return (
        <span key={index}>
          {before}
          <Link href="/privacy-policy" className="text-primary hover:underline">
            Agile Digital Edge Privacy Policy
          </Link>
          {after}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default function LegalPage({ title, effectiveDate, sections }) {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-gray-400">
            Effective Date: {effectiveDate}
            {" "}Website:{" "}
            <a
              href="https://agiledigitaledge.com"
              className="text-primary hover:underline"
            >
              https://agiledigitaledge.com
            </a>
          </p>
        </header>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
                {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-300 leading-relaxed mb-4 last:mb-0"
                >
                  {renderText(paragraph)}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc list-inside space-y-2 text-gray-300 leading-relaxed mb-4">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.paragraphsAfterList?.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-300 leading-relaxed mb-4 last:mb-0"
                >
                  {renderText(paragraph)}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
