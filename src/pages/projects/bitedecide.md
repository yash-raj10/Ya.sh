---
layout: ../../layouts/ProjectLayout.astro
title: BiteDecide
description: "Swipe-based food recommender using vector embeddings and semantic search to help you decide what to eat."
tags: ["golang", "next.js", "openai", "vector-embeddings", "machine-learning"]
githubUrl: https://github.com/yash-raj10/BiteDecide
liveUrl: https://bite-decide.vercel.app/
timestamp: 2026-01-15T00:00:00+00:00
featured: true
filename: bitedecide
---

## 🍔 The Concept

**BiteDecide** is a swipe-based food recommendation app that learns your preferences in real-time using vector embeddings and cosine similarity. No manual tagging, no complex ML models—just smart math that understands what you're craving.

Swipe left on foods you don't want, right on ones you like, and super swipe when you've found your meal. The app gets smarter with each swipe, showing you foods that match your evolving taste profile.

---

## ✨ Key Features

- 🔄 **Real-Time Learning**: Each swipe updates your preference vector, making recommendations smarter
- 🧠 **Semantic Understanding**: Uses OpenAI embeddings to capture the "meaning" of each food
- 📊 **Cosine Similarity Scoring**: Math-based recommendations, not black-box AI
- 🎯 **Zero Manual Tagging**: Just natural food descriptions—AI figures out the relationships
- ⚡ **Stateless Sessions**: Each decision is independent, no long-term tracking
- 🏃 **Fast & Lightweight**: Go backend with in-memory session management

---

## 🧠 How It Works

### Vector Embeddings Magic

Instead of tagging foods manually, BiteDecide sends each food description to OpenAI's embedding API, which returns a 1536-dimensional vector that captures the semantic meaning. Similar foods (like "Butter Chicken" and "Paneer Tikka") end up close together in this vector space.

### The Recommendation Flow

1. **Session starts**: Your intent vector is neutral `[0, 0, 0, ...]`
2. **Swipe right** on "Butter Chicken": Intent shifts toward Indian/creamy foods
3. **Swipe left** on "Sushi": Intent moves away from Japanese/raw foods
4. **Next recommendation**: App calculates cosine similarity between your intent and all unseen foods, shows the best match

### The Math

```
Cosine Similarity = (A · B) / (||A|| × ||B||)

Swipe Weights:
  Left:  -0.5 (strong negative)
  Right:  0.2 (gentle positive)
  Super:  1.0 (definitive choice)
```

---

## 🏗️ Architecture

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│   Frontend  │  HTTP   │   Backend        │  API    │   OpenAI    │
│  (Next.js)  │ ◄─────► │  (Go + Gin)      │ ◄─────► │  Embeddings │
│             │         │                  │         │             │
│  - Swipe UI │         │ - Sessions       │         │ - text-emb- │
│  - Renders  │         │ - Vector math    │         │   3-small   │
│  - No logic │         │ - Cosine scoring │         └─────────────┘
└─────────────┘         └──────────────────┘
```

**Frontend**: Clean Next.js interface for swiping—zero business logic  
**Backend**: Go service handling session management, vector operations, and recommendation engine  
**OpenAI**: Generates semantic embeddings for all 50 food items

---

## 🛠️ Tech Stack

- **Backend**: Go 1.21+, Gin framework
- **Frontend**: Next.js 14, TypeScript, React
- **AI/ML**: OpenAI Embeddings API (text-embedding-3-small)
- **Storage**: In-memory session store with 50 pre-loaded foods
- **Deployment**: Docker, Vercel (frontend)
- **Math**: Vector operations, cosine similarity, normalized embeddings

---

## 🚀 What Makes It Cool

1. **Zero Training Required**: Pre-computed embeddings, instant recommendations
2. **Explainable AI**: Every recommendation is a transparent math operation
3. **Learns Context**: Understands "spicy Indian" vs "mild Italian" without tags
4. **Handles Nuance**: Semantic understanding beats keyword matching
5. **Asymmetric Weighting**: Strong dislikes, gentle likes, decisive super swipes

---

## 📦 Project Structure

```
├── client/              # Next.js frontend
│   ├── app/
│   │   ├── swipe/      # Main swipe interface
│   │   ├── complete/   # Success screen
│   │   └── lib/api.ts  # Backend API client
│
└── server2/            # Go backend
    ├── main.go         # Entry + Gin router
    ├── data/food.json  # 50 foods with descriptions
    ├── handlers/       # HTTP handlers
    ├── openai/         # Embedding client
    ├── store/          # Session & food storage
    ├── engine/         # Recommendation logic
    └── models/         # Data structures
```

---

## 🎯 Use Cases

- **Indecisive eaters**: Let the app narrow down choices
- **Group decisions**: Everyone swipes, app finds consensus
- **Discovery**: Explore foods you wouldn't normally consider
- **Quick decisions**: Super swipe when you know what you want

---

## 🔗 Links

- [Live Demo](https://bite-decide.vercel.app/)
- [GitHub Repository](https://github.com/yash-raj10/BiteDecide)

---

_Built with vector embeddings, powered by Go, designed for indecision._
