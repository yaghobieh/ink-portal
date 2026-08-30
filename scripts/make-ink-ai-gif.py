from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path("/Users/user/Desktop/Projects/Forge/ink-portal/public/ink-ai-demo.gif")
W, H = 720, 400
WHITE = (255, 255, 255)
CANVAS = (245, 246, 248)
TEXT = (23, 27, 36)
MUTED = (102, 112, 133)
ACCENT = (41, 81, 196)
AI = (14, 138, 110)
AI_SOFT = (231, 246, 241)
BORDER = (225, 228, 234)
SOFT = (234, 240, 254)
GHOST = (152, 162, 179)

FRAMES = [
    ("Ask Ink AI", "Rewrite this paragraph…", "", 0),
    ("Ask Ink AI", "Rewrite this paragraph…", "Thinking", 1),
    ("Ask Ink AI", "Rewrite this paragraph…", "Clearer, tighter copy.", 2),
    ("Ask Ink AI", "Summarize the section", "Three bullets. Ready.", 3),
]


def font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for name in ("SFNS.ttf", "Helvetica.ttc", "Arial.ttf", "DejaVuSans.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def draw_frame(title: str, prompt: str, reply: str, step: int) -> Image.Image:
    img = Image.new("RGB", (W, H), CANVAS)
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((24, 24, 430, 376), 10, fill=WHITE, outline=BORDER)
    draw.rectangle((24, 24, 430, 64), fill=WHITE)
    draw.text((40, 36), "Ink 1.1.7", fill=TEXT, font=font(16))
    draw.rounded_rectangle((40, 80, 200, 108), 6, fill=SOFT, outline=ACCENT)
    draw.text((52, 86), "Paragraph", fill=ACCENT, font=font(13))
    draw.text((214, 86), "B   I   U", fill=MUTED, font=font(13))
    draw.rounded_rectangle((320, 80, 410, 108), 14, fill=AI_SOFT, outline=AI)
    draw.text((334, 86), "Ask AI", fill=AI, font=font(12))
    draw.text((48, 140), "A document editor with grouped", fill=TEXT, font=font(15))
    draw.text((48, 164), "toolbar, outline, and slash.", fill=TEXT, font=font(15))
    if step >= 2:
        draw.text((48, 200), "Clearer, tighter copy for the", fill=GHOST, font=font(15))
        draw.text((48, 224), "opening paragraph.", fill=GHOST, font=font(15))

    draw.rounded_rectangle((450, 24, 696, 376), 10, fill=WHITE, outline=BORDER)
    draw.rectangle((450, 24, 696, 68), fill=AI_SOFT)
    draw.text((466, 38), title, fill=AI, font=font(15))
    draw.rounded_rectangle((466, 88, 680, 128), 8, fill=CANVAS, outline=BORDER)
    draw.text((478, 100), prompt, fill=MUTED, font=font(12))
    if reply:
        bubble_y = 148
        draw.rounded_rectangle((466, bubble_y, 680, bubble_y + 56), 8, fill=SOFT)
        draw.text((478, bubble_y + 16), reply, fill=TEXT, font=font(13))
    return img


def main() -> None:
    frames = [draw_frame(*row) for row in FRAMES]
    frames[0].save(
        OUT,
        save_all=True,
        append_images=frames[1:],
        duration=[900, 700, 1400, 1400],
        loop=0,
        optimize=True,
    )
    print(OUT)


if __name__ == "__main__":
    main()
