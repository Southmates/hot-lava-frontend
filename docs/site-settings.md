# siteSettings Rules

siteSettings is a singleton containing global, shared content.

## Allowed fields

- siteTitle
- siteTagline
- seo (metaTitle, metaDescription)
- footerTitle
- contactInfo
- socialLinks

## Rules

- siteSettings must not be used as a generic string store
- Section titles must not live in siteSettings
- Changes here affect the entire site
