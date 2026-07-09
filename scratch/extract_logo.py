import fitz

pdf_path = r"c:\Users\Ameen\projects\sedux\Sidx V2.pdf"
doc = fitz.open(pdf_path)

for i in [0, 1]:
    page = doc[i]
    images = page.get_images()
    print(f"Page {i+1} images: {len(images)}")
    for j, img in enumerate(images):
        print(f"  Image {j}: {img}")
    
    # Save svg of page to see what's inside
    svg = page.get_svg_image()
    with open(f"c:\\Users\\Ameen\\projects\\sedux\\scratch\\page_{i+1}.svg", "w", encoding="utf-8") as f:
        f.write(svg)
    print(f"Saved page_{i+1}.svg, length: {len(svg)}")
