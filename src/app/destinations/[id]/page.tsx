import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import DestinationDetailContent from './DestinationDetailContent';

async function getData() {
  const filePath = path.join(process.cwd(), 'src/app/data/travels.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getData();
  const destination = data.destinations.find((d: { id: string }) => d.id === id);
  if (!destination) return { title: 'Destination Not Found' };
  return {
    title: `${destination.name} - FlyTravel`,
    description: destination.description,
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getData();
  const destination = data.destinations.find((d: { id: string }) => d.id === id);

  if (!destination) notFound();

  return <DestinationDetailContent destination={destination} />;
}
