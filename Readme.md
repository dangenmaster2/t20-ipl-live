SETUP INSTRUCTIONS:

1. clone the repo https://github.com/dangenmaster2/t20-ipl-live.git
2. Node version > 18
3. Run npm install. It will install the necessary modules.
4. Run npm run dev to see locally ipl live data scrapped from iplt20.com


SCRAPPING METHODOLOGY:

## 📓 IPL Scraping Methodology

### 📁 File: `lib/scraper.ts`

This document explains how the IPL 2025 data is scraped from the official IPL website using Puppeteer.

---

### 🛠️ Tools & Libraries

* **[puppeteer-extra](https://github.com/berstend/puppeteer-extra)**: Puppeteer with plugin support.
* **[puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth)**: Avoids detection by bot-protection mechanisms on the IPL site.
* **Caching Logic**: Implements in-memory caching to avoid repeated scraping within 1 hour.
* **Headless Browser**: Runs Chrome in headless mode with specific arguments (`--no-sandbox`, etc.).

---

### 🌐 Target Website

* **Points Table**: `https://www.iplt20.com/points-table/2025`
* **Match Fixtures (Live & Upcoming)**: `https://www.iplt20.com/matches/fixtures`

---

### 🧲 Scraping Functions

#### 1. `getPointsTable()`

* Navigates to the points table page.
* Waits for table rows using the selector `#pointsdata tr`.
* Iterates through each row and extracts inner text from `td` elements.
* Returns a 2D array of strings representing the table.

```ts
await page.goto('https://www.iplt20.com/points-table/2025');
await page.waitForSelector('#pointsdata tr');
// DOM parsing to extract cell text from each row
```

---

#### 2. `getUpcomingMatches()`

* Opens the fixtures page and waits for list items under `#team_archive li`.
* Filters matches by checking if the `ng-if` attribute contains "UpComing".
* Extracts:

  * Match order, date, time, and venue
  * Team names and logos

```ts
await page.goto('https://www.iplt20.com/matches/fixtures');
await page.waitForSelector('#team_archive li');
// Filters elements with UpComing flag
```

---

#### 3. `getLiveMatches()`

* Same page as `getUpcomingMatches`.
* Identifies live matches by presence of `.livematchIcon` class.
* Extracts:

  * Team names, codes, scores, overs
  * Toss info
  * Match center link

```ts
if (!li.querySelector('.livematchIcon')) return;
```

---

### 🧠 Caching Logic

To reduce load and improve performance:

* `pointsTable` and `upcomingMatches` are **cached for 1 hour**.
* `liveMatches` is always freshly fetched on each request (as it's real-time).

```ts
if (!cachedPointsTable || !cachedUpcomingMatches || Date.now() - lastCacheTime > ONE_HOUR) {
  // Refresh cache
}
```

---

### 🗜️ Browser Management

* Uses a single `browser` instance for all scraping functions.
* Launches with:

  * `headless: true`
  * `--no-sandbox` (for server environments)
  * Custom user agent to mimic real users
* Closes browser instance at the end.

---

### 🔒 Known Limitations

* **Deployment**: Puppeteer is not compatible with most serverless platforms like Netlify/Vercel.
* **Stealth**: Although the stealth plugin helps, scraping may break if IPL updates its site structure.
* **No Persistence**: Cache is in-memory. Restarts will reset it.

---


