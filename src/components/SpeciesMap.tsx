import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getText } from "./SEO";
import {
  MAP_CENTER,
  MAP_ZOOM,
  MAP_ZOOM_ZONE,
  getZone,
  mapSpecies,
  speciesCountInZone,
  statusColor,
  statusLabel,
  zones,
  zonesWithSpecies,
} from "../data/speciesMapData";
// Только типы: сам Leaflet грузится динамически внутри эффектов.
import type { Map as LeafletMap, Marker, PointTuple } from "leaflet";
import type { Localized, PinColor, SpeciesZone, Text, ZoneStatus } from "../types";

// Цвет точки в режиме «все виды»: чем больше видов отмечено в зоне, тем плотнее.
// Больше четырёх на глаз всё равно не различается, поэтому шкала обрывается.
const COUNT_COLORS: [PinColor, PinColor, PinColor, PinColor, PinColor] = [
  { dot: "#f4f0e8", ring: "#d6c9b2" },
  { dot: "#f7dedc", ring: "#eeb3af" },
  { dot: "#eeb3af", ring: "#dd726c" },
  { dot: "#dd726c", ring: "#bd241f" },
  { dot: "#bd241f", ring: "#8f1714" },
];

const ICON_SIZE: PointTuple = [120, 46];
const ICON_ANCHOR: PointTuple = [60, 34];

