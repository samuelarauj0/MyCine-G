import { PrismaClient, TitleType, ChallengeKind } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { title } from 'process';

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
      passwordHash: adminPassword,
      role: 'ADMIN',
      xp: 5000,
      level: 50,
      rank: 'MASTER',
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
      passwordHash: userPassword,
      role: 'USER',
      xp: 250,
      level: 3,
      rank: 'SILVER',
    },
  });

  // Create sample titles
  const titles = [
    {
      title: 'The Godfather',
      name: 'The Godfather',
      description: 'A saga da família Corleone, uma das mais poderosas famílias da máfia americana.',
      type: TitleType.MOVIE,
      releaseDate: new Date('1972-03-24'),
      director: 'Francis Ford Coppola',
    },
    {
      title: 'Breaking Bad',
      name: 'Breaking Bad',
      description: 'Um professor de química se torna um fabricante de metanfetamina.',
      type: TitleType.SERIES,
      releaseDate: new Date('2008-01-20'),
      director: 'Vince Gilligan',
    },
    {
      title: 'Pulp Fiction',
      name: 'Pulp Fiction',
      description: 'Histórias entrelaçadas de crime e redenção em Los Angeles.',
      type: TitleType.MOVIE,
      releaseDate: new Date('1994-10-14'),
      director: 'Quentin Tarantino',
    },
    {
      title: 'Game of Thrones',
      name: 'Game of Thrones',
      description: 'Reinos lutam pelo controle do Trono de Ferro em Westeros.',
      type: TitleType.SERIES, 
      releaseDate: new Date('2011-04-17'),
      director: 'David Benioff',
    },
    {
      title: 'The Dark Knight',
      name: 'The Dark Knight',
      description: 'Batman enfrenta o Coringa em Gotham City.',
      type: TitleType.MOVIE,
      releaseDate: new Date('2008-07-18'),
      director: 'Christopher Nolan',
    },
    {
      title: 'Stranger Things',
      name: 'Stranger Things',
      description: 'Crianças enfrentam forças sobrenaturais nos anos 80.',
      type: TitleType.SERIES,
      releaseDate: new Date('2016-07-15'),
      director: 'The Duffer Brothers',
    },
  ];

  const createdTitles = [];
  for (const titleData of titles) {
    const title = await prisma.title.create({
      data: titleData,
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
      type: ChallengeKind.ONCE,
      targetValue: 1,
      xpReward: 50,
      isActive: true,
    },
    {
      title: 'Crítico Diário',
      description: 'Avalie 3 títulos em um dia',
      type: ChallengeKind.DAILY,
      targetValue: 3,
      xpReward: 30,
      isActive: true,
    },
    {
      title: 'Maratonista Semanal',
      description: 'Avalie 10 títulos em uma semana',
      type: ChallengeKind.WEEKLY,
      targetValue: 10,
      xpReward: 100,
      isActive: true,
    },
    {
      title: 'Veterano Cinéfilo',
      description: 'Avalie 50 títulos no total',
      type: ChallengeKind.ONCE,
      targetValue: 50,
      xpReward: 200,
      isActive: true,
    },
     {
      title: 'Especialista',
      description: 'Avalie 100 títulos no total',
      type: ChallengeKind.ONCE,
      targetValue: 100,
      xpReward: 500,
      isActive: true,
    },
  ];

  for (const challengeData of challenges) {
    await prisma.challenge.create({
      data: challengeData,
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