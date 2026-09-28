"""Regenerate the PNG app icons from the simple vector mark in public/icon.svg.

Pillow is only needed when regenerating the committed assets; the website build
does not depend on Python.
"""

from pathlib import Path

from PIL import Image, ImageDraw


OUTPUT = Path(__file__).resolve().parents[1] / "public"
SCALE = 4
DARK = "#07111f"
CYAN = "#65e6d4"
ORANGE = "#ff9d62"


def point(x: float, y: float, factor: float) -> tuple[int, int]:
    return round(x * factor), round(y * factor)


def make_icon(size: int, filename: str) -> None:
    canvas = size * SCALE
    factor = canvas / 192
    icon = Image.new("RGB", (canvas, canvas), DARK)
    circle = Image.new("RGBA", (canvas, canvas), (0, 0, 0, 0))
    circle_draw = ImageDraw.Draw(circle)
    circle_draw.ellipse(
        (*point(124, 20, factor), *point(174, 70, factor)),
        fill=(255, 157, 98, 51),
    )
    icon = Image.alpha_composite(icon.convert("RGBA"), circle)
    draw = ImageDraw.Draw(icon)
    draw.rounded_rectangle(
        (*point(39, 43, factor), *point(153, 141, factor)),
        radius=round(26 * factor),
        fill=CYAN,
    )
    draw.polygon(
        [point(x, y, factor) for x, y in [(60, 126), (60, 157), (91, 138)]],
        fill=CYAN,
    )
    for left, top, right, bottom, color in [
        (68, 84, 78, 109, DARK),
        (91, 71, 101, 109, ORANGE),
        (114, 84, 124, 109, DARK),
    ]:
        draw.rounded_rectangle(
            (*point(left, top, factor), *point(right, bottom, factor)),
            radius=round(5 * factor),
            fill=color,
        )
    icon.convert("RGB").resize((size, size), Image.Resampling.LANCZOS).save(
        OUTPUT / filename, format="PNG", optimize=True
    )


if __name__ == "__main__":
    for dimension, name in [
        (192, "icon-192.png"),
        (512, "icon-512.png"),
        (512, "maskable-icon-512.png"),
        (180, "apple-touch-icon.png"),
    ]:
        make_icon(dimension, name)
