import { NextApiRequest, NextApiResponse } from 'next';
import { firstOf } from '@wener/utils/src/arrays/firstOf';
import { ApiError } from 'next/dist/next-server/server/api-utils';
import { handleErrors } from 'src/libs/nexts/middlewares/errors';
import { flow } from 'lodash';
import puppeteer, { Browser, devices } from 'puppeteer-core';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { url, device } = req.query;
  url = firstOf(url);
  device = firstOf(device);
  if (!url) {
    throw new ApiError(400, 'invalid url');
  }

  let dev: devices.Device;
  if (device) {
    dev = puppeteer.devices[device];
    if (!dev) {
      throw new ApiError(400, 'invalid device');
    }
  }
  let browser: Browser;
  try {
    const chromium = require('chrome-aws-lambda');
    browser = await puppeteer.launch({
      // args: ['--window-size=1024,968'],
      // defaultViewport: { width: 1024, height: 968, deviceScaleFactor: 2 },
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless
    });
  } catch (e) {
    res.status(400).json({});
    return;
  }
  const page = await browser.newPage();

  if (dev) {
    await page.emulate(dev);
  }

  await page.goto(url);

  const buffer = await page.screenshot({
    // path: `/tmp/${device ?? 'default'}-${encodeURIComponent(url)}.png`,
    fullPage: true
  });
  await browser.close();
  res.setHeader('Content-Type', 'image/png');
  res.status(200).send(buffer);
};

export default flow([handleErrors()])(handler);
