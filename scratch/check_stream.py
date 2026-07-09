import fitz

pdf_path = r"c:\Users\Ameen\projects\sedux\Sidx V2.pdf"
doc = fitz.open(pdf_path)
page = doc[0]
xref = page.get_contents()[0]
content = doc.xref_stream(xref).decode("latin1")

lines = content.splitlines()
for idx, line in enumerate(lines):
    if "944" in line or "1089" in line:
        print(f"Line {idx}: {line}")
        # print 5 lines before and after
        for k in range(max(0, idx-5), min(len(lines), idx+6)):
            print(f"  [{k}] {lines[k]}")
        print("="*40)
