# CMS Architecture

Sanity is used exclusively for editorial and brand-related content.

## What goes to the CMS

- siteSettings (singleton)
- Section-specific content (Intro, About, Work, Products, Team)
- Media assets (images, videos)

## What does NOT go to the CMS

- Deployment configuration
- SEO infrastructure (robots, canonical logic)
- Structured data schemas
- Infrastructure metadata (llm.txt, security.txt)

The CMS reflects content domains, not UI components.
