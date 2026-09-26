import { PrismaClient } from '@prisma/client';
import { PRODUCTS } from '../src/lib/data/products';

const prisma = new PrismaClient();

async function main() {
  console.log('✦ Initiating Atelier database seed...');

  // 1. Clean existing records in correct relation order
  await prisma.orderItem.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.shipment.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.wishlistItem.deleteMany({});
  await prisma.wishlist.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.inventory.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.productCollection.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.collection.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.coupon.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('✓ Cleaned legacy records');

  // 2. Seed Users
  const adminUser = await prisma.user.create({
    data: {
      email: 'curator@atelier.design',
      firstName: 'Elena',
      lastName: 'Rostova',
      role: 'ADMIN',
      phone: '+41 44 218 90 00',
    },
  });

  const vipUser = await prisma.user.create({
    data: {
      email: 'marcus.vance@atelier.design',
      firstName: 'Marcus',
      lastName: 'Vance',
      role: 'CLIENT_VIP',
      phone: '+1 212 555 0199',
    },
  });

  await prisma.address.create({
    data: {
      userId: vipUser.id,
      type: 'SHIPPING',
      isDefault: true,
      recipientName: 'Marcus Vance',
      company: 'Vance Spatial Research',
      addressLine1: '450 West 14th Street',
      addressLine2: 'Penthouse B',
      city: 'New York',
      state: 'NY',
      postalCode: '10014',
      country: 'United States',
      phone: '+1 212 555 0199',
    },
  });

  console.log('✓ Seeded Users & Addresses (Marcus Vance VIP)');

  // 3. Seed Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: 'ATELIER10',
        description: '10% privilege discount for registered collectors',
        discountType: 'PERCENTAGE',
        discountValue: 10,
        isActive: true,
      },
      {
        code: 'ARCHIVE20',
        description: '20% private release archival code',
        discountType: 'PERCENTAGE',
        discountValue: 20,
        isActive: true,
      },
      {
        code: 'PRIVILEGE',
        description: '15% patron acquisition credit',
        discountType: 'PERCENTAGE',
        discountValue: 15,
        isActive: true,
      },
    ],
  });

  console.log('✓ Seeded Promotional Codes');

  // 4. Seed Categories
  const catAudio = await prisma.category.create({
    data: {
      name: 'Acoustic Architecture',
      slug: 'acoustic-architecture',
      description: 'Precision spatial transducers crafted from single-billet aluminum and acoustically damped ceramics.',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85',
      sortOrder: 1,
    },
  });

  const catObjects = await prisma.category.create({
    data: {
      name: 'Precision Instruments',
      slug: 'precision-instruments',
      description: 'Mechanical timepieces, machined titanium desk objects, and tactile analog tools.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
      sortOrder: 2,
    },
  });

  const catLighting = await prisma.category.create({
    data: {
      name: 'Sculptural Lighting',
      slug: 'sculptural-lighting',
      description: 'Monolithic luminaires exploring contrast, diffused refraction, and architectural presence.',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
      sortOrder: 3,
    },
  });

  const catLeather = await prisma.category.create({
    data: {
      name: 'Vegetable Tanned Leather',
      slug: 'vegetable-tanned-leather',
      description: 'Unlined Italian vachetta and matte bridle hide finished by hand in Florence.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
      sortOrder: 4,
    },
  });

  console.log('✓ Seeded Categories');

  // 5. Seed Collections
  const colMonolith = await prisma.collection.create({
    data: {
      title: 'Series 01: The Monolith',
      slug: 'the-monolith',
      tagline: 'Form stripped of ornamentation. Pure mass and silence.',
      description: 'A disciplined study in black anodized aluminum, bead-blasted stainless steel, and acoustic void.',
      heroImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1800&q=90',
      isFeatured: true,
      sortOrder: 1,
    },
  });

  const colAnalog = await prisma.collection.create({
    data: {
      title: 'Series 02: Tactile Analog',
      slug: 'tactile-analog',
      tagline: 'Mechanical resistance in an increasingly ethereal world.',
      description: 'Objects crafted to be touched, wound, calibrated, and passed down through generations.',
      heroImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1800&q=90',
      isFeatured: true,
      sortOrder: 2,
    },
  });

  const colQuiet = await prisma.collection.create({
    data: {
      title: 'Permanent Edition: Quietude',
      slug: 'quietude',
      tagline: 'Essential everyday companions of deliberate simplicity.',
      description: 'Items engineered for daily rituals with zero redundant parts.',
      heroImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1800&q=90',
      isFeatured: false,
      sortOrder: 3,
    },
  });

  console.log('✓ Seeded Lookbook Collections');

  // Mapping lookup tables
  const categoryMap: Record<string, string> = {
    cat_audio: catAudio.id,
    cat_objects: catObjects.id,
    cat_lighting: catLighting.id,
    cat_leather: catLeather.id,
  };

  const collectionMap: Record<string, string> = {
    'the-monolith': colMonolith.id,
    'tactile-analog': colAnalog.id,
    'quietude': colQuiet.id,
  };

  // 6. Seed All 24 Products with variants, inventory, and images
  console.log(`✦ Seeding ${PRODUCTS.length} curated luxury products...`);

  for (const p of PRODUCTS) {
    const categoryId = categoryMap[p.category.id] || catAudio.id;

    const createdProduct = await prisma.product.create({
      data: {
        title: p.title,
        slug: p.slug,
        subtitle: p.subtitle,
        description: p.description,
        story: p.story,
        details: Array.isArray(p.details) ? p.details.join('\n') : p.details,
        materials: p.materials,
        dimensions: p.dimensions,
        careGuide: p.careGuide,
        origin: p.origin,
        weightKg: p.weightKg,
        basePrice: p.basePrice,
        compareAtPrice: p.compareAtPrice || null,
        isFeatured: p.isFeatured,
        isNewArrival: p.isNewArrival,
        categoryId: categoryId,
        images: {
          create: p.images.map((img) => ({
            url: img.url,
            altText: img.altText,
            sortOrder: img.sortOrder,
            isHero: img.isHero || false,
            isSecondary: img.isSecondary || false,
          })),
        },
        variants: {
          create: p.variants.map((v) => ({
            sku: v.sku,
            title: v.title,
            colorName: v.colorName,
            colorHex: v.colorHex,
            size: v.size || null,
            price: v.price,
            inventory: {
              create: {
                quantity: v.stockQuantity || 15,
                reservedQuantity: 0,
              },
            },
          })),
        },
      },
    });

    // Link Collections
    for (const colSlug of p.collections) {
      const colId = collectionMap[colSlug];
      if (colId) {
        await prisma.productCollection.create({
          data: {
            productId: createdProduct.id,
            collectionId: colId,
          },
        });
      }
    }

    // Seed Verified Review for featured products
    if (p.isFeatured) {
      await prisma.review.create({
        data: {
          productId: createdProduct.id,
          userId: vipUser.id,
          authorName: 'Marcus Vance',
          rating: 5,
          title: `Acoustic and tactile perfection on ${p.title}.`,
          comment: `The industrial discipline and material authenticity are unrivaled. A permanent landmark in our collection.`,
          verifiedPurchase: true,
        },
      });
    }

    console.log(`  ✓ Seeded: ${p.title} (${p.slug})`);
  }

  console.log(`\n✦ Atelier Database Seeding Complete: ${PRODUCTS.length} products seeded with variants, inventory, and collections.\n`);
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
