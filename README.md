# 🛍️ Atelier Privé — Luxury Monochrome E-Commerce Experience & Fashion Engine

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?logo=nestjs)
![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)
![Motion](https://img.shields.io/badge/Motion-Kinetics-FF0055)
![Stripe](https://img.shields.io/badge/Stripe-Checkout-635BFF?logo=stripe)
![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-f69220.svg?logo=pnpm)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

**A disciplined, high-end monochrome e-commerce experience inspired by luxury horology and minimalist editorial design. Built with Next.js 16, React 19, NestJS, and Prisma ORM.**

[System Architecture](#-system-architecture) • [Database ERD](#-database-erd) • [Checkout Flow](#-luxury-checkout--inventory-sequence) • [Quick Start](#-quick-start)

</div>

---

## ⚡ Overview

**Atelier Privé** reimagines modern digital retail for luxury fashion, timepieces, and high-fidelity acoustics. Built with a strict black-and-white editorial aesthetic, fluid physics-based micro-interactions, and a hardened NestJS transactional backend, it provides instant sub-50ms catalog filtering, persistent cart synchronization, and encrypted multi-currency checkout.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph StorefrontUI["🖥️ Luxury Storefront (Next.js 16 + React 19)"]
        Hero["Kinetic Typography & Editorial Lookbook"]
        Catalog["Facet-Filtered Product Grid & Collection Slider"]
        PDP["Product Detail Page & Dynamic Variant Picker"]
        BagDrawer["Persistent Cart & Slide-Over Bag Drawer"]
        
        Hero & Catalog & PDP & BagDrawer
    end

    subgraph APIGateway["⚡ Backend API Service (NestJS Modular Core)"]
        AuthMid["JWT Auth & Session Guards"]
        CatalogService["Product, Variant & Collection Engine"]
        CartService["Server-Side Cart & Price Calculator"]
        OrderService["Order Processing & Transaction Ledger"]
        StripeGateway["Stripe Payment Intent & Webhook Controller"]
        
        StorefrontUI <--> AuthMid
        AuthMid --> CatalogService & CartService & OrderService
        OrderService --> StripeGateway
    end

    subgraph DataPersistence["💾 Persistence Layer (PostgreSQL)"]
        Postgres[(PostgreSQL Relational DB)]
        PrismaClient["Prisma 6 Client"]
        MediaCDN[(S3 / ImageKit High-Res Media Bucket)]
        
        CatalogService <--> PrismaClient <--> Postgres
        OrderService <--> PrismaClient
        CatalogService --> MediaCDN
    end
```

---

## 📊 Database ERD

```mermaid
erDiagram
    User ||--o{ Address : has
    User ||--o{ Order : places
    User ||--o{ Cart : maintains
    User ||--o{ Review : writes
    User ||--o{ Wishlist : creates
    
    Category ||--o{ Product : classifies
    Collection ||--o{ ProductCollection : groups
    Product ||--o{ ProductCollection : included_in
    Product ||--|{ ProductVariant : contains
    Product ||--o{ ProductImage : displays
    ProductVariant ||--|| Inventory : tracks
    
    Cart ||--|{ CartItem : holds
    Order ||--|{ OrderItem : comprises
    Order ||--|| Payment : settled_by
    Order ||--o{ Shipment : fulfilled_via

    User {
        string id PK "cuid"
        string email UK
        string passwordHash
        string fullName
        string role "CUSTOMER | ADMIN"
        datetime createdAt
    }

    Product {
        string id PK "cuid"
        string slug UK
        string title
        text editorialStory
        decimal basePrice
        string currency
        boolean isPublished
        datetime createdAt
    }

    ProductVariant {
        string id PK "cuid"
        string productId FK
        string sku UK
        string size
        string color
        string material
        decimal priceAdjustment
    }

    Inventory {
        string id PK "cuid"
        string variantId FK
        int stockQuantity
        int reservedQuantity
    }

    Cart {
        string id PK "cuid"
        string userId FK
        datetime updatedAt
    }

    CartItem {
        string id PK "cuid"
        string cartId FK
        string variantId FK
        int quantity
    }

    Order {
        string id PK "cuid"
        string orderNumber UK
        string userId FK
        decimal totalAmount
        string status "PENDING | CONFIRMED | SHIPPED | DELIVERED | CANCELLED"
        datetime createdAt
    }

    Payment {
        string id PK "cuid"
        string orderId FK
        decimal amount
        string provider "STRIPE | CARD"
        string stripePaymentIntentId UK
        string status "PAID | FAILED | REFUNDED"
        datetime paidAt
    }
```

---

## 🔄 Luxury Checkout & Inventory Sequence

```mermaid
sequenceDiagram
    autonumber
    actor Customer as 💎 Customer
    participant UI as 🖥️ Atelier Storefront
    participant API as ⚡ NestJS Gateway
    participant Stripe as 💳 Stripe Gateway
    participant DB as 💾 PostgreSQL (Prisma)

    Customer->>UI: Selects Limited Edition Watch (Material: Titanium)
    UI->>API: POST /api/cart/items { variantId, quantity: 1 }
    API->>DB: Verify Inventory Available (stock > reserved)
    API-->>UI: Slide-Over Bag Drawer updates in real time

    Customer->>UI: Clicks "Proceed to Checkout"
    UI->>API: POST /api/checkout/create-session
    API->>DB: Lock Inventory (increment reservedQuantity)
    API->>Stripe: Create Stripe PaymentIntent ($4,800.00)
    Stripe-->>API: Return Client Secret
    API-->>UI: Client Secret
    
    UI->>Stripe: Customer confirms card payment via Stripe Elements
    Stripe-->>UI: Payment Succeeded
    Stripe->>API: Webhook: `payment_intent.succeeded`
    
    API->>DB: Update Order status: CONFIRMED
    API->>DB: Decrement inventory stockQuantity
    API-->>Customer: 📨 Email Confirmation: Exclusive Order #AT-9841 Confirmed
```

---

## 🚀 Quick Start

### 1. Backend Setup (NestJS)
```bash
cd backend
pnpm install

# Push Database Schema
pnpm prisma db push

# Start Backend API (Port 4000)
pnpm run start:dev
```

### 2. Storefront Setup (Next.js 16)
```bash
cd ..
pnpm install

# Start Next.js App (Port 3000)
pnpm run dev
```

Visit `http://localhost:3000` to experience Atelier Privé.

---

## 📄 License
MIT License © **[Ros Rendo](https://github.com/RosRendo)**
