# 🔗 URL Shortener

## Project Overview

A sleek, modern URL shortening service built with Next.js, Supabase, and Tailwind CSS. Quickly transform long, complex URLs into short, shareable links with easy-to-use functionality.

![Project Preview](https://cloud-kj6yptuwl-hack-club-bot.vercel.app/0image.png)

## 🌟 Features

- **Quick URL Shortening**: Convert long URLs to concise, manageable links
- **Supabase Integration**: Robust database management and link tracking
- **Modern UI**: Responsive design with Tailwind CSS
- **Link Management**: 
  - Create short links
  - Copy links with one click

## 🛠 Tech Stack

- **Framework**: Next.js
- **Database**: Supabase
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 📋 Prerequisites

Before installation, ensure you have:
- Node.js (v18.0.0 or later)
- npm (v8.0.0+) or Yarn
- Supabase account
- Git

## 🔧 Comprehensive Installation Guide

### 1. Clone the Repository

```bash
# HTTPS
git clone https://github.com/hridaya423/url-shortener.git

# SSH
git clone git@github.com:hridaya423/url-shortener.git

# Navigate to project directory
cd url-shortener
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using Yarn
yarn install
```

### 3. Supabase Setup

#### 3.1 Create Supabase Project
1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Navigate to Project Settings > API

#### 3.2 Configure Environment Variables
Create a `.env.local` file in the project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
# Using npm
npm run dev

# Using Yarn
yarn dev
```

🌐 Access the application at: `http://localhost:3000`
