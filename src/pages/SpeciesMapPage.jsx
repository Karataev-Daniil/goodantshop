import { useOutletContext, useParams, Link } from "react-router-dom";
import SEO, { breadcrumbSchema, pageSeo, SITE_TELEGRAM } from "../components/SEO";
import SpeciesMap from "../components/SpeciesMap";
import { mapSpecies, zones, totalRecordedZones } from "../data/speciesMapData";

export default function SpeciesMapPage() {
  const { t } = useOutletContext();
  const { lang = "ru" } = useParams();

  const recorded = totalRecordedZones();
  const sold = mapSpecies.filter((species) => species.sellSlug);

  return (
    <>
      <SEO
        lang={lang}
        path="/species-map"
        title={pageSeo.speciesMap.title}
        description={pageSeo.speciesMap.description}
        jsonLd={[
          breadcrumbSchema(lang, [
            { name: { ru: "Главная", ro: "Acasă", en: "Home" }, path: "/" },
            {
              name: { ru: "Карта видов", ro: "Harta speciilor", en: "Species map" },
              path: "/species-map",
            },
          ]),
        ]}
      />

      <section className="section">
        <h1>
          {t({
            ru: "Карта муравьёв Молдовы",
            ro: "Harta furnicilor din Moldova",
            en: "Ant map of Moldova",
          })}
        </h1>

        <p className="catalog-intro">
          {t({
            ru: `Это открытый атлас муравьёв Молдовы по нашим собственным сборам: ${mapSpecies.length} видов и ${zones.length} зон - север, центр, Кишинёв, Приднестровье, Гагаузия и юг. Выберите вид, и карта покажет, где он зафиксирован, где известен по литературе, а где мы искали и не нашли. Всего для страны описано около 65 видов, так что список заведомо неполный: сюда вид попадает только тогда, когда находка есть на руках. Карта пополняется после каждой поездки.`,
            ro: `Acesta este un atlas deschis al furnicilor din Moldova, bazat pe colectările noastre: ${mapSpecies.length} specii și ${zones.length} zone - nord, centru, Chișinău, Transnistria, Găgăuzia și sud. Alegeți o specie, iar harta arată unde este confirmată, unde este cunoscută din literatură și unde am căutat fără rezultat. Pentru țară sunt descrise circa 65 de specii, deci lista este intenționat incompletă: o specie ajunge aici doar când avem observația în mână. Harta se completează după fiecare deplasare.`,
            en: `An open atlas of the ants of Moldova based on our own collecting: ${mapSpecies.length} species across ${zones.length} zones - north, centre, Chișinău, Transnistria, Gagauzia and south. Pick a species and the map shows where it is confirmed, where it is known from the literature, and where we looked and found nothing. Around 65 species are described for the country, so this list is deliberately incomplete: a species appears here only once we have the record in hand. The map grows after every trip.`,
          })}
        </p>

        <SpeciesMap />

        <div className="species-map__prose">
          <h2>
            {t({
              ru: "Как читать карту",
              ro: "Cum se citește harta",
              en: "How to read the map",
            })}
          </h2>
          <p>
            {t({
              ru: "В одной зоне живёт не один вид, а десяток, поэтому закрасить её «своим муравьём» невозможно. Карта работает наоборот: вы выбираете вид, а зоны отвечают статусом. Режим «все виды» показывает другое - насколько плотно зона вообще обследована: чем насыщеннее заливка, тем больше видов там отмечено. Круг показывает охват, а не границу: находка привязана к местности, а не к административной черте.",
              ro: "Într-o zonă trăiește nu o singură specie, ci zeci, deci nu se poate colora cu «furnica ei». Harta funcționează invers: alegeți specia, iar zonele răspund cu un statut. Modul «toate speciile» arată altceva - cât de bine este cercetată zona: cu cât culoarea este mai intensă, cu atât mai multe specii sunt notate acolo. Cercul arată acoperirea, nu granița.",
              en: "One zone holds not a single species but dozens, so colouring it by «its ant» is impossible. The map works the other way round: you pick the species and the zones answer with a status. The «all species» mode shows something different - how well a zone has been surveyed: the denser the fill, the more species recorded there. The circle shows coverage, not a boundary.",
            })}
          </p>
          <p>
            {t({
              ru: "«Искали, не нашли» - это тоже данные, и мы отмечаем их отдельно от пустых зон. Пустая зона значит, что туда просто ещё не доехали.",
              ro: "«Căutat, negăsit» este tot un rezultat și îl marcăm separat de zonele goale. O zonă goală înseamnă doar că încă nu am ajuns acolo.",
              en: "«Searched, not found» is data too, and we mark it separately from empty zones. An empty zone simply means we have not been there yet.",
            })}
          </p>

          <h2>
            {t({
              ru: "Как помочь",
              ro: "Cum puteți ajuta",
              en: "How to help",
            })}
          </h2>
          <p>
            {t({
              ru: "Если вы находили муравьёв в своём районе и сфотографировали их - напишите нам в Telegram. Нужны фото, место и дата. Определим вид и добавим точку на карту, а вас укажем в источниках.",
              ro: "Dacă ați găsit furnici în raionul dumneavoastră și le-ați fotografiat, scrieți-ne pe Telegram. Avem nevoie de fotografii, loc și dată. Determinăm specia, adăugăm punctul pe hartă și vă trecem la surse.",
              en: "If you have found ants in your district and photographed them, message us on Telegram. We need photos, place and date. We will identify the species, add the point to the map and credit you as the source.",
            })}
          </p>
          <p>
            <a className="btn" href={SITE_TELEGRAM} target="_blank" rel="noreferrer">
              {t({ ru: "Прислать находку", ro: "Trimite o observație", en: "Send a record" })}
            </a>
          </p>

          <h2>
            {t({
              ru: "Виды с карты, которые есть в продаже",
              ro: "Speciile de pe hartă disponibile în magazin",
              en: "Species from the map available to buy",
            })}
          </h2>
          <p>
            {t({
              ru: "Мы продаём только те местные виды, которых умеем стабильно содержать и которые переносят пересылку. Остальные на карте - дикие, и разорять их гнёзда ради продажи мы не будем.",
              ro: "Vindem doar acele specii locale pe care le putem crește constant și care suportă transportul. Restul de pe hartă sunt sălbatice, iar cuiburile lor nu le distrugem pentru vânzare.",
              en: "We only sell local species we can keep reliably and that survive shipping. The rest on the map are wild, and we will not dig up their nests to sell them.",
            })}
          </p>
          <ul className="species-map__sold">
            {sold.map((species) => (
              <li key={species.slug}>
                <Link to={`/${lang}/ants/${species.sellSlug}`}>
                  <em>{species.latin}</em> — {t(species.name)}
                </Link>
              </li>
            ))}
          </ul>

          {recorded === 0 && (
            <p className="species-map__disclaimer">
              {t({
                ru: "Карта только запущена: находки вносятся по мере обработки сборов, поэтому зоны пока пустые. Сами виды и зоны в списке уже настоящие.",
                ro: "Harta abia a fost lansată: observațiile se introduc pe măsură ce prelucrăm colectările, de aceea zonele sunt încă goale. Speciile și zonele din listă sunt însă reale.",
                en: "The map has only just launched: records are added as we work through our collections, so the zones are still empty. The species and zones listed are already real.",
              })}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
