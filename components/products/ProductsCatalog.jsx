"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { products, typeLabel } from "../../data/products";

const filters = [
  { id: "all", label: "All" },
  { id: "core", label: "Core" },
  { id: "partnership", label: "Partnership" },
];

export default function ProductsCatalog() {
  const [filter, setFilter] = useState("all");
  const [shown, setShown] = useState("all");
  const [fading, setFading] = useState(false);
  const glideRef = useRef(null);
  const buttonsRef = useRef({});
  const timer = useRef(0);

  const visible = (shown === "all" ? products.slice() : products.filter((product) => product.type === shown))
    .sort((a, b) => Number(b.type === "core") - Number(a.type === "core"));

  function moveGlide() {
    const glide = glideRef.current;
    const active = buttonsRef.current[filter];
    if (!glide || !active) return;
    glide.style.width = `${active.offsetWidth}px`;
    glide.style.transform = `translateX(${active.offsetLeft}px)`;
  }

  useEffect(() => {
    const start = window.location.hash.replace("#", "");
    if (start === "core" || start === "partnership") {
      setFilter(start);
      setShown(start);
    }
  }, []);

  useLayoutEffect(() => {
    moveGlide();
  }, [filter, shown]);

  useEffect(() => {
    const onResize = () => moveGlide();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [filter]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function choose(next) {
    if (next === filter) return;
    setFilter(next);
    const hash = next === "all" ? "" : `#${next}`;
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
    window.clearTimeout(timer.current);
    setFading(true);
    timer.current = window.setTimeout(() => {
      setShown(next);
      setFading(false);
    }, 180);
  }

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

        <div className="toolbar">
          <div className="filters" role="group" aria-label="Filter products">
            <span className="filter-glide" ref={glideRef} aria-hidden="true" />
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                ref={(node) => {
                  buttonsRef.current[item.id] = node;
                }}
                aria-pressed={filter === item.id}
                onClick={() => choose(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <p className="result-line">Open a card to read the project.</p>
        <section className={`product-grid${fading ? " is-fading" : ""}`} aria-live="polite">
          {visible.map((product) => {
            const featured = shown === "all" && product.menu === 1;
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
        <div className={`empty${visible.length ? "" : " is-visible"}`}>
          No products in this group yet. Add one in the product list.
        </div>

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
