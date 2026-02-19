import { promises as fs } from 'fs';
import path from 'path';
import HomeContent from './HomeContent';

async function getData() {
  const filePath = path.join(process.cwd(), 'src/app/data/travels.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function Home() {
  const data = await getData();
  return <HomeContent data={data} />;
}
