---
layout: ../../layouts/ProjectLayout.astro
title: FNotifier
description: This is a lightweight automation tool (like Zapier) built with Go.
tags: ["automation", "telegram", "postgresql", "google-sheets"]
githubUrl: https://github.com/yash-raj10/FNotifier
timestamp: 2025-06-05T00:00:00+00:00
featured: true
filename: 1fnotifier
---

## The Details

FNotifier is a lightweight automation tool, inspired by Zapier, built using Go. It handles form submissions and distributes the data simultaneously to a PostgreSQL database, a Telegram bot, and a Google Sheet. It supports Google OAuth2 for secure access and leverages Go's concurrency features for fast and efficient background service initialization.

## The Features

- 🔁 **Multi-channel Distribution**: Send form data to PostgreSQL, Telegram, and Google Sheets in parallel
- ⚡ **Concurrent Processing**: Uses Go's goroutines to handle requests efficiently
- 🔐 **OAuth Integration**: Secure and authorized access to Google Sheets API
- 🌐 **RESTful API**: Clean and simple endpoints for form submission and service status
- 🔔 **Real-time Notifications**: Telegram bot alerts for new form submissions

## 🧩 Architecture

- **Gin Web Framework** for fast and reliable HTTP routing
- **Telegram Bot API** for instant notifications
- **Google Sheets API** for easy data integration
- **PostgreSQL** as the persistent data store
- **Goroutines** to power concurrency and background tasks efficiently
