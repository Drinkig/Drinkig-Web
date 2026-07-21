import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  fetchDownloads,
  fetchFunnel,
  fetchOverview,
  fetchTimeseries,
  refreshDownloads,
  type DownloadStats,
  type Funnel,
  type StatsOverview,
  type Timeseries,
} from "../../lib/adminApi";
import { BarChart, ChartCard, FunnelChart, LineChart, SERIES, StatTile } from "./charts";
import { ErrorState, FilterChips, LoadingState, PageHeader } from "./shared";

type RangeDays = 7 | 30 | 90;

function rangeFrom(days: RangeDays): string {
  const d = new Date();
  d.setDate(d.getDate() - (days - 1));
  return d.toISOString().slice(0, 10);
}

export function AdminDashboard() {
  const [overview, setOverview] = useState<StatsOverview | null>(null);
  const [timeseries, setTimeseries] = useState<Timeseries | null>(null);
  const [funnel, setFunnel] = useState<Funnel | null>(null);
  const [downloads, setDownloads] = useState<DownloadStats | null>(null);
  const [range, setRange] = useState<RangeDays>(30);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (days: RangeDays) => {
    setError(null);
    try {
      const from = rangeFrom(days);
      const [ov, ts, fn, dl] = await Promise.all([
        fetchOverview(),
        fetchTimeseries(from),
        fetchFunnel(),
        fetchDownloads(from),
      ]);
      setOverview(ov);
      setTimeseries(ts);
      setFunnel(fn);
      setDownloads(dl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "지표를 불러오지 못했습니다.");
    }
  }, []);

  useEffect(() => {
    load(range);
  }, [load, range]);

  const handleRefreshDownloads = async () => {
    setRefreshing(true);
    try {
      await refreshDownloads();
      setDownloads(await fetchDownloads(rangeFrom(range)));
    } catch {
      // 수집 실패는 치명적이지 않음 — 기존 데이터 유지
    } finally {
      setRefreshing(false);
    }
  };

  if (error) {
    return (
      <>
        <PageHeader title="대시보드" />
        <ErrorState message={error} onRetry={() => load(range)} />
      </>
    );
  }

  if (!overview || !timeseries || !funnel) {
    return (
      <>
        <PageHeader title="대시보드" />
        <LoadingState />
      </>
    );
  }

  const days = timeseries.days;

  return (
    <>
      <PageHeader title="대시보드" description="시드 계정을 제외한 실사용자 기준 지표입니다." />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatTile
          label="전체 회원"
          value={overview.totalMembers.toLocaleString()}
          sub={`+${overview.newMembers7d} (7일) · +${overview.newMembers30d} (30일)`}
        />
        <StatTile label="유료 구독" value={overview.activePremium.toLocaleString()} sub="현재 활성" />
        <StatTile label="누적 스캔" value={overview.totalScans.toLocaleString()} />
        <StatTile label="누적 노트" value={overview.totalTastingNotes.toLocaleString()} />
        <StatTile label="등록 요청 대기" value={overview.pendingWineRequests.toLocaleString()} />
        <StatTile label="신고 대기" value={overview.pendingReports.toLocaleString()} />
      </div>

      <div className="mt-6 flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-zinc-300">일별 추이</h3>
        <FilterChips
          options={[
            { value: "7", label: "7일" },
            { value: "30", label: "30일" },
            { value: "90", label: "90일" },
          ]}
          value={String(range) as "7" | "30" | "90"}
          onChange={(v) => setRange(Number(v || 30) as RangeDays)}
        />
      </div>

      <div className="mt-3 grid md:grid-cols-2 gap-3">
        <ChartCard title="신규 가입">
          <LineChart data={days.map((d) => ({ date: d.date, value: d.signups }))} color={SERIES.blue} />
        </ChartCard>
        <ChartCard title="스캔 수">
          <LineChart data={days.map((d) => ({ date: d.date, value: d.scans }))} color={SERIES.aqua} />
        </ChartCard>
        <ChartCard title="노트 작성">
          <LineChart data={days.map((d) => ({ date: d.date, value: d.tastingNotes }))} color={SERIES.violet} />
        </ChartCard>
        <ChartCard title="유료 전환">
          <LineChart
            data={days.map((d) => ({ date: d.date, value: d.paidSubscriptions }))}
            color={SERIES.yellow}
          />
        </ChartCard>
      </div>

      <div className="mt-3 grid md:grid-cols-2 gap-3">
        <ChartCard
          title="앱 다운로드 (App Store)"
          action={
            downloads?.configured ? (
              <Button variant="ghost" size="sm" disabled={refreshing} onClick={handleRefreshDownloads}>
                {refreshing ? "수집 중..." : "지금 수집"}
              </Button>
            ) : undefined
          }
        >
          {downloads?.configured ? (
            <BarChart data={downloads.days.map((d) => ({ date: d.date, value: d.units }))} color={SERIES.blue} />
          ) : (
            <div className="py-8 text-center text-sm text-zinc-500 space-y-1">
              <p>App Store Connect API 키가 아직 설정되지 않았습니다.</p>
              <p className="text-xs">
                서버에 ASC_KEY_ID / ASC_ISSUER_ID / ASC_PRIVATE_KEY_PATH / ASC_VENDOR_NUMBER 환경변수를
                설정하면 자동 수집됩니다.
              </p>
            </div>
          )}
        </ChartCard>

        <ChartCard title="퍼널 (누적)">
          <FunnelChart
            stages={[
              { label: "가입", value: funnel.signups },
              { label: "온보딩 완료", value: funnel.onboarded },
              { label: "스캔 경험", value: funnel.scanned },
              { label: "노트 작성", value: funnel.noted },
              { label: "유료 구독", value: funnel.premium },
            ]}
          />
          <p className="mt-3 text-xs text-zinc-500">괄호 안은 직전 단계 대비 전환율</p>
        </ChartCard>
      </div>
    </>
  );
}
