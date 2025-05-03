import type { NextApiRequest, NextApiResponse } from 'next';
import { scrapeIPLData } from './scrapper'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await scrapeIPLData();
    res.status(200).json(data);
  } catch (error: any) {
    console.log('error in scrapping data ', error)
    res.status(500).json({ error: error.message || 'Scraping failed' });
  }
}
