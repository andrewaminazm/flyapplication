import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/app/data/travels.json');

async function readData() {
  const fileContents = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
}

async function writeData(data: any) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// GET - Fetch all data
export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

// POST - Add or update item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data: itemData } = body;

    const allData = await readData();

    if (type === 'destinations') {
      const existingIndex = allData.destinations.findIndex(
        (d: any) => d.id === itemData.id
      );
      if (existingIndex >= 0) {
        allData.destinations[existingIndex] = itemData;
      } else {
        allData.destinations.push(itemData);
      }
    } else if (type === 'offers') {
      const existingIndex = allData.offers.findIndex(
        (o: any) => o.id === itemData.id
      );
      if (existingIndex >= 0) {
        allData.offers[existingIndex] = itemData;
      } else {
        allData.offers.push(itemData);
      }
    } else if (type === 'testimonials') {
      if (!allData.testimonials) allData.testimonials = [];
      const existingIndex = allData.testimonials.findIndex(
        (t: any) => t.id === itemData.id
      );
      if (existingIndex >= 0) {
        allData.testimonials[existingIndex] = itemData;
      } else {
        allData.testimonials.push(itemData);
      }
    } else if (type === 'faq') {
      if (!allData.faq) allData.faq = [];
      const existingIndex = allData.faq.findIndex(
        (f: any) => f.id === itemData.id
      );
      if (existingIndex >= 0) {
        allData.faq[existingIndex] = itemData;
      } else {
        allData.faq.push(itemData);
      }
    }

    await writeData(allData);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save data' },
      { status: 500 }
    );
  }
}

// DELETE - Remove item
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id } = body;

    const allData = await readData();

    if (type === 'destinations') {
      allData.destinations = allData.destinations.filter(
        (d: any) => d.id !== id
      );
    } else if (type === 'offers') {
      allData.offers = allData.offers.filter((o: any) => o.id !== id);
    } else if (type === 'testimonials' && allData.testimonials) {
      allData.testimonials = allData.testimonials.filter(
        (t: any) => t.id !== id
      );
    } else if (type === 'faq' && allData.faq) {
      allData.faq = allData.faq.filter((f: any) => f.id !== id);
    }

    await writeData(allData);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete data' },
      { status: 500 }
    );
  }
}
