"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { parseISO, format, isValid } from "date-fns";
import { Stats } from "@/types";
import { privateInstance } from "@/services/httpClient";
import VisitsLineChartByMonth from "@/components/VisitsLineChartByMonth/VisitsLineChartByMonth";
import { selectLoggedIn } from "@/redux/auth/selectors";
import { FiltersPanel } from "@/components/FiltersPanel/FiltersPanel";
import CalendarCard from "@/components/CalendarCard/CalendarCard";
import VisitsLineChart from "@/components/VisitsLineChart/VisitsLineChart";
import DurationBarChart from "@/components/DurationBarChart/DurationBarChart";
import CountryPieChart from "@/components/CountryPieChart/CountryPieChart";
import { SummaryCard } from "@/components/SummaryCard/SummaryCard";
import {
  ChartGrid,
  UserPageTitle,
  UserPageContainer,
} from "@/styles/UserPage.steled";

export default function User() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const isLoggedIn = useSelector(selectLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
      return;
    }

    const fetchStats = async () => {
      try {
        await new Promise((r) => setTimeout(r, 600));
        const res = await privateInstance.get("/api/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Помилка завантаження статистики", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;
  if (loading) return <UserPageContainer>Завантаження...</UserPageContainer>;
  if (!stats)
    return <UserPageContainer>Статистика недоступна...</UserPageContainer>;

  const safeParseISO = (dateStr?: string | null) => {
    if (!dateStr) return null;
    const parsed = parseISO(dateStr);
    return isValid(parsed) ? parsed : null;
  };

  const filterVisits = stats.visits.filter((visit) => {
    const created = safeParseISO(visit.date);
    if (!created) return false;
    if (startDate && created < startDate) return false;
    if (endDate && created > endDate) return false;
    return true;
  });

  const visitsByDateData = Object.entries(
    filterVisits.reduce((acc: Record<string, number>, visit) => {
      const date = format(parseISO(visit.date), "yyyy-MM-dd");
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {})
  ).map(([date, count]) => ({ date, count }));

  const visitsByMonthData = Object.entries(
    filterVisits.reduce((acc: Record<string, number>, visit) => {
      const month = format(parseISO(visit.date), "yyyy-MM");
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {})
  ).map(([month, count]) => ({ month, count }));

  const times = filterVisits.map((v) => v.timeSpent);
  const avg = times.length
    ? Math.round(times.reduce((a, b) => a + b, 0) / times.length)
    : 0;
  const min = times.length ? Math.min(...times) : 0;
  const max = times.length ? Math.max(...times) : 0;

  const buildDurationData = (
    visits: typeof filterVisits,
    groupBy: "day" | "week" | "month"
  ) => {
    const formatter = {
      day: (date: string) => format(parseISO(date), "yyyy-MM-dd"),
      week: (date: string) => format(parseISO(date), "yyyy-'W'II"),
      month: (date: string) => format(parseISO(date), "yyyy-MM"),
    }[groupBy];

    const grouped: Record<string, number[]> = {};

    visits.forEach((v) => {
      const key = formatter(v.date);
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(v.timeSpent);
    });

    return Object.entries(grouped).map(([key, durations]) => ({
      name: key,
      duration: Math.round(
        durations.reduce((a, b) => a + b, 0) / durations.length
      ),
    }));
  };

  const durationData = {
    day: buildDurationData(filterVisits, "day"),
    week: buildDurationData(filterVisits, "week"),
    month: buildDurationData(filterVisits, "month"),
  };

  const countriesData = Object.entries(
    filterVisits.reduce((acc: Record<string, number>, v) => {
      acc[v.country] = (acc[v.country] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <UserPageContainer>
      <UserPageTitle>Аналітика портфоліо</UserPageTitle>
      <FiltersPanel {...{ startDate, endDate, setStartDate, setEndDate }} />
      <SummaryCard count={filterVisits.length} min={min} avg={avg} max={max} />
      <ChartGrid>
        <CalendarCard
          selectedDay={selectedDay}
          onSelect={setSelectedDay}
          visits={filterVisits}
        />
        <VisitsLineChart data={visitsByDateData} />
        <VisitsLineChartByMonth data={visitsByMonthData} />
        <DurationBarChart data={durationData} />
        <CountryPieChart data={countriesData} />
      </ChartGrid>
    </UserPageContainer>
  );
}
