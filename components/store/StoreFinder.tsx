import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { fetchNearbyStores, type NearbyStore } from "../../lib/storeApi";
import { rise } from "../../lib/motion";
import { StoreShell } from "./StoreShell";

const TYPE_LABEL = { RESTAURANT: "음식점", WINE_SHOP: "와인샵", OTHER: "" } as const;

/**
 * /s — QR 없이 들어온 손님. 위치를 받아 근처 매장을 보여주고, 거절하면 전체 목록.
 * QR로 들어온 손님은 /s/{slug}로 바로 가므로 이 화면을 보지 않는다.
 */
export function StoreFinder() {
  const [stores, setStores] = useState<NearbyStore[] | null>(null);
  const [located, setLocated] = useState<boolean | null>(null); // null = 위치 확인 중
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadAll = async () => {
      try {
        const list = await fetchNearbyStores();
        if (!cancelled) {
          setStores(list);
          setLocated(false);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    };
    const loadNear = async (lat: number, lng: number) => {
      try {
        let list = await fetchNearbyStores(lat, lng, 3);
        if (list.length === 0) list = await fetchNearbyStores(lat, lng, 20);
        if (list.length === 0) return loadAll();
        if (!cancelled) {
          setStores(list);
          setLocated(true);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    };
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      loadAll();
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => loadNear(pos.coords.latitude, pos.coords.longitude),
        () => loadAll(),
        { timeout: 8000, maximumAge: 60000 },
      );
    }
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <StoreShell>
      <motion.div {...rise()}>
        <h1 className="text-[1.75rem] font-bold leading-[1.2] tracking-[-0.03em] text-ink">
          {located ? "근처에 이런 곳이 있어요" : located === false ? "어디에 계세요?" : "근처 매장을 찾는 중"}
        </h1>
        <p className="mt-2 text-ink-soft">
          {located === null ? "위치를 허용하면 가까운 순으로 보여드려요." : "매장을 고르면 그 집 와인 중에서 골라드려요."}
        </p>
      </motion.div>

      {error ? (
        <p className="mt-10 text-ink-muted">매장 목록을 불러오지 못했어요. 잠시 후 다시 열어주세요.</p>
      ) : stores === null ? (
        <ul className="mt-8 space-y-3" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <li key={i} className="h-20 animate-pulse rounded-2xl bg-paper-deep" />
          ))}
        </ul>
      ) : stores.length === 0 ? (
        <p className="mt-10 text-ink-muted">아직 도입한 매장이 없어요. 테이블의 QR을 찍어주세요.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {stores.map((s, i) => (
            <motion.li key={s.slug} {...rise(0.05 * i)}>
              <Link to={`/s/${s.slug}`} className="block rounded-2xl bg-white/70 px-5 py-4 transition-colors hover:bg-white">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-ink">{s.name}</span>
                  {TYPE_LABEL[s.type] && <span className="text-xs text-ink-muted">{TYPE_LABEL[s.type]}</span>}
                  {s.distanceKm != null && (
                    <span className="ml-auto text-sm text-ink-muted">
                      {s.distanceKm < 1 ? `${Math.round(s.distanceKm * 1000)}m` : `${s.distanceKm.toFixed(1)}km`}
                    </span>
                  )}
                </div>
                {s.address && <p className="mt-1 truncate text-sm text-ink-muted">{s.address}</p>}
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </StoreShell>
  );
}
