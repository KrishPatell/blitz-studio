from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
ROOT=Path(__file__).resolve().parents[2]
OUT=Path(__file__).resolve().parent

def outline(text,font_name,size,baseline,tracking):
    font=TTFont(ROOT/'dist/assets/reference'/font_name)
    gs=font.getGlyphSet(); cmap=font.getBestCmap()
    scale=size/font['head'].unitsPerEm
    x=0; paths=[]
    for char in text:
        name=cmap[ord(char)]
        pen=SVGPathPen(gs); gs[name].draw(pen)
        paths.append(f'<path d="{pen.getCommands()}" transform="translate({x:.4f} {baseline}) scale({scale} {-scale})"/>')
        x+=gs[name].width*scale+tracking*size
    return ''.join(paths),x
medium='overused_grotesk_medium.0e-e91bdqpncz.woff2'
bold='overused_grotesk_bold.0yfvl31jwmj6x.woff2'
paths=''.join(outline(t,medium,52,y,-.025)[0] for t,y in [('Great work starts',40),('with a conversation.',114)])
(OUT/'heading-spaced.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="550" height="144" viewBox="0 0 550 144" fill="white"><title>Great work starts with a conversation. — Overused Grotesk Medium52, 74px line pitch</title>{paths}</svg>')
word,width=outline('Blitz Studio',bold,176,126,-.055)
(OUT/'wordmark.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="850" height="160" viewBox="0 0 850 160"><title>Blitz Studio — Overused Grotesk Bold176, internal linear fade</title><defs><linearGradient id="fade" x1="0" y1="48" x2="0" y2="150" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><mask id="mask" maskUnits="userSpaceOnUse" x="0" y="0" width="850" height="160"><rect width="850" height="160" fill="url(#fade)"/></mask></defs><g fill="white" mask="url(#mask)">{word}</g></svg>')
print(f'Created exact font proofs; natural wordmark advance {width:.2f}px')
mobile=''.join(outline(t,medium,32,y,-.025)[0] for t,y in [('Great work starts',28),('with a conversation.',73.44)])
(OUT/'heading-mobile-spaced.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="350" height="96" viewBox="0 0 350 96" fill="white"><title>Mobile invitation — Overused Grotesk Medium32, 1.42 line-height</title>{mobile}</svg>')
