# Template Naming System

This directory uses a single naming system based on cartography and navigation.

Format:
- `<series>_<style>_vN.typ` for main template files
- `<series>_<style>_layout.typ` for template-specific helpers
- `template_utils.typ` for shared cross-template utilities

Series vocabulary:
- `atlas`
- `meridian`
- `summit`
- `contour`
- `vector`
- `horizon`
- `harbor`
- reserved for future families: `north`, `delta`, `beacon`, `strata`

Style vocabulary:
- `classic`
- `clean`
- `serif`
- `timeline`
- `compact`
- `sidebar`
- reserved for future families: `executive`, `editorial`, `technical`, `minimal`

Current catalog:
- `atlas_classic_v1`: formal one-column baseline resume with ruled headings
- `meridian_clean_v1`: clean sans-serif single-column layout with airy records
- `summit_serif_v1`: engineering-style serif layout with centered header
- `contour_timeline_v1`: academic-inspired timeline layout with wide margins
- `vector_compact_v1`: dense technical one-pager with compact spacing
- `horizon_sidebar_v1`: expressive two-column layout with colored sidebar
- `harbor_serif_v1`: elegant serif layout with left-side section labels

Source provenance is kept in frontend/backend metadata and descriptions, not in file names.
