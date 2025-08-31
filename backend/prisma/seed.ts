
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mycine-g.com' },
    update: {},
    create: {
      name: 'Admin MyCine G',
      email: 'admin@mycine-g.com',
      password: adminPassword,
      role: 'ADMIN',
      xp: 5000,
      level: 50,
      rank: 'Mestre',
    },
  });

  // Create demo user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@mycine-g.com' },
    update: {},
    create: {
      name: 'João Silva',
      email: 'user@mycine-g.com',
      password: userPassword,
      role: 'USER',
      xp: 250,
      level: 3,
      rank: 'Prata',
    },
  });

  // Create sample titles
  const titles = [
    {
      title: 'The Godfather',
      description: 'A saga da família Corleone, uma das mais poderosas famílias da máfia americana.',
      type: 'MOVIE',
      genre: 'Drama/Crime',
      releaseYear: 1972,
    },
    {
      title: 'Breaking Bad',
      description: 'Um professor de química se torna um fabricante de metanfetamina.',
      type: 'SERIES',
      genre: 'Drama/Crime',
      releaseYear: 2008,
    },
    {
      title: 'Pulp Fiction',
      description: 'Histórias entrelaçadas de crime e redenção em Los Angeles.',
      type: 'MOVIE',
      genre: 'Crime/Drama',
      releaseYear: 1994,
    },
    {
      title: 'Game of Thrones',
      description: 'Reinos lutam pelo controle do Trono de Ferro em Westeros.',
      type: 'SERIES',
      genre: 'Fantasy/Drama',
      releaseYear: 2011,
    },
    {
      title: 'The Dark Knight',
      description: 'Batman enfrenta o Coringa em Gotham City.',
      type: 'MOVIE',
      genre: 'Action/Crime',
      releaseYear: 2008,
    },
    {
      title: 'Stranger Things',
      description: 'Crianças enfrentam forças sobrenaturais nos anos 80.',
      type: 'SERIES',
      genre: 'Sci-Fi/Horror',
      releaseYear: 2016,
    },
  ];

  const createdTitles = [];
  for (const titleData of titles) {
    const title = await prisma.title.upsert({
      where: { title: titleData.title },
      update: {},
      create: titleData,
    });
    createdTitles.push(title);
  }

  // Create sample reviews
  const reviews = [
    {
      rating: 5,
      comment: 'Obra-prima absoluta do cinema!',
      userId: user.id,
      titleId: createdTitles[0].id,
    },
    {
      rating: 4,
      comment: 'Série viciante, recomendo!',
      userId: user.id,
      titleId: createdTitles[1].id,
    },
    {
      rating: 5,
      comment: 'Tarantino é genial!',
      userId: admin.id,
      titleId: createdTitles[2].id,
    },
  ];

  for (const reviewData of reviews) {
    await prisma.review.upsert({
      where: {
        userId_titleId: {
          userId: reviewData.userId,
          titleId: reviewData.titleId,
        },
      },
      update: {},
      create: reviewData,
    });
  }

  // Create challenges
  const challenges = [
    {
      title: 'Primeira Avaliação',
      description: 'Faça sua primeira avaliação de filme ou série',
      type: 'UNIQUE',
      targetValue: 1,
      xpReward: 50,
      isActive: true,
    },
    {
      title: 'Crítico Diário',
      description: 'Avalie 3 títulos em um dia',
      type: 'DAILY',
      targetValue: 3,
      xpReward: 30,
      isActive: true,
    },
    {
      title: 'Maratonista Semanal',
      description: 'Avalie 10 títulos em uma semana',
      type: 'WEEKLY',
      targetValue: 10,
      xpReward: 100,
      isActive: true,
    },
    {
      title: 'Veterano Cinéfilo',
      description: 'Avalie 50 títulos no total',
      type: 'UNIQUE',
      targetValue: 50,
      xpReward: 200,
      isActive: true,
    },
    {
      title: 'Especialista',
      description: 'Avalie 100 títulos no total',
      type: 'UNIQUE',
      targetValue: 100,
      xpReward: 500,
      isActive: true,
    },
  ];

  for (const challengeData of challenges) {
    await prisma.challenge.upsert({
      where: { title: challengeData.title },
      update: {},
      create: challengeData,
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('📧 Admin: admin@mycine-g.com / admin123');
  console.log('📧 User: user@mycine-g.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
