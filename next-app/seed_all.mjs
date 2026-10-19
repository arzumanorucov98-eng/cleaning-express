import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs } from "firebase/firestore";
import fs from 'fs';
import { DEFAULT_SERVICES, DEFAULT_BLOGS, DEFAULT_SETTINGS, DEFAULT_SEO } from './src/lib/data.js';

// Read .env.local manually
const envContent = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    value = value.replace(/(^['"]|['"]$)/g, '').trim();
    env[match[1]] = value;
  }
});

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedData() {
  try {
    console.log("Seeding data to Firebase project:", firebaseConfig.projectId);

    // 1. Seed Services
    console.log(`Seeding ${DEFAULT_SERVICES.length} services...`);
    for (const service of DEFAULT_SERVICES) {
      const serviceData = {
        name: service.title,
        title: service.title,
        slug: service.slug,
        price: service.slug === 'ev-temizliyi' ? '50 AZN-dən' :
               service.slug === 'temir-sonrasi-temizlik' ? '120 AZN-dən' :
               service.slug === 'yumsaq-mebel-kimyavi-temizliyi' ? '20 AZN-dən' :
               service.slug === 'obyekt-temizliyi' ? '80 AZN-dən' :
               service.slug === 'restoran-temizliyi' ? '100 AZN-dən' : '60 AZN-dən',
        icon: service.icon,
        scene: service.scene,
        calc: service.calc,
        tagline: service.tagline,
        description: service.description,
        points: service.points
      };
      await setDoc(doc(db, 'services', service.slug), serviceData, { merge: true });
      console.log(`✓ Service: ${service.title} (${service.slug})`);
    }

    // 2. Seed Blogs
    console.log(`Seeding ${DEFAULT_BLOGS.length} blogs...`);
    for (const blog of DEFAULT_BLOGS) {
      const blogData = {
        title: blog.title,
        slug: blog.slug,
        description: blog.description,
        content: blog.content,
        author: blog.author || 'Cleaning Express Admin',
        date: blog.date || '2026-10-10',
        imageUrl: blog.imageUrl || '',
        seoTitle: `${blog.title} — Cleaning Express Service`,
        seoDescription: blog.description
      };
      await setDoc(doc(db, 'blogs', blog.slug), blogData, { merge: true });
      console.log(`✓ Blog: ${blog.title} (${blog.slug})`);
    }

    // 3. Seed Global Settings
    console.log("Seeding global contact and social settings...");
    await setDoc(doc(db, 'settings', 'global'), DEFAULT_SETTINGS, { merge: true });
    console.log("✓ Settings global");

    // 4. Seed SEO Settings
    console.log("Seeding SEO settings...");
    await setDoc(doc(db, 'settings', 'seo'), DEFAULT_SEO, { merge: true });
    console.log("✓ Settings SEO");

    console.log("\nSUCCESS: Bütün xidmətlər və bloqlar uğurla Firebase bazasına yükləndi!");
    process.exit(0);
  } catch (error) {
    console.error("Xəta baş verdi:", error);
    process.exit(1);
  }
}

seedData();
