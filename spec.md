# Focus Opticals

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full business website for Focus Opticals, an optician store in Vijayawada
- Navigation bar: Home | About | Products | Timings | Contact
- Hero section: placeholder banner image, business name, tagline "Clear Vision. Better Style.", Call Now button, Get Directions button
- About Us section: professional short description as provided
- Products section: 4 product cards (Summer Cooling Goggles, General Frames, Cooling Goggles, Summer Glasses) each with placeholder image, product name, 1-line description, Inquiry button (Call/WhatsApp)
- Store Timings section: clock-style layout showing Open Daily 10:00 AM – 9:00 PM, Best Time to Visit: Around 5:00 PM
- Contact section: click-to-call phone number, full address, Google Maps embed placeholder, contact form (Name, Phone, Message)
- Reviews section: 4.0 star rating, 1 customer review, minimal professional display
- WhatsApp floating button (links to wa.me with store phone number)
- SEO meta tags for "Optical store in Vijayawada", "Cooling goggles Vijayawada", "Frames shop near Chowk Vijayawada"
- Contact form submission stored in backend

### Modify
- None

### Remove
- None

## Implementation Plan
1. Generate Motoko backend to store contact form submissions (Name, Phone, Message)
2. Build React frontend with all 6 sections
3. Use only placeholder images (no auto-generated stock images) — all product/hero images are placeholder slots
4. Wire contact form to backend
5. Add WhatsApp floating button linking to wa.me/919989362643
6. Add SEO meta tags in index.html
7. Mobile-first responsive layout, blue/black color theme on white background
