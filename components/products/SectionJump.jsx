"use client";

export default function SectionJump() {
  function jump(event) {
    const id = event.currentTarget.getAttribute("data-jump");
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className="jump" aria-label="On this project">
      <a href="#made" data-jump="made" onClick={jump}>
        What we made
      </a>
      <a href="#how" data-jump="how" onClick={jump}>
        How we made it
      </a>
      <a href="#pages" data-jump="pages" onClick={jump}>
        Pages
      </a>
      {/* Pricing model section — hidden for now
      <a href="#pricing" data-jump="pricing" onClick={jump}>
        Pricing
      </a>
      */}
      <a href="#changed" data-jump="changed" onClick={jump}>
        What changed
      </a>
    </nav>
  );
}
