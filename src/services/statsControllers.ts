import { Stat } from "../models/stat.js";

export const createStat = async (req, res) => {
  let ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress;
  if (ip?.includes(",")) ip = ip.split(",")[0].trim();
  if (
    !ip ||
    ip === "::1" ||
    ip.startsWith("127.") ||
    ip.startsWith("::ffff:127.")
  ) {
    ip = "8.8.8.8";
  }

  const response = await fetch(`https://ipapi.co/${ip}/country_name/`);
  const country = response.ok ? await response.text() : "Unknown";
  const timeSpent = Number(req.body.timeSpent);

  if (isNaN(timeSpent) || timeSpent < 0) {
    return res.status(400).json({ error: "Invalid timeSpent value" });
  }

  const stat = new Stat({ country, timeSpent });
  await stat.save();
  res.status(201).json(stat);
};

export const updateStat = async (req, res) => {
  const { id } = req.params;
  const { additionalTime } = req.body;

  if (typeof additionalTime !== "number" || additionalTime <= 0) {
    return res.status(400).json({ error: "Invalid additionalTime value" });
  }

  const stat = await Stat.findById(id);
  if (!stat) return res.status(404).json({ error: "Not found" });

  stat.timeSpent += additionalTime;
  await stat.save();
  res.json(stat);
};

export const getStats = async (req, res) => {
  const stats = await Stat.find().sort({ date: -1 });
  const totalVisits = stats.length;
  const totalTime = stats.reduce((acc, s) => acc + (s.timeSpent || 0), 0);
  const countries = {};

  stats.forEach(({ country }) => {
    countries[country] = (countries[country] || 0) + 1;
  });

  res.status(200).json({
    totalVisits,
    totalTime,
    countries,
    visits: stats,
  });
};
