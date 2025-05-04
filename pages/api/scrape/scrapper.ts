import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

let cachedPointsTable: string[][] | null = null;
let cachedUpcomingMatches: any[] | null = null;
let lastCacheTime: number | null = null;
const ONE_HOUR = 60 * 60 * 1000;

export async function scrapeIPLData() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: null,
    timeout: 60000,
  });

  const now = Date.now();

  const getPointsTable = async () => {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36');
    await page.goto('https://www.iplt20.com/points-table/2025', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#pointsdata tr');

    const data = await page.evaluate(() => {
      const rows = document.querySelectorAll('#pointsdata tr');
      const tableData: string[][] = [];
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData: string[] = [];
        cells.forEach(cell => rowData.push(cell.innerText.trim()));
        if (rowData.length > 0) tableData.push(rowData);
      });
      return tableData;
    });

    await page.close();
    return data;
  };

  const getUpcomingMatches = async () => {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36');
    await page.goto('https://www.iplt20.com/matches/fixtures', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#team_archive li');

    const data = await page.$$eval('#team_archive li', lis => {
      return lis
        .map(li => {
          const statusAttr = li.querySelector('.vn-shedule-desk')?.getAttribute('ng-if') || '';
          if (!statusAttr.includes('UpComing')) return null;

          const get = (sel: string) => li.querySelector(sel)?.textContent?.trim() || '';
          const getImg = (sel: string) => li.querySelector(sel)?.getAttribute('src') || '';

          return {
            matchOrder: get('.vn-matchOrder'),
            matchDate: get('.vn-matchDate'),
            matchTime: get('.vn-matchTime'),
            venue: get('.vn-venueDet p'),
            team1: {
              name: get('.vn-shedTeam h3'),
              logo: getImg('.vn-shedTeam img'),
            },
            team2: {
              name: get('.vn-team-2 h3'),
              logo: getImg('.vn-team-2 img'),
            },
          };
        })
        .filter(Boolean);
    });

    await page.close();
    return data;
  };
  

  const getLiveMatches = async () => {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36');
    await page.goto('https://www.iplt20.com/matches/fixtures', { waitUntil: 'networkidle2' });

    try {
      await page.waitForSelector('#team_archive li', { timeout: 10000 });

      const matches = await page.evaluate(() => {
        const elements = document.querySelectorAll('#team_archive li');
        const data: any[] = [];

        elements.forEach(li => {
          if (!li.querySelector('.livematchIcon')) return;

          const get = (sel: string) => li.querySelector(sel)?.textContent?.trim() || '';
          const getAttr = (sel: string, attr: string) => li.querySelector(sel)?.getAttribute(attr) || '';

          data.push({
            matchNumber: get('.vn-matchOrder'),
            venue: get('.vn-venueDet p'),
            matchDate: get('.vn-matchDate'),
            matchTime: get('.vn-matchTime'),
            matchCentreLink: getAttr('.vn-matchBtn', 'href'),
            toss: get('.vn-ticketTitle'),
            team1: {
              name: get('.vn-shedTeam .vn-teamName h3'),
              code: get('.vn-shedTeam .vn-teamCode h3'),
              logo: getAttr('.vn-shedTeam img', 'src'),
              score: get('.vn-shedTeam p'),
              over: get('.vn-shedTeam .ov-display'),
            },
            team2: {
              name: get('.vn-team-2 .vn-teamName h3'),
              code: get('.vn-team-2 .vn-teamCode h3'),
              logo: getAttr('.vn-team-2 img', 'src'),
              score: get('.vn-team-2 p'),
              over: get('.vn-team-2 .ov-display'),
            },
          });
        });

        return data;
      });

      await page.close();
      return matches;
    } catch (err) {
      console.warn('⚠️ No live match section found.');
      await page.close();
      return [];
    }
  };

  // Fetch or return cached data
  if (!cachedPointsTable || !cachedUpcomingMatches || !lastCacheTime || now - lastCacheTime > ONE_HOUR) {
    console.log('🔄 Scraping fresh data...');
    [cachedPointsTable, cachedUpcomingMatches] = await Promise.all([
      getPointsTable(),
      getUpcomingMatches(),
    ]);
    lastCacheTime = now;
  } else {
    console.log('✅ Using cached pointsTable and upcomingMatches.');
  }

  const liveMatches = await getLiveMatches();

  await browser.close();

  return {
    pointsTable: cachedPointsTable,
    upcomingMatches: cachedUpcomingMatches,
    liveMatches,
  };
}
