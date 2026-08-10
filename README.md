# Compass Support website

A simple, responsive one-page website for Compass Support, designed to be hosted with GitHub Pages.

## Files

- `index.html` — page content
- `style.css` — responsive navy-and-gold styling
- `script.js` — mobile menu, subtle scroll animations and current year
- `images/` — site photography and Compass Support Services branding

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload all files and folders in this project to the repository's top level.
3. In **Settings → Pages**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder, then save.
5. GitHub will provide the public website address within a few minutes.

## Updating details

Edit the text in `index.html` to update services or business information. The phone, email and Calendly booking links are already set to:

- 0407 390 321
- markwalsh@hotmail.com.au
- https://calendly.com/markwalsh-wczo/mark-walsh-consultation

The `images` folder includes generic placeholders only. Replace them with real Compass Support photography when ready.

## Client feedback approval workflow

- `feedback.html` is intentionally unlisted: it is not linked from the homepage or navigation and asks search engines not to index it.
- Submissions are sent privately to the site owner through FormSubmit and are never written to the public website.
- FormSubmit requires the site owner to confirm the destination address after the first submission. Until that one-time activation link is confirmed, later delivery is not guaranteed.
- `approved-testimonials.json` is the only data source used by the public testimonial card.
- To approve a testimonial, first confirm the client's publication permission, then deliberately add the approved wording and display name to `approved-testimonials.json` and publish that change.
