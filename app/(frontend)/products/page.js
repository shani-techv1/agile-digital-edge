import ProductsCatalog from "../../../components/products/ProductsCatalog";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Products | Agile Digital Edge",
  description:
    "Products built by Agile Digital Edge. Browse core products and partnership builds, then open the full project.",
  path: "/products",
});

export default function ProductsPage() {
  return <ProductsCatalog />;
}
