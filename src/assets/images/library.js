// ============================================================================
// Центральная библиотека фотографий сайта.
// Все переиспользуемые снимки собраны здесь: компоненты и данные импортируют
// картинки ОТСЮДА, а не по прямому пути к файлу. Если файл переместили,
// переименовали или заменили - правка нужна только в этом файле.
//
// Физически файлы пока лежат в ./blog/. Когда будете готовы, папку можно
// переименовать в ./library/ - тогда поменяются только пути ниже, а все места
// использования останутся нетронутыми.
// ============================================================================
import antColonyNestEntrance from "./blog/ant-colony-nest-entrance-ground.webp";
import antEmergingFromHole from "./blog/ant-emerging-from-nest-hole.webp";
import antHeadMandibles from "./blog/ant-head-mandibles-front-macro.webp";
import antsTrail from "./blog/ants-trail-on-ground.webp";
import antsFeedingOnFly from "./blog/ants-feeding-on-fly-leaf.webp";
import antTendingAphids from "./blog/ant-tending-aphids-branch.webp";
import wingedQueenOnWood from "./blog/winged-queen-ant-on-wood.webp";
import redAntsDrinkingWater from "./blog/red-ants-drinking-water-drop.webp";
import woodAntsCarryingBeetle from "./blog/wood-ants-carrying-beetle-log.webp";

// Снимки конкретно Messor structor (лежат рядом с фото товаров в ./ants/) -
// переиспользуются и в каталоге, и в блоге, поэтому собраны здесь же.
import messorStructor from "./ants/messor-structor.webp";
import messorForagingSeeds from "./ants/messor-foraging-seeds.webp";
import messorWorkersCloseup from "./ants/messor-workers-closeup.webp";
import messorWorkerOnWood from "./ants/messor-worker-on-wood.webp";
import messorWorker from "./ants/messor-worker.webp";
import messorSoldier from "./ants/messor-soldier.webp";

export {
  antColonyNestEntrance,
  antEmergingFromHole,
  antHeadMandibles,
  antsTrail,
  antsFeedingOnFly,
  antTendingAphids,
  wingedQueenOnWood,
  redAntsDrinkingWater,
  woodAntsCarryingBeetle,
  messorStructor,
  messorForagingSeeds,
  messorWorkersCloseup,
  messorWorkerOnWood,
  messorWorker,
  messorSoldier,
};
