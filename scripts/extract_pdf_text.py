import sys
from pathlib import Path

try:
    from pypdf import PdfReader
except Exception as e:
    print(f"Error: pypdf not available: {e}", file=sys.stderr)
    sys.exit(2)

def extract_text(pdf_path: Path) -> str:
    reader = PdfReader(str(pdf_path))
    texts = []
    for i, page in enumerate(reader.pages):
        try:
            txt = page.extract_text() or ""
        except Exception as e:
            txt = f"\n[Page {i+1} could not be extracted: {e}]\n"
        texts.append(txt)
    return "\n\n".join(texts)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: extract_pdf_text.py <input.pdf> <output.txt>", file=sys.stderr)
        sys.exit(1)
    inp = Path(sys.argv[1])
    outp = Path(sys.argv[2])
    outp.parent.mkdir(parents=True, exist_ok=True)
    text = extract_text(inp)
    outp.write_text(text, encoding="utf-8")
    print(f"Wrote {outp} ({len(text)} chars)")
