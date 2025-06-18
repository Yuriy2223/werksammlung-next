import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Stat } from "@/models/stat";

async function getCountryByIP(ip: string): Promise<string> {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/country_name/`);
    if (!res.ok) return "Unknown";
    const country = await res.text();
    return country || "Unknown";
  } catch {
    return "Unknown";
  }
}

export async function GET() {
  const stats = await Stat.find().sort({ date: -1 });
  const totalVisits = stats.length;
  const totalTime = stats.reduce((acc, s) => acc + (s.timeSpent || 0), 0);
  const countries: Record<string, number> = {};
  stats.forEach(({ country }) => {
    if (country) {
      countries[country] = (countries[country] || 0) + 1;
    }
  });

  return NextResponse.json({
    totalVisits,
    totalTime,
    countries,
    visits: stats,
  });
}

// export async function POST(req: NextRequest) {
//   let ip = req.headers.get("x-forwarded-for") || "8.8.8.8";

//   if (ip.includes(",")) {
//     ip = ip.split(",")[0].trim();
//   }

//   if (
//     !ip ||
//     ip === "::1" ||
//     ip.startsWith("127.") ||
//     ip.startsWith("::ffff:127.")
//   ) {
//     ip = "8.8.8.8";
//   }

//   const country = await getCountryByIP(ip);

//   let body;
//   try {
//     body = await req.json();
//   } catch {
//     return NextResponse.json(
//       { error: "Invalid or missing JSON body" },
//       { status: 400 }
//     );
//   }

//   // const body = await req.json();
//   const timeSpent = Number(body.timeSpent);
//   if (isNaN(timeSpent) || timeSpent < 0) {
//     return NextResponse.json(
//       { error: "Invalid timeSpent value" },
//       { status: 400 }
//     );
//   }

//   const stat = new Stat({ country, timeSpent });
//   await stat.save();

//   return NextResponse.json(stat, { status: 201 });
// }

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid or missing JSON body" },
      { status: 400 }
    );
  }

  if (id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const additionalTime = Number(body.additionalTime);
    if (!additionalTime || additionalTime <= 0) {
      return NextResponse.json(
        { error: "Invalid additionalTime" },
        { status: 400 }
      );
    }

    const stat = await Stat.findById(id);
    if (!stat) {
      return NextResponse.json({ error: "Stat not found" }, { status: 404 });
    }

    stat.timeSpent = (stat.timeSpent || 0) + additionalTime;
    await stat.save();

    return NextResponse.json(stat, { status: 200 });
  }

  let ip = req.headers.get("x-forwarded-for") || "8.8.8.8";

  if (ip.includes(",")) {
    ip = ip.split(",")[0].trim();
  }

  if (
    !ip ||
    ip === "::1" ||
    ip.startsWith("127.") ||
    ip.startsWith("::ffff:127.")
  ) {
    ip = "8.8.8.8";
  }

  const country = await getCountryByIP(ip);
  const timeSpent = Number(body.timeSpent);
  if (isNaN(timeSpent) || timeSpent < 0) {
    return NextResponse.json(
      { error: "Invalid timeSpent value" },
      { status: 400 }
    );
  }

  const stat = new Stat({ country, timeSpent });
  await stat.save();

  return NextResponse.json(stat, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const additionalTime = body.additionalTime;

  if (typeof additionalTime !== "number" || additionalTime <= 0) {
    return NextResponse.json(
      { error: "Invalid additionalTime value" },
      { status: 400 }
    );
  }

  const stat = await Stat.findById(id);
  if (!stat) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  stat.timeSpent = (stat.timeSpent || 0) + additionalTime;
  await stat.save();

  return NextResponse.json(stat);
}
