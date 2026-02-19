import { promises as fs } from 'fs';
import path from 'path';
import FaqPageContent from './FaqPageContent';

async function getData() {
  const filePath = path.join(process.cwd(), 'src/app/data/travels.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export const metadata = {
  title: 'FAQ - FlyTravel | Frequently Asked Questions',
  description: 'Find answers to common questions about booking, payments, cancellations, and travel insurance.',
};

export default async function FAQPage() {
  const data = await getData();
  const faqItems = (data.faq || []).sort((a: { order: number }, b: { order: number }) => a.order - b.order);
  return <FaqPageContent faqItems={faqItems} />;
}
