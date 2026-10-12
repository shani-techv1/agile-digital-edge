import Link from "next/link";

export default function NotFound() {
  return (
    <article className="bg-black px-6 pb-24 pt-36 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold md:text-6xl">Page not found</h1>
        <p className="mt-6 text-lg text-neutral-300">That URL is not published. Check the address or go back to the homepage.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-black">
          Back to the homepage
        </Link>
      </div>
    </article>
  );
}
