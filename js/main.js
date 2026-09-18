/* ===== Personal profile site — rendering & interactions ===== */
(() => {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const filled = (v) => typeof v === "string" && v.trim() !== "" && !v.startsWith("TODO:");

  /* ---------- Social icons ---------- */
  const ICONS = {
    facebook: '<path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.79 8.44-4.95 8.44-9.94Z"/>',
    github: '<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"/>',
    linkedin: '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/>',
    instagram: '<path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"/>',
    x: '<path d="M18.9 2H22l-7.1 8.1L23.2 22h-6.6l-5.2-6.8L5.5 22H2.4l7.6-8.7L1.1 2h6.8l4.7 6.2L18.9 2Zm-1.1 18h1.7L7.3 3.7H5.5L17.8 20Z"/>',
    youtube: '<path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z"/>',
    website: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.93 9h-3.02a15.6 15.6 0 0 0-1.2-5.42A8.03 8.03 0 0 1 19.93 11ZM12 4.04c.83 1.2 1.72 3.3 1.9 6.96h-3.8c.18-3.66 1.07-5.76 1.9-6.96ZM4.07 13h3.02c.12 2.05.53 3.88 1.2 5.42A8.03 8.03 0 0 1 4.07 13Zm3.02-2H4.07a8.03 8.03 0 0 1 4.22-5.42A15.6 15.6 0 0 0 7.09 11ZM12 19.96c-.83-1.2-1.72-3.3-1.9-6.96h3.8c-.18 3.66-1.07 5.76-1.9 6.96Zm3.71-1.54c.67-1.54 1.08-3.37 1.2-5.42h3.02a8.03 8.03 0 0 1-4.22 5.42Z"/>',
  };
  const icon = (name) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.website}</svg>`;

  /* ---------- Hero ---------- */
  const fullName = filled(profile.name) ? profile.name : (profile.nameEn || "");
  const firstWord = fullName.split(" ")[0] || fullName;

  document.title = fullName ? `${fullName} — โปรไฟล์ส่วนตัว` : "โปรไฟล์ส่วนตัว";
  $("#brandName").textContent = fullName || "Profile";
  $("#brandMark").textContent = (profile.nameEn || fullName || "K").trim().charAt(0).toUpperCase();
  $("#footerName").textContent = fullName;
  $("#year").textContent = new Date().getFullYear() + 543;

  $("#heroBadge").innerHTML = profile.available
    ? '<span class="dot"></span> เปิดรับโอกาสใหม่ ๆ'
    : "<span>สวัสดีครับ 👋</span>";

  $("#heroName").innerHTML = fullName
    ? `${esc(firstWord)} <span class="grad">${esc(fullName.slice(firstWord.length).trim())}</span>`
    : "โปรไฟล์";
  $("#heroHeadline").textContent = profile.headline || "";
  $("#heroTagline").textContent = profile.tagline || "";
  $("#heroLocation").textContent = filled(profile.location) ? `📍 ${profile.location}` : "";

  const avatar = $("#heroAvatar");
  const fallback = $("#photoFallback");
  fallback.innerHTML = `<span>${esc((profile.nameEn || fullName || "K").charAt(0).toUpperCase())}</span>`;
  if (filled(profile.avatar)) {
    avatar.src = profile.avatar;
    avatar.alt = `รูปโปรไฟล์ของ ${fullName}`;
    avatar.addEventListener("error", () => { avatar.hidden = true; });
  } else {
    avatar.hidden = true;
  }

  /* ---------- Socials ---------- */
  const socials = (profile.socials || []).filter((s) => filled(s.url));
  const renderSocials = (node) => {
    if (!node) return;
    if (!socials.length) { node.remove(); return; }
    socials.forEach((s) => {
      const li = el("li");
      const a = el("a");
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = `${icon(s.icon)}<span>${esc(s.name)}</span>`;
      li.append(a);
      node.append(li);
    });
  };
  renderSocials($("#heroSocials"));
  renderSocials($("#contactSocials"));

  /* ---------- Stats ---------- */
  const stats = $("#stats");
  (profile.stats || []).forEach((s) =>
    stats.append(el("li", null, `<b>${esc(s.value)}</b><span>${esc(s.label)}</span>`)));
  if (!stats.children.length) stats.remove();

  /* ---------- About ---------- */
  const aboutText = $("#aboutText");
  (profile.about || []).forEach((p) => aboutText.append(el("p", null, esc(p))));

  const interests = $("#interests");
  (profile.interests || []).forEach((i) => interests.append(el("li", null, esc(i))));
  if (!interests.children.length) interests.closest(".interests").remove();

  /* ---------- Timelines ---------- */
  const renderTimeline = (listId, items) => {
    const list = document.getElementById(listId);
    if (!items || !items.length) { list.closest("div").remove(); return; }
    items.forEach((it) => {
      const li = el("li");
      li.innerHTML = `
        <div class="tl-period">${esc(it.period)}</div>
        <h4 class="tl-role">${esc(it.role)}</h4>
        <div class="tl-org">${esc(it.org)}</div>
        ${filled(it.detail) ? `<p class="tl-detail">${esc(it.detail)}</p>` : ""}
        ${(it.tags || []).length ? `<ul class="tags">${it.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}`;
      list.append(li);
    });
  };
  renderTimeline("experience-list", profile.experience);
  renderTimeline("education-list", profile.education);

  /* ---------- Skills ---------- */
  const skillsGrid = $("#skills-grid");
  (profile.skills || []).forEach((g) => {
    const card = el("div", "card skill-card");
    card.innerHTML = `<h3>${esc(g.group)}</h3><ul>${(g.items || []).map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    skillsGrid.append(card);
  });
  if (!skillsGrid.children.length) $("#skills").remove();

  /* ---------- Projects ---------- */
  const projectsGrid = $("#projects-grid");
  (profile.projects || []).forEach((p) => {
    const card = el("article", "card project");
    const thumb = filled(p.image)
      ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">`
      : `<span class="ph">${esc((p.title || "?").charAt(0))}</span>`;
    card.innerHTML = `
      <div class="project-thumb">${thumb}</div>
      <div class="project-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
        ${(p.tags || []).length ? `<ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
        ${filled(p.link) ? `<a class="project-link" href="${esc(p.link)}" target="_blank" rel="noopener noreferrer">ดูผลงาน →</a>` : ""}
      </div>`;
    projectsGrid.append(card);
  });
  if (!projectsGrid.children.length) $("#projects").remove();

  /* ---------- Contact ---------- */
  const contactList = $("#contact-list");
  const c = profile.contact || {};
  const entries = [
    filled(c.email) && { href: `mailto:${c.email}`, label: c.email, emoji: "✉️" },
    filled(c.phone) && { href: `tel:${c.phone.replace(/[^\d+]/g, "")}`, label: c.phone, emoji: "📞" },
    filled(c.line) && { href: `https://line.me/ti/p/~${encodeURIComponent(c.line)}`, label: `LINE: ${c.line}`, emoji: "💬" },
  ].filter(Boolean);
  entries.forEach((e) => {
    const li = el("li");
    li.innerHTML = `<a href="${esc(e.href)}"><span aria-hidden="true">${e.emoji}</span>${esc(e.label)}</a>`;
    contactList.append(li);
  });
  if (!entries.length) contactList.remove();

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  const saved = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;
  else if (window.matchMedia("(prefers-color-scheme: light)").matches) root.dataset.theme = "light";

  $("#themeBtn").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch { /* ignore */ }
  });

  /* ---------- Mobile menu ---------- */
  const menuBtn = $("#menuBtn");
  const navLinks = $(".nav-links");
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Sticky nav shadow + active link ---------- */
  const nav = $("#nav");
  const links = [...document.querySelectorAll(".nav-links a")];
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));

    /* ---------- Reveal on scroll ---------- */
    const reveals = document.querySelectorAll(".section, .hero-text, .hero-photo, .stats");
    const obs = new IntersectionObserver((ents, o) => {
      ents.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        o.unobserve(en.target);
      });
    }, { threshold: 0.08 });
    reveals.forEach((r) => { r.classList.add("reveal"); obs.observe(r); });
  }
})();
