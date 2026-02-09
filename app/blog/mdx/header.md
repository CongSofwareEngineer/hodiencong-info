---
title: "Hướng dẫn tối ưu Next.js cho SEO"
date: "2024-05-20"
excerpt: "Làm thế nào để Portfolio của bạn đạt 100 điểm Lighthouse..."
---

# Chào mừng đến với Blog của Công

Đây là bài viết đầu tiên của mình sử dụng **Markdown**. 

```javascript
const hello = "World";
console.log(hello);


### 4. Code trang danh sách bài viết (`pages/blog/index.js`)
Trang này sẽ quét thư mục `posts` và hiển thị danh sách.

```javascript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('content/posts'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(path.join('content/posts', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);

    return { slug, frontmatter };
  });

  return { props: { posts } };
}

export default function Blog({ posts }) {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">My Blog</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.slug} className="p-6 border rounded-xl hover:shadow-lg transition">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold text-blue-600 cursor-pointer">{post.frontmatter.title}</h2>
            </Link>
            <p className="text-gray-500 mt-2">{post.frontmatter.date}</p>
            <p className="mt-4">{post.frontmatter.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}