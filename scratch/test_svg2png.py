import fitz
import re

pdf_path = r"c:\Users\Ameen\projects\sedux\Sidx V2.pdf"
doc = fitz.open(pdf_path)

for i, mode in [(0, "light"), (1, "dark")]:
    page = doc[i]
    svg = page.get_svg_image()
    
    # Remove the background paths
    # In page 1: fill="#ffffff" and fill="#f0e8e2"
    # In page 2: fill="#ffffff" and fill="#090707"
    svg = re.sub(r'<path transform="matrix[^"]+" d="M0 1080H1920V0H0Z" fill="[^"]+"/>\n?', '', svg)
    svg = re.sub(r'<path transform="matrix[^"]+" d="M0 0H1920V1080H0Z" fill="[^"]+"/>\n?', '', svg)
    
    # Change width, height and viewBox to crop to the logo: around x: 600..1320, y: 450..630
    # Let's crop from x=600 to 1320 (width 720), y=450 to 630 (height 180)
    # Note: SVG viewBox="min-x min-y width height"
    svg = re.sub(r'width="1920" height="1080" viewBox="0 0 1920 1080"', 'width="720" height="180" viewBox="600 450 720 180"', svg)
    
    out_svg = f"c:\\Users\\Ameen\\projects\\sedux\\scratch\\logo_{mode}.svg"
    with open(out_svg, "w", encoding="utf-8") as f:
        f.write(svg)
    print(f"Saved {out_svg}")
    
    # Try converting to transparent PNG using fitz
    svg_doc = fitz.open(out_svg)
    svg_page = svg_doc[0]
    pix = svg_page.get_pixmap(dpi=300, alpha=True)
    out_png = f"c:\\Users\\Ameen\\projects\\sedux\\scratch\\logo_{mode}.png"
    pix.save(out_png)
    print(f"Saved {out_png}, size: {pix.width}x{pix.height}, alpha: {pix.alpha}")
