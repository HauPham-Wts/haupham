# Portfolio Deploy Checklist

Use this checklist before publishing.

## 0) Quick Replace Map (Must Do)
- [ ] Replace primary domain in index.html:10, index.html:15, index.html:16, index.html:22, index.html:37.
	- Current value: https://haupham.dev/
	- Replace with: your real public portfolio URL (for example https://yourname.dev/).
- [ ] Replace project links in index.html:333, index.html:334, index.html:350, index.html:351, index.html:367, index.html:368.
	- Current values: https://github.com and https://example.com
	- Replace with: real case-study/source/demo links.
- [ ] Replace social profile links in index.html:485, index.html:486, index.html:487 and JSON-LD links in index.html:45, index.html:46, index.html:47.
	- Current values: generic GitHub/LinkedIn/Dribbble homepages
	- Replace with: your exact profile URLs.
- [ ] Replace contact email in index.html:38, index.html:476, index.html:477, index.html:550.
	- Current value: haupham.dev@gmail.com
	- Replace with: your preferred contact email.
- [ ] Configure Formspree endpoint in index.html:495.
	- Current value: https://formspree.io/f/your-form-id
	- Replace with: your real Formspree endpoint.
- [ ] Optional: update email subject line in index.html:520.
	- Current value: New portfolio inquiry from haupham.dev
	- Replace with: your own site name.

## 1) Identity and Content
- [ ] Replace placeholder social URLs in index.html with your real links.
- [ ] Review project titles, summaries, and metrics for accuracy.
- [ ] Verify location, email, and availability details.

## 2) SEO and Sharing
- [ ] Update canonical URL in index.html.
- [ ] Update Open Graph and Twitter image URLs to your real domain.
- [ ] Confirm og-cover.svg renders correctly when shared.
- [ ] Keep JSON-LD profile links aligned with your real profiles.

## 3) Contact Form (Formspree)
- [ ] Create a Formspree form.
- [ ] Replace data-form-endpoint in index.html with your real Formspree endpoint.
- [ ] Submit one test message and confirm delivery.

## 4) Resume and Hiring Assets
- [ ] Confirm CV snapshot content in Experience section is up to date.
- [ ] Optionally add a downloadable PDF CV link if needed.

## 5) Final QA
- [ ] Test on desktop, tablet, and mobile.
- [ ] Test keyboard navigation and focus states.
- [ ] Test mobile menu open/close and Escape key behavior.
- [ ] Test Back to Top button behavior.
- [ ] Confirm there are no console errors.

## 6) Deploy
- [ ] Push latest commits to main branch.
- [ ] Deploy to GitHub Pages, Netlify, or Vercel.
- [ ] Re-check SEO metadata on the deployed URL.
