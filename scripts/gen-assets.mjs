// 生成 assets.json —— 用纯 Node.js 运行
import { writeFileSync } from "node:fs";

function seedRandom(seed) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 0x100000000; };
}
function seededGauss(rand) {
  let u = 0, v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function generateKlines(params) {
  const rand = seedRandom(params.seed);
  const klines = [];
  const isCrypto = params.category === "crypto";
  const start = new Date(params.startDate);
  let price = params.startPrice;
  const dt = 1 / 252, sqrtDt = Math.sqrt(dt);
  for (let i = 0; i < params.days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    if (!isCrypto) { const dow = d.getDay(); if (dow === 0 || dow === 6) continue; }
    const open = price;
    const ret = params.drift * dt + params.volatility * sqrtDt * seededGauss(rand);
    const close = open * Math.exp(ret);
    const rangeRatio = Math.abs(ret) * 1.5 + params.volatility * sqrtDt * 0.4;
    const highFactor = 1 + Math.abs(rangeRatio) * (0.4 + rand() * 0.6);
    const lowFactor = 1 - Math.abs(rangeRatio) * (0.4 + rand() * 0.6);
    const high = Math.max(open, close) * highFactor;
    const low = Math.min(open, close) * lowFactor;
    const volNoise = 0.6 + rand() * 0.8;
    const volRatio = 1 + Math.abs(ret) * 15;
    const volume = Math.round(params.volumeBase * volNoise * volRatio);
    klines.push({
      date: d.toISOString().slice(0, 10),
      open: +open.toFixed(2), high: +high.toFixed(2), low: +low.toFixed(2),
      close: +close.toFixed(2), volume,
    });
    price = close;
  }
  return { symbol: params.symbol, name: params.name, category: params.category, klines };
}

const ASSET_DEFS = [
  { symbol: "AAPL", name: "Apple Inc.", category: "stock", startPrice: 185.2, drift: 0.18, volatility: 0.28, volumeBase: 58_000_000, seed: 42, startDate: "2023-01-03", days: 520 },
  { symbol: "TSLA", name: "Tesla, Inc.", category: "stock", startPrice: 118.5, drift: 0.35, volatility: 0.68, volumeBase: 115_000_000, seed: 77, startDate: "2023-01-03", days: 520 },
  { symbol: "GOOGL", name: "Alphabet Inc.", category: "stock", startPrice: 88.3, drift: 0.22, volatility: 0.26, volumeBase: 25_000_000, seed: 123, startDate: "2023-01-03", days: 520 },
  { symbol: "SPY", name: "S&P 500 ETF", category: "index", startPrice: 382.5, drift: 0.13, volatility: 0.18, volumeBase: 75_000_000, seed: 9, startDate: "2023-01-03", days: 520 },
  { symbol: "BTC", name: "Bitcoin / USD", category: "crypto", startPrice: 16600, drift: 0.9, volatility: 0.85, volumeBase: 28_000_000_000, seed: 2024, startDate: "2023-01-03", days: 730 },
  { symbol: "ETH", name: "Ethereum / USD", category: "crypto", startPrice: 1200, drift: 0.6, volatility: 0.8, volumeBase: 14_000_000_000, seed: 888, startDate: "2023-01-03", days: 730 },
];

const ASSETS = ASSET_DEFS.map((d) => generateKlines(d));
writeFileSync("src/data/assets.json", JSON.stringify(ASSETS));
console.log(`Wrote assets.json — ${ASSETS.length} assets`);
