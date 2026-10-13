# Cobalt night-garden footer · Paper board

Built in the existing [Blitzstudio Paper file](https://app.paper.design/file/01M4SPS5N3ES3Z63XANVKQXNZ5/p-1-0), artboard “07 · Cobalt night garden / Reference build”, 1440 × 900.

## Authority and deliverables

Goal: BUILD THIS IN PAPER BOARD. Reference: /Users/krishpatel/.codex/attachments/23df077e-6bad-4dcc-8023-dcdc6c29ceb9/image-1.png, the selected cobalt night-garden footer. The previous goal turn generated options and published the office-address update; this goal turn creates and verifies the selected board in Paper itself.

The board is a structured design, not one flattened screenshot: separate brand, invitation, CTA/dot, three navigation groups, office labels, wordmark and utility groups. Small text is editable Manrope. Paper cannot load Overused Grotesk; display heading and wordmark use vector outlines generated from the actual site's local Medium/Bold WOFF2 files. This limitation does not apply to the live website fonts.

- desktop-artwork.png: separately generated text-free backdrop, native1586 × 992.
- heading-v2.svg: actual Overused Grotesk Medium52, natural letter proportions.
- wordmark.svg: actual Overused Grotesk Bold176 with an internal vertical linear fade.
- build-type-proofs.py: reproducible font outline generator.
- paper-board.jsx: direct inline-style export from the current Paper board.
- paper-board.png: actual Paper export, 1440 × 900.

The board follows the selected reference's city-only office row. The full user-provided Ahmedabad and verified Singapore addresses remain on the published website; no site change was made by this Paper-only task. Animation is represented by the visible fade treatment; this static board is not presented as a running animation.

## Completion audit

| Requirement derived from reference | Current evidence |
| --- | --- |
| Actual board in the existing Paper file | get_node_info confirms visible1440 × 900 artboard with nine top-level groups |
| Cobalt landscape, mountains/water left, architectural garden right | Current Paper screenshot and exported PNG reviewed against the supplied image |
| Upper-left brand, two-line invitation, white CTA/yellow dot | Separate nodes and direct JSX export confirm content, geometry and colors |
| All three navigation groups and all11 links | get_tree_summary and JSX confirm Explore4, Information4, Connect3 |
| Singapore and Ahmedabad, India office labels | Separate text nodes in one fixed-width office lane |
| Large naturally proportioned fading white wordmark | Actual font glyph paths plus user-space vertical gradient mask; rendered Paper screenshot reviewed |
| Copyright and Design + Development utility row | Separate editable text nodes,14px/22px unified copy role |
| Readability, spacing, alignment and fit | Final screenshot review: no clipping or overlapping; equal26px navigation row pitch and common utility baseline |
| Saved deliverable and clean working state | PNG export plus local source files; finish_working_on_nodes returned OK |

Checkpoint verdict: spacing matches the reference's generous sky and compact nav; typography uses actual homepage display-font outlines and editable Manrope; white/navy CTA contrast is clear; repeated rows and office/utility lanes align; all content fits; large landscape and wordmark counterbalance the small utility text.

## Artwork clean-up prompt

Edit the supplied image to produce ONLY its text-free background artwork for rebuilding the footer UI as separate design-tool layers. Preserve the entire blue-and-ivory engraved coastal night garden exactly: identical cobalt palette, mountains left, reflection lines, stone island and three architectural archways right, pine canopy right, warm yellow window lights, framing, viewpoint, scale and texture. Remove ALL typography and interface graphics: top-left Blitz Studio, heading, white pill button and yellow dot, all navigation columns, vertical dividers, horizontal divider, office city labels, giant bottom Blitz Studio wordmark including its faded letter remnants, and bottom copyright/craft line. Seamlessly reconstruct cobalt sky and engraved water behind removed elements, no smudges or faded ghost letters. Keep image landscape aspect ratio and identical composition. No new buildings, no new text, no new layout. Output clean original artwork only.

