import Link from "next/link";
import ProductShot from "./ProductShot";
import SectionJump from "./SectionJump";
import { productAccents, typeLabel } from "../../data/products";

function host(url) {
  return String(url || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default function ProductView({ product }) {
  const accent = productAccents[product.slug] || "#6ea2ff";
  const liveHost = host(product.url);

  return (
    <article className="ade-project" style={{ "--accent": accent }}>
      <section className="stage">
        <div className="ade-wrap">
          <div className="stage-glass">
            <Link className="back" href="/products">
              ← All products
            </Link>
            <div className="chips">
              <span className="chip accent">{typeLabel[product.type]}</span>
              <span className="chip">{product.category}</span>
              <span className="chip">{product.platform}</span>
            </div>
            <h1>{product.name}</h1>
            <p className="lede">{product.summary}</p>
            <div className="actions">
              <a className="talk lg" href={product.url} target="_blank" rel="noopener noreferrer">
                See website
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="ade-wrap story">
        <SectionJump />

        <div className="browser">
          <div className="browser-bar">
            <i />
            <i />
            <i />
            <a href={product.url} target="_blank" rel="noopener noreferrer">
              {liveHost} →
            </a>
          </div>
          <ProductShot
            src={product.image}
            alt={`${product.name} ${product.shotLabel}`}
            href={product.url}
          />
        </div>

        <section className="section" id="made">
          <p className="kicker">01 — Scope</p>
          <h2>What we made</h2>
          <div className="made-grid">
            <div className="made-copy">
              <p>{product.made}</p>
            </div>
            <ul className="made-list">
              {product.madePoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="how">
          <p className="kicker">02 — Approach</p>
          <h2>How we made it</h2>
          <div className="how">
            {product.how.map((step, index) => (
              <article className="step" key={step.title}>
                <b>0{index + 1}</b>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="stack">
          <p className="kicker">03 — Stack</p>
          <h2>What we used</h2>
          <div className="pills">
            {product.stack.map((item) => (
              <span className="pill" key={item}>
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="section" id="pages">
          <p className="kicker">04 — The product</p>
          <h2>Pages and functionality</h2>
          <div className="sheets">
            {product.pages.map((page, index) => (
              <article className="sheet" key={page.name}>
                <span>0{index + 1}</span>
                <h3>{page.name}</h3>
                <p>{page.detail}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Pricing / project cost model section — hidden for now
        <section className="section" id="pricing">
          <p className="kicker">05 — Pricing</p>
          <h2>Our price to build this</h2>
          <p className="section-lead">{product.pricing.intro}</p>
          <div className="prices">
            {product.pricing.plans.map((plan) => (
              <article className={`price tone-${plan.tone}${plan.featured ? " featured" : ""}`} key={plan.name}>
                <h3>{plan.name}</h3>
                <div className="amount-wrap">
                  <p className="amount">
                    <small>{plan.currency || "$"}</small>
                    {plan.price || "—"}
                  </p>
                  <p className="period">{plan.period || "/ project"}</p>
                </div>
                <ul>
                  {plan.points.map((point) => (
                    <li key={point}>
                      <span>{point}</span>
                      <i aria-hidden="true" />
                    </li>
                  ))}
                </ul>
                <Link className="select" href={`/contact?product=${product.slug}&plan=${encodeURIComponent(plan.name)}`}>
                  Select
                </Link>
              </article>
            ))}
          </div>
        </section>
        */}

        <section className="section" id="changed">
          <p className="kicker">05 — Result</p>
          <h2>What changed</h2>
          <div className="impact">
            {product.impact.map((item) => (
              <article className="outcome" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="closer">
          <div>
            <h2>See the website</h2>
            <p>Open {product.name} on the live site.</p>
          </div>
          <div className="actions">
            <a className="talk lg" href={product.url} target="_blank" rel="noopener noreferrer">
              See website
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
