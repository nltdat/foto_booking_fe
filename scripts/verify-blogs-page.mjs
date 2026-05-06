import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";

const pageSource = await readFile("src/app/(home)/blogs/page.tsx", "utf8");

const requiredSnippets = [
  "CustomerFooter",
  "blogPosts",
  "Ứng dụng Potonow chính thức ra mắt",
  "Tất tần tật những điều cần biết trước khi chụp ảnh doanh nghiệp",
  "Bí kíp",
  "/blogs/app-potonow-launch.jpg",
  "/blogs/corporate-photography.jpg",
  "Chuyện Nhiếp Ảnh",
  "Nhiếp ảnh gia Potonow"
];

for (const snippet of requiredSnippets) {
  assert.ok(
    pageSource.includes(snippet),
    `Expected blogs page source to include: ${snippet}`
  );
}

assert.ok(
  !pageSource.includes("<p>BLOGS</p>"),
  "Blogs page should not render the placeholder content"
);
