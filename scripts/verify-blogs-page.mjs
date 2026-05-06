import { access, readFile } from "node:fs/promises";
import assert from "node:assert/strict";

const pageSource = await readFile("src/app/(home)/blogs/page.tsx", "utf8");
const dataSource = await readFile("src/app/(home)/blogs/blog-data.ts", "utf8");
const detailSource = await readFile("src/app/(home)/blogs/[slug]/page.tsx", "utf8");

const requiredSnippets = [
  "CustomerFooter",
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
    `${pageSource}\n${dataSource}`.includes(snippet),
    `Expected blogs page source to include: ${snippet}`
  );
}

assert.ok(
  !pageSource.includes("<p>BLOGS</p>"),
  "Blogs page should not render the placeholder content"
);

assert.ok(
  !`${pageSource}\n${dataSource}\n${detailSource}`.includes("https://potonow.vn"),
  "Blog pages should not link to the source website"
);

assert.ok(
  !pageSource.includes('target="_blank"'),
  "Blog cards should navigate internally instead of opening external tabs"
);

for (const slug of [
  "ung-dung-potonow-chinh-thuc-ra-mat",
  "tat-tan-tat-nhung-dieu-can-biet-truoc-khi-chup-anh-doanh-nghiep",
  "tuyet-chieu-chup-anh-voi-hoa-huong-duong",
  "bi-kip-hanh-nghe-danh-cho-nhiep-anh-gia-potonow",
  "tat-tan-tat-ve-chup-anh-tet-2026"
]) {
  assert.ok(dataSource.includes(`slug: "${slug}"`), `Missing blog slug: ${slug}`);
}

for (const imageName of [
  "app-potonow-launch.jpg",
  "corporate-photography.jpg",
  "foreign-client-tips.jpg",
  "tet-concepts.jpg"
]) {
  await access(`public/blogs/${imageName}`);
}
