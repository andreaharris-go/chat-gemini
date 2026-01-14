import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-gemini';

async function initDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();

    // Initialize company_info collection
    const companyInfo = db.collection('company_info');
    const infoCount = await companyInfo.countDocuments();
    if (infoCount === 0) {
      await companyInfo.insertOne({
        name: 'Example Tech Company',
        description: 'We are a leading technology company providing innovative solutions.',
        mission: 'To deliver cutting-edge technology solutions that empower businesses.',
        vision: 'To be the most trusted technology partner in the industry.',
        founded: '2020',
        location: 'Bangkok, Thailand',
        contact: {
          email: 'contact@example.com',
          phone: '+66-2-xxx-xxxx',
          website: 'https://example.com',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('✓ Initialized company_info collection');
    } else {
      console.log('⊙ company_info collection already has data');
    }

    // Initialize company_services collection
    const companyServices = db.collection('company_services');
    const servicesCount = await companyServices.countDocuments();
    if (servicesCount === 0) {
      await companyServices.insertMany([
        {
          name: 'Web Development',
          description: 'Custom web application development using modern technologies.',
          category: 'Development',
          features: ['Responsive Design', 'Progressive Web Apps', 'API Integration', 'Cloud Deployment'],
          pricing: 'Contact for quote',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Mobile App Development',
          description: 'Native and cross-platform mobile application development.',
          category: 'Development',
          features: ['iOS Development', 'Android Development', 'React Native', 'Flutter'],
          pricing: 'Contact for quote',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cloud Consulting',
          description: 'Expert cloud architecture and migration services.',
          category: 'Consulting',
          features: ['AWS', 'Google Cloud', 'Azure', 'Cloud Migration', 'Cost Optimization'],
          pricing: 'Contact for quote',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      console.log('✓ Initialized company_services collection');
    } else {
      console.log('⊙ company_services collection already has data');
    }

    // Initialize company_products collection
    const companyProducts = db.collection('company_products');
    const productsCount = await companyProducts.countDocuments();
    if (productsCount === 0) {
      await companyProducts.insertMany([
        {
          name: 'Enterprise CRM System',
          description: 'A comprehensive customer relationship management system.',
          category: 'Software',
          features: ['Contact Management', 'Sales Pipeline', 'Reporting', 'Integration APIs'],
          price: 999,
          availability: 'Available',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Project Management Tool',
          description: 'Collaborative project management and tracking software.',
          category: 'Software',
          features: ['Task Management', 'Time Tracking', 'Team Collaboration', 'Gantt Charts'],
          price: 499,
          availability: 'Available',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Analytics Dashboard',
          description: 'Real-time business analytics and visualization platform.',
          category: 'Software',
          features: ['Real-time Data', 'Custom Dashboards', 'Multiple Data Sources', 'Export Reports'],
          price: 799,
          availability: 'Available',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      console.log('✓ Initialized company_products collection');
    } else {
      console.log('⊙ company_products collection already has data');
    }

    console.log('\n✓ Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

initDatabase();
