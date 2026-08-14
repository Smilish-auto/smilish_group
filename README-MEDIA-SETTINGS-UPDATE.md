# Smilish Group — Media-linked site settings update

Adds a Media Library picker to site settings, a site-wide logo, and configurable hero images for About, Fashion, AI Automation, and Real Estate. Existing gradient fallbacks remain when no image is selected.

Apply the files to the existing project, then run `npm install`, `npm run build`, commit, and push.

No database migration is required: the existing `site_content` key/value table stores the new settings.
