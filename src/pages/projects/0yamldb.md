---
layout: ../../layouts/ProjectLayout.astro
title: yamlDB
description: "A YAML-Based NoSQL DB: API-Driven Simplicity."
tags: ["golang", "database", "yaml", "noSQL"]
githubUrl: https://github.com/yash-raj10/yamlDB
timestamp: 2025-06-05T00:00:00+00:00
featured: true
filename: 0yamldb
---

## 📦 The Details

**yamlDB** is a lightweight, API-based NoSQL database that stores data in YAML format. It’s designed for simplicity and ease of use, allowing developers to store, retrieve, and manage structured data without spinning up a full-fledged DB server. Just run the binary and start using it via HTTP APIs.

---

## ✨ Features

- 📁 **File-Based Storage**: Data is stored as `.yaml` files for transparency and ease.
- ⚙️ **No External Dependencies**: No need for separate database engines.
- 💻 **Cross-Platform Support**: Works smoothly on Linux, macOS, and Windows.
- 🔌 **API-Driven**: REST APIs for interacting with collections and records.
- 📦 **Pre-Built Binaries**: Ready-to-use binaries available for common platforms.

---

## 🧠 Architecture

```txt
             +------------+            +----------------+
Client App → |  REST API  |   ↔────→   |  YAML Storage  |
             +------------+            |  (Filesystem)  |
                    ↓                  +----------------+
             +-----------------------------+
             |      Golang Engine          |
             | (Gin, File IO, UUID, etc.)  |
             +-----------------------------+
```
