import { NextApiRequest, NextApiResponse } from 'next';
import { firstOf } from 'utils/arrays';
import { ApiError } from 'next/dist/next-server/server/api-utils';
import { handleErrors } from 'libs/nexts/middlewares/errors';
import { flow } from 'lodash';
import puppeteer, { devices } from 'puppeteer-core';

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
  // const chromium = require('chrome-aws-lambda');
  const browser = await puppeteer.launch({
    // args: ['--window-size=1024,968'],
    // defaultViewport: {width: 1024, height: 968, deviceScaleFactor: 2}
    // args: chromium.args,
    // defaultViewport: chromium.defaultViewport,
    // executablePath: await chromium.executablePath,
    // headless: chromium.headless,
  });
  const page = await browser.newPage();

  if (dev) {
    await page.emulate(dev);
  }

  await page.goto(url);

  const buffer = await page.screenshot({
    // path: `/tmp/${device ?? 'default'}-${encodeURIComponent(url)}.png`,
    fullPage: true,
  });
  await browser.close();
  res.setHeader('Content-Type', 'image/png');
  res.status(200).send(buffer);
};

export default flow([handleErrors()])(handler);
