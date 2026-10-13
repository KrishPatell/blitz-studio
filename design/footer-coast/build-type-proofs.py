from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
root=Path(__file__).resolve().parents[2]
out=Path(__file__).resolve().parent
font=TTFont(root/'dist/assets/reference/overused_grotesk_medium.0e-e91bdqpncz.woff2')
glyphs=font.getGlyphSet(); cmap=font.getBestCmap()
def line(text,size,y):
    scale=size/font['head'].unitsPerEm
    x=0; paths=[]
    for char in text:
        glyph=glyphs[cmap[ord(char)]]
        pen=SVGPathPen(glyphs); glyph.draw(pen)
        paths.append(f'<path d="{pen.getCommands()}" transform="translate({x} {y}) scale({scale} {-scale})"/>')
        x+=glyph.width*scale-.025*size
    return ''.join(paths)
for name,size,width,height,baselines in [('desktop',44,470,106,[38,90.8]),('mobile',32,350,82,[28,66.4])]:
    paths=''.join(line(text,size,y) for text,y in zip(['Great work starts','with a conversation.'],baselines))
    (out/f'heading-{name}-spaced.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" fill="white"><title>Great work starts with a conversation. — Overused Grotesk Medium, 1.2 line pitch</title>{paths}</svg>')