export default function SpeciesMap() {
  const { lang = "ru" } = useParams();
  const t = (value: Text) => getText(value, lang);

  const [mode, setMode] = useState("species");
  const [currentSlug, setCurrentSlug] = useState<string | null>(mapSpecies[0]?.slug || null);
  const [selectedZone, setSelectedZone] = useState("");

  const holderRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  // Клик живёт внутри Leaflet, поэтому свежий обработчик держим в ref: иначе
  // отметка навсегда запомнила бы функцию первого рендера.
  const selectRef = useRef<((code: string) => void) | null>(null);

  const current = useMemo(
    () => mapSpecies.find((item) => item.slug === currentSlug) || null,
    [currentSlug]
  );

  const counts = useMemo(() => {
    const result: Record<string, number> = {};
    zones.forEach((zone) => {
      result[zone.code] = speciesCountInZone(zone.code);
    });
    return result;
  }, []);

  const byRegion = mode === "species";

  selectRef.current = (code: string) => setSelectedZone((prev) => (prev === code ? "" : code));

  const zoneStatus = (code: string): ZoneStatus => current?.records?.[code] || "none";

  // counts заполнен для каждой зоны, а индекс обрезан до 4 - цвет есть всегда.
  const zoneColor = (code: string): PinColor =>
    byRegion ? statusColor[zoneStatus(code)] : COUNT_COLORS[Math.min(counts[code]!, 4)]!;

  const zoneCaption = (zone: SpeciesZone) =>
    byRegion
      ? t(statusLabel[zoneStatus(zone.code)])
      : `${counts[zone.code]} ${t({ ru: "видов", ro: "specii", en: "species" })}`;

  // Отметка = точка + подпись. Заливкой область не закрашиваем: точка честно
  // говорит «примерно здесь», а залитый круг притворялся бы границей ареала.
  const pinHtml = (zone: SpeciesZone) => {
    const color = zoneColor(zone.code);
    const muted = byRegion && zoneStatus(zone.code) === "none";
    return `<span class="zone-pin${muted ? " is-empty" : ""}">
        <span class="zone-pin__dot" style="background:${color.dot};border-color:${color.ring}"></span>
        <span class="zone-pin__name">${t(zone.name)}</span>
        <span class="zone-pin__status">${zoneCaption(zone)}</span>
      </span>`;
  };

  // Карта создаётся один раз: пересоздание означало бы перезапрос всех тайлов.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [leaflet] = await Promise.all([
        import("leaflet"),
        import("leaflet/dist/leaflet.css"),
      ]);
      const L = leaflet.default;
      if (cancelled || !holderRef.current || mapRef.current) return;

      const map = L.map(holderRef.current, {
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
        scrollWheelZoom: false, // чтобы страница не «залипала» при прокрутке
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      zones.forEach((zone) => {
        // Свой divIcon вместо стандартной картинки Leaflet: она ломается
        // в сборщиках и не умеет показывать подпись.
        markersRef.current[zone.code] = L.marker([zone.lat, zone.lon], {
          icon: L.divIcon({ className: "", html: pinHtml(zone), iconSize: ICON_SIZE, iconAnchor: ICON_ANCHOR }),
        })
          .addTo(map)
          .on("click", () => selectRef.current?.(zone.code));
      });
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Сменили вид, режим или язык - перерисовываем отметки, но не карту и тайлы.
  useEffect(() => {
    if (!mapRef.current) return;
    let cancelled = false;

    import("leaflet").then(({ default: L }) => {
      if (cancelled) return;
      zones.forEach((zone) => {
        markersRef.current[zone.code]?.setIcon(
          L.divIcon({ className: "", html: pinHtml(zone), iconSize: ICON_SIZE, iconAnchor: ICON_ANCHOR })
        );
      });
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlug, mode, lang, counts]);

  // Зону выбрали - на карте или чипсом, неважно: летим туда.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const zone = selectedZone ? getZone(selectedZone) : null;
    if (zone) map.flyTo([zone.lat, zone.lon], MAP_ZOOM_ZONE, { duration: 0.8 });
    else map.flyTo(MAP_CENTER, MAP_ZOOM, { duration: 0.6 });
  }, [selectedZone]);

  const found = current ? zonesWithSpecies(current) : [];
  const confirmed = current
    ? zones.filter((zone) => current.records?.[zone.code] === "confirmed")
    : [];

  const legendRows = byRegion
    ? (["confirmed", "reported", "absent", "none"] as const).map((key) => ({
        key,
        color: statusColor[key],
        label: statusLabel[key],
      }))
    : ([4, 3, 2, 1, 0] as const).map((count): { key: string; color: PinColor; label: Localized } => ({
        key: `count-${count}`,
        color: COUNT_COLORS[count],
        label:
          count === 0
            ? statusLabel.none
            : {
                ru: count === 4 ? "4 вида и больше" : `${count} вид${count === 1 ? "" : "а"}`,
                ro: count === 4 ? "4 specii și mai multe" : `${count} specii`,
                en: count === 4 ? "4 species and more" : `${count} species`,
              },
      }));

  return (
    <div className="species-map">
      <div className="species-map__controls">
        <div
          className="species-map__modes"
          role="group"
          aria-label={t({ ru: "Режим карты", ro: "Modul hărții", en: "Map mode" })}
        >
          <button
            type="button"
            className={`species-map__mode${byRegion ? " is-active" : ""}`}
            aria-pressed={byRegion}
            onClick={() => setMode("species")}
          >
            {t({ ru: "По виду", ro: "Pe specie", en: "By species" })}
          </button>
          <button
            type="button"
            className={`species-map__mode${byRegion ? "" : " is-active"}`}
            aria-pressed={!byRegion}
            onClick={() => setMode("all")}
          >
            {t({ ru: "Все виды", ro: "Toate speciile", en: "All species" })}
          </button>
        </div>

        {byRegion && (
          <div className="species-map__chips">
            {mapSpecies.map((species) => (
              <button
                key={species.slug}
                type="button"
                className={`species-map__chip${species.slug === currentSlug ? " is-active" : ""}${
                  species.sellSlug ? "" : " species-map__chip--wild"
                }`}
                aria-pressed={species.slug === currentSlug}
                onClick={() => setCurrentSlug(species.slug)}
              >
                {species.latin}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="species-map__body">
        <div className="species-map__canvas" ref={holderRef} />

        <aside className="species-map__side">
          <div>
            <h3 className="species-map__side-title">
              {t({ ru: "Легенда", ro: "Legendă", en: "Legend" })}
            </h3>
            <ul className="species-map__legend">
              {legendRows.map((row) => (
                <li key={row.key}>
                  <span
                    className="species-map__swatch"
                    style={{ background: row.color.dot, borderColor: row.color.ring }}
                    aria-hidden="true"
                  />
                  {t(row.label)}
                </li>
              ))}
            </ul>
          </div>

          {byRegion && current && (
            <div className="species-map__facts">
              <p className="species-map__latin">{current.latin}</p>
              <p className="species-map__common">{t(current.name)}</p>
              <p className="species-map__note">{t(current.note)}</p>
              {current.sellSlug ? (
                <Link className="btn" to={`/${lang}/ants/${current.sellSlug}`}>
                  {t({ ru: "Есть в магазине", ro: "Disponibil în magazin", en: "Available in the shop" })}
                </Link>
              ) : (
                <p className="species-map__wild">
                  {t({
                    ru: "Дикий вид, в продаже нет.",
                    ro: "Specie sălbatică, nu se vinde.",
                    en: "Wild species, not for sale.",
                  })}
                </p>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* Чипсы зон - вторая точка входа помимо самой карты: с клавиатуры и с
          телефона попасть в маленькую отметку тяжело, а в кнопку легко. */}
      <div className="species-map__zones">
        <button
          type="button"
          className={`species-map__zone${selectedZone ? "" : " is-active"}`}
          onClick={() => setSelectedZone("")}
        >
          {t({ ru: "Вся страна", ro: "Toată țara", en: "Whole country" })}
        </button>
        {zones.map((zone) => (
          <button
            key={zone.code}
            type="button"
            className={`species-map__zone${selectedZone === zone.code ? " is-active" : ""}`}
            onClick={() => setSelectedZone(selectedZone === zone.code ? "" : zone.code)}
            title={t(zone.anchor)}
          >
            {t(zone.name)}
            <span>{byRegion ? (current?.records?.[zone.code] ? "•" : "—") : counts[zone.code]}</span>
          </button>
        ))}
      </div>

      {/* Текстовая сводка: она же делает карту читаемой скринридером и
          поисковиком - отметки сами по себе не дают ни одного слова текста. */}
      {byRegion && current && (
        <div className="species-map__summary">
          {found.length > 0 ? (
            <p>
              <strong>{current.latin}</strong>{" "}
              {t({ ru: "отмечен в зонах:", ro: "este semnalat în zonele:", en: "is recorded in:" })}{" "}
              {found.map((zone) => t(zone.name)).join(", ")}.{" "}
              {confirmed.length > 0 &&
                t({
                  ru: `Из них подтверждено собственными сборами: ${confirmed.length}.`,
                  ro: `Dintre acestea, confirmate prin colectări proprii: ${confirmed.length}.`,
                  en: `Of these, confirmed by our own collecting: ${confirmed.length}.`,
                })}
            </p>
          ) : (
            <p>
              {t({
                ru: "По этому виду данные ещё собираются. Если вы находили его в Молдове - напишите нам в Telegram, отметим зону на карте.",
                ro: "Datele pentru această specie încă se adună. Dacă ați găsit-o în Moldova, scrieți-ne pe Telegram și marcăm zona pe hartă.",
                en: "Records for this species are still being collected. If you have found it in Moldova, message us on Telegram and we will mark the zone.",
              })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
