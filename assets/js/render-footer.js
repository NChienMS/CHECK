function getBasePath() {
  const isGitHubPages = window.location.hostname.endsWith("github.io");
  if (!isGitHubPages) return "";
  const segment = window.location.pathname.split("/").filter(Boolean)[0] || "";
  return segment ? `/${segment}` : "";
}

function withBase(url) {
  const value = String(url || "").trim();
  if (!value || value === "#") return value || "#";
  if (/^(?:[a-z]+:)?\/\//i.test(value) || value.startsWith("mailto:") || value.startsWith("tel:") || value.startsWith("#")) {
    return value;
  }

  const base = getBasePath();
  const normalized = value.startsWith("/") ? value : `/${value}`;
  if (base && normalized.startsWith(`${base}/`)) return normalized;
  return `${base}${normalized}`;
}
// render-footer.js - xá»­ lÃ½ footer chung (contact/info/form/map)

window.initFooterUI = function (siteConfig) {
  // contact links
  const footerPhone = document.getElementById("footer-phone");
  const footerEmail = document.getElementById("footer-email");
  const footerMap = document.getElementById("footer-map");
  const footerSocial = document.getElementById("footer-social");

  const hotline = siteConfig?.contact?.hotlineNumber || siteConfig?.contact?.phoneFooter || "";
  if (footerPhone && hotline) {
    const tel = hotline.replace(/[^\d+]/g, "");
    footerPhone.setAttribute("href", `tel:${tel}`);
    footerPhone.textContent = hotline;
  }

  const email = siteConfig?.contact?.email || "";
  if (footerEmail && email) {
    footerEmail.setAttribute("href", `mailto:${email}`);
    footerEmail.textContent = email;
  }

  const mapUrl = siteConfig?.social?.googleMapEmbedUrl || "";
  if (footerMap && mapUrl) footerMap.setAttribute("src", mapUrl);

  // social icons
  if (footerSocial) {
    footerSocial.innerHTML = "";
    const socials = [];
    if (siteConfig?.social?.facebookPageUrl) socials.push({href: siteConfig.social.facebookPageUrl, title: 'Facebook', icon: `<img src="${withBase("/assets/img/general/fb.png")}" alt="Facebook">`});
    if (siteConfig?.contact?.zalo) socials.push({href: `https://zalo.me/${(siteConfig.contact.zalo||'').replace(/[^\d]/g,'')}`, title:'Zalo', icon: `<img src="${withBase("/assets/img/general/zalo.png")}" alt="Zalo">`});
    if (siteConfig?.social?.youtubeEmbedUrl) socials.push({href: siteConfig.social.youtubeEmbedUrl, title:'YouTube', icon: `<img src="${withBase("/assets/img/general/youtobe.png")}" alt="YouTube">`});
    if (siteConfig?.social?.tiktokUrl) socials.push({href: siteConfig.social.tiktokUrl, title:'TikTok', icon: `<img src="${withBase("/assets/img/general/tiktok.png")}" alt="TikTok">`}); // ensure tiktok.png is added to assets/img
    socials.forEach(s => {
      const a = document.createElement('a');
      a.href = s.href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.title = s.title;
      a.innerHTML = s.icon;
      footerSocial.appendChild(a);
    });
  }

  // consult form handling
  const form = document.getElementById('footer-consult-form');
  const msgEl = document.getElementById('consult-msg');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = (form.querySelector('[name="phone"]')?.value || '').replace(/[^\d+]/g, '').trim();
      const name = (form.querySelector('[name="name"]')?.value || '').trim();
      if (!phone || phone.length < 7) {
        if (msgEl) msgEl.textContent = 'Vui lÃ²ng nháº­p sá»‘ Ä‘iá»‡n thoáº¡i há»£p lá»‡.';
        return;
      }
      if (msgEl) msgEl.textContent = 'Cáº£m Æ¡n! ChÃºng tÃ´i sáº½ liÃªn há»‡ sá»›m.';
      form.reset();
      setTimeout(() => { if (msgEl) msgEl.textContent = ''; }, 5000);
    });
  }
};

window.renderFooterMenu = function (menuData) {
  const root = document.getElementById("footer-menu");
  if (!root) return;

  root.innerHTML = "";
  menuData.items.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = withBase(item.href || "#");
    a.textContent = item.title;
    li.appendChild(a);
    root.appendChild(li);
  });
};



