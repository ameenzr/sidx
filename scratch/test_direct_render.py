import fitz

pdf_path = r"c:\Users\Ameen\projects\sedux\Sidx V2.pdf"
doc = fitz.open(pdf_path)

for i, mode in [(0, "light_direct"), (1, "dark_direct")]:
    page = doc[i]
    xref = page.get_contents()[0]
    content = doc.xref_stream(xref).decode("latin1")
    
    lines = content.splitlines()
    new_lines = []
    skip_next = False
    for idx, line in enumerate(lines):
        if skip_next:
            if line.strip() in ("f", "W n"):
                skip_next = False
                continue
            skip_next = False
        if "1920 -1080 re" in line or "1920 1080 re" in line:
            skip_next = True
            continue
        new_lines.append(line)
        
    new_content = "\n".join(new_lines).encode("latin1")
    doc.update_stream(xref, new_content)
    
    # Now let's render with alpha=True and clip to logo bounding box
    clip_rect = fitz.Rect(600, 450, 1320, 630)
    pix = page.get_pixmap(dpi=600, alpha=True, clip=clip_rect)
    out_png = f"c:\\Users\\Ameen\\projects\\sedux\\scratch\\{mode}.png"
    pix.save(out_png)
    print(f"Saved {out_png}, size: {pix.width}x{pix.height}, alpha: {pix.alpha}")
