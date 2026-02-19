import { promises as fs } from 'fs';
import path from 'path';
import DestinationsContent from './DestinationsContent';

async function getData() {
  const filePath = path.join(process.cwd(), 'src/app/data/travels.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export const metadata = {
  title: 'All Destinations - FlyTravel',
  description: 'Explore all our travel destinations. Find your perfect vacation package.',
};

export default async function AllDestinationsPage() {
  const data = await getData();
  const destinations = data.destinations || [];
  return <DestinationsContent destinations={destinations} />;
}
