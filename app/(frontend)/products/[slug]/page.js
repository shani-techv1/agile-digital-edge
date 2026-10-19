import { notFound } from "next/navigation";
import ProductView from "../../../../components/products/ProductView";
import { productBySlug, products } from "../../../../data/products";
import { buildMetadata } from "../../../../lib/seo";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: `${product.name} | Agile Digital Edge`,
    description: product.summary,
    path: `/products/${product.slug}`,
    image: product.image,
  });
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();
  return <ProductView product={product} />;
}
