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
  const theme = topic.category === "tech" ? "your website and its tech" : "your online marketing";

  return `
---
title: "${topic.title.replace(/"/g, '\\"')}"
date: "${topic.date}"
excerpt: "Beginner-friendly overview of ${topic.title.toLowerCase()}."
---

Many business owners hear terms like "${topic.title}" and quietly think, "I know this is important, but I don’t really understand what it means." This article is written for you. No jargon, no complicated theory — just a clear explanation of how this idea fits into ${theme}, and what practical steps you can take today.

## What you'll learn

By the end of this short guide, you will:

- Understand the basic idea behind **${topic.title}**
- See why it matters for a small business or personal brand
- Learn a few simple, low-effort actions you can put into practice right away

## 1. Understanding the basics

Let’s start with a simple definition. ${topic.title} is essentially about helping people find, understand, or use your website and content more easily. You don’t need to be “technical” to get value from it. The main goal is to make sure that when someone visits your site, they quickly understand who you are, what you offer, and what to do next.

A good way to think about it is to imagine your website as a physical shop. If the shop sign is confusing, the layout is messy, or nobody is there to guide visitors, people will walk out. ${topic.title} is about cleaning up the signboard, making the layout clearer, and gently guiding visitors towards the right shelf.

## 2. Why this matters for your business

When ${topic.title.toLowerCase()} is ignored, a few things usually happen: people bounce quickly, they don’t take action, and they don’t remember your brand. Even if you run ads or post on social media, you might feel like “nothing is working.” Often the problem isn’t traffic, it’s that visitors aren’t getting a simple, helpful experience once they land on your site.

On the other hand, when you spend a little time improving this area, you make it easier for the right people to find you, trust you, and contact you. Over time this compounds: search engines prefer helpful sites, visitors stay longer, and more of them turn into leads or customers.

## 3. Simple steps to get started

Here are a few beginner-friendly actions you can take today:

1. **Explain things in plain language.** Rewrite key sections of your site as if you were talking to a friend, not a technician.
2. **Add clear next steps.** Every important page should answer the question: “What should the visitor do now?” (call, fill a form, book a demo, etc.).
3. **Check your site on mobile.** Open your site on your phone and fix anything that feels slow, tiny, or hard to tap.
4. **Make the main message obvious.** Within a few seconds, a new visitor should know who you are, what you do, and who you help.

You don’t have to do everything at once. Even one or two small improvements can make a noticeable difference.

## 4. Common mistakes to avoid

Many beginners fall into the same traps:

- Trying to be “fancy” instead of clear
- Copying what big brands do, even though their audience and goals are very different
- Ignoring load speed and mobile users
- Assuming people already understand the terminology on the page

If you simply avoid these mistakes and keep focusing on clarity and helpfulness, you’re already ahead of many competitors.

---

This article is part of a daily series where we explain tech and digital marketing topics in beginner-friendly language. Save this page or share it with a friend who is just getting started and wants simple, practical explanations.
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
