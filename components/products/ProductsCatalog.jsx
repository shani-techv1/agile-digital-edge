import Link from "next/link";
import { products, typeLabel } from "../../data/products";

export default function ProductsCatalog() {
  const visible = products.slice().sort((a, b) => a.menu - b.menu);

  return (
    <div className="ade-catalog">
      <div className="ade-wrap">
        <section className="hero">
          <div className="eyebrow">
            <i /> Products
          </div>
          <h1>
            Products built by <em>Agile Digital Edge</em>
          </h1>
          <p className="lede">
            Open a product to see the full project: what we made, how we made it, the pages, and what changed. The live
            website is there if you want to visit it.
          </p>
        </section>

        <p className="result-line">Open a card to read the project.</p>
        <section className="product-grid">
          {visible.map((product) => {
            const featured = product.menu === 1;
            return (
              <Link
                key={product.slug}
                className={`card${featured ? " featured" : ""}`}
                href={`/products/${product.slug}`}
              >
                <div className="cover">
                  <span className="badge">{typeLabel[product.type]}</span>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="card-body">
                  <p className="meta">
                    {product.category} · {product.platform}
                  </p>
                  <h2>{product.name}</h2>
                  <p className="summary">{product.summary}</p>
                  <span className="open">View project →</span>
                </div>
              </Link>
            );
          })}
        </section>

        <section className="cta">
          <div>
            <h2>Products built by Agile Digital Edge</h2>
            <p>Open a product to see the project, then visit the live website.</p>
          </div>
          <div className="cta-actions">
            <Link className="talk" href="/contact">
              Let&apos;s Talk
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
