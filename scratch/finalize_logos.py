import fitz

pdf_path = r"c:\Users\Ameen\projects\sedux\Sidx V2.pdf"
doc = fitz.open(pdf_path)

# Let's clean content streams for page 0 and 1
for i in [0, 1]:
    page = doc[i]
    xref = page.get_contents()[0]
    content = doc.xref_stream(xref).decode("latin1")
    lines = content.splitlines()
    new_lines = []
    skip_next = False
    for line in lines:
        if skip_next:
            if line.strip() in ("f", "W n"):
                skip_next = False
                continue
            skip_next = False
        if "1920 -1080 re" in line or "1920 1080 re" in line:
            skip_next = True
            continue
        new_lines.append(line)
    doc.update_stream(xref, "\n".join(new_lines).encode("latin1"))

# 1. Full logos at 300 dpi (~3000x750)
clip_logo = fitz.Rect(600, 450, 1320, 630)

# Light theme full logo (page 0)
page_light = doc[0]
pix_light = page_light.get_pixmap(dpi=300, alpha=True, clip=clip_logo)
pix_light.save(r"c:\Users\Ameen\projects\sedux\public\sid-x_logo_light.png")
print("Saved public/sid-x_logo_light.png:", pix_light.width, pix_light.height)

# Dark theme full logo (page 1)
page_dark = doc[1]
pix_dark = page_dark.get_pixmap(dpi=300, alpha=True, clip=clip_logo)
pix_dark.save(r"c:\Users\Ameen\projects\sedux\public\sid-x_logo.png")
print("Saved public/sid-x_logo.png:", pix_dark.width, pix_dark.height)

# Also replace outlined logo.png with sid-x_logo.png so no old logo remains
pix_dark.save(r"c:\Users\Ameen\projects\sedux\public\outlined logo.png")
print("Saved public/outlined logo.png")

# 2. Icon only (from x=600 to x=855)
clip_icon = fitz.Rect(600, 450, 855, 630)
pix_icon = page_dark.get_pixmap(dpi=300, alpha=True, clip=clip_icon)
pix_icon.save(r"c:\Users\Ameen\projects\sedux\public\sid-x_icon.png")
print("Saved public/sid-x_icon.png:", pix_icon.width, pix_icon.height)
