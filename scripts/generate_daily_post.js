import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const TOPICS_DIR = path.join(process.cwd(), "content", "topics");

function todayISO() {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function findTopicForToday(dateStr) {
  const files = fs.readdirSync(TOPICS_DIR).filter((f) => f.endsWith(".json"));
  for (const file of files) {
    const full = path.join(TOPICS_DIR, file);
    const topics = JSON.parse(fs.readFileSync(full, "utf8"));
    const match = topics.find((t) => t.date === dateStr);
    if (match) return match;
  }
  return null;
}

function postPath(dateStr, slug) {
  return path.join(BLOG_DIR, `${dateStr}-${slug}.md`);
}

function generateBody(topic) {
  return `
---
title: "${topic.title.replace(/"/g, '\\"')}"
date: "${topic.date}"
excerpt: "Beginner-friendly overview of ${topic.title.toLowerCase()}."
---

If you're just getting started with ${
    topic.category === "tech" ? "web development" : "digital marketing"
  }, this guide will walk you through the basics in simple language.

## What you'll learn

- Key terms you should know
- Why this topic matters for your website or business
- Practical tips you can apply today

## 1. Understanding the basics

Explain the concept in very simple terms. Use real-world analogies and avoid jargon where possible.

## 2. How this impacts your website or business

Break down 2–3 concrete ways this topic affects traffic, conversions, or user experience.

## 3. Simple steps to get started

Offer 3–5 actionable steps a beginner can take right now.

## 4. Common mistakes to avoid

List a few mistakes beginners make and how to avoid them.

---

This article is part of a daily series where we explain tech and digital marketing topics in beginner-friendly language.
`.trimStart();
}

function main() {
  const today = todayISO();
  const topic = findTopicForToday(today);

  if (!topic) {
    console.log(`No topic found for ${today}. Exiting.`);
    return;
  }

  const outPath = postPath(topic.date, topic.slug);
  if (fs.existsSync(outPath)) {
    console.log(`Post already exists for ${today}: ${outPath}`);
    return;
  }

  const body = generateBody(topic);

  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  fs.writeFileSync(outPath, body, "utf8");
  console.log(`Created blog post: ${outPath}`);
}

main();
