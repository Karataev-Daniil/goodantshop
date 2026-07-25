// Пост блога №2 - вид Messor structor для тех, кто впервые о них слышит.
// Заполнены ru / ro / en.
import {
  messorStructor as imgMessor,
  messorForagingSeeds as imgMessorSeeds,
  messorWorkersCloseup as imgMessorWorkers,
  messorWorkerOnWood as imgMessorWorker,
  messorWorker as imgWorker,
  messorSoldier as imgSoldier,
  antHeadMandibles as imgMandibles,
} from "../../assets/images/library";

// Локальный ролик лежит в public/videos (ссылаемся абсолютным путём от корня).
const clipNestTopdown = "/videos/messor-nest-entrance-topdown.mp4";

export default {
  id: 402,
  slug: "messor-structor",
  category: "species",

  title: {
    ru: "Мессор структор - трудолюбивые муравьи, которые пекут хлеб и с умом ведут хозяйство",
    ro: "Messor structor - furnici harnice care coc pâine și țin gospodăria cu cap",
    en: "Messor structor - hardworking ants that bake bread and run a household wisely",
  },
  excerpt: {
    ru: "Мессоры ведут себя как настоящая маленькая ферма, и наблюдать за этим можно прямо дома. Рассказываем, как устроена их жизнь и чем этот вид так интересен, даже если раньше вы о муравьях не задумывались.",
    ro: "Furnicile Messor se poartă ca o adevărată fermă în miniatură, iar totul poate fi urmărit chiar la tine acasă. Îți povestim cum e rânduită viața lor și prin ce e atât de interesantă această specie, chiar dacă până acum nu te-ai gândit la furnici.",
    en: "Messor ants behave like a real little farm, and you can watch it all right at home. We explain how their life is arranged and why this species is so interesting, even if you've never given ants a thought before.",
  },
  seoTitle: {
    ru: "Мессор структор - умные муравьи, которые пекут свой хлеб | GoodAntShop",
    ro: "Messor structor - furnici istețe care își coc pâinea | GoodAntShop",
    en: "Messor structor - clever ants that bake their own bread | GoodAntShop",
  },
  seoDescription: {
    ru: "Messor structor - умные и трудолюбивые муравьи-жнецы. Как они пекут «муравьиный хлеб», с умом делят сухие амбары и влажные камеры и почему это лучший вид для новичка.",
    ro: "Messor structor - furnici-secerătoare, istețe și harnice. Cum coc «pâinea furnicilor», cum împart cu cap hambarele uscate și camerele umede și de ce sunt cea mai bună specie pentru începători.",
    en: "Messor structor - clever, hardworking harvester ants. How they bake «ant bread», wisely split dry granaries and damp chambers and why they're the best species for a beginner.",
  },

  cover: {
    src: imgMessorWorker,
    alt: {
      ru: "Рабочий муравей мессор структор крупным планом на древесине",
      ro: "Furnică lucrătoare Messor structor în prim-plan, pe lemn",
      en: "A Messor structor worker ant close-up on wood",
    },
    width: 1200,
    height: 630,
  },

  datePublished: "2026-07-25",
  dateModified: "2026-07-25",
  author: { name: "GoodAntShop", url: "/about" },
  readingTime: 7,

  content: [
    {
      type: "lead",
      text: {
        ru: "Загляните в гнездо мессоров - и увидите кладовые, доверху набитые зерном. Эти муравьи живут урожаем. Одни весь день собирают семена в поле, другие хозяйничают дома, и у каждого своё дело. Вместе выходит слаженное подземное хозяйство размером с ладонь, и живёт оно не в тропиках, а прямо в наших степях.",
        ro: "Aruncă o privire în cuibul furnicilor Messor - și vei vedea cămări pline ochi cu boabe. Aceste furnici trăiesc din recoltă. Unele adună toată ziua semințe pe câmp, altele se ocupă de treburile casei, și fiecare are rostul lui. Împreună iese o gospodărie subterană bine pusă la punct, cât o palmă, și trăiește nu la tropice, ci chiar în stepele noastre.",
        en: "Take a look inside a Messor nest - and you'll see storerooms filled to the brim with grain. These ants live off the harvest. Some spend all day gathering seeds in the field, others keep house at home, and each has its own job. Together it makes a well-run underground household the size of your palm, and it lives not in the tropics but right here in our steppes.",
      },
    },
    {
      type: "heading",
      level: 2,
      text: {
        ru: "Кто такие мессоры",
        ro: "Cine sunt furnicile Messor",
        en: "Who the Messor ants are",
      },
    },
    {
      type: "paragraph",
      text: {
        ru: "Мессор структор, он же Messor structor, - степной муравей-жнец. Его родина - сухие луга и степи юга и центра Европы, встречается он и в Молдове. Муравей некрупный, спокойный, с понятным укладом жизни. А почему его зовут жнецом - станет ясно, стоит только посмотреть, чем он кормит семью.",
        ro: "Messor structor, furnica-secerătoare de stepă, își are patria în pajiștile uscate și stepele din sudul și centrul Europei, iar în Moldova se întâlnește și ea. E o furnică măruntă, liniștită, cu un mod de viață lesne de înțeles. Iar de ce i se spune secerătoare - va deveni limpede de îndată ce vezi cu ce își hrănește familia.",
        en: "Messor structor, the steppe harvester ant, has its home in the dry meadows and steppes of southern and central Europe, and it's found in Moldova too. It's a small, calm ant with a way of life that's easy to follow. And why it's called a harvester becomes clear the moment you see what it feeds its family.",
      },
    },
    {
      type: "heading",
      level: 2,
      text: {
        ru: "Жнецы, а не охотники",
        ro: "Secerătoare, nu vânătoare",
        en: "Harvesters, not hunters",
      },
    },
    {
      type: "paragraph",
      text: {
        ru: "Обычному муравью, чтобы накормить семью, надо кого-то поймать. Мессор живёт иначе. Он находит созревшее семя и несёт его домой, и по одной тропе за день в гнездо попадают тысячи зёрен. Одно такое семя бывает в несколько раз тяжелее самого рабочего, но муравья это не смущает. От белка мессоры тоже не отказываются - подберут и мёртвое насекомое, - но специально гоняться за живой добычей не станут. Этим они и похожи на крестьян - вся жизнь строится вокруг сбора, а не охоты.",
        ro: "O furnică obișnuită, ca să-și hrănească familia, trebuie să prindă pe cineva. Messor trăiește altfel. Găsește o sămânță coaptă și o duce acasă, iar pe o singură cărare, într-o zi, ajung în cuib mii de boabe. O astfel de sămânță e uneori de câteva ori mai grea decât lucrătoarea însăși, dar pe furnică asta n-o încurcă. Nici de proteine nu se feresc - ridică și câte o insectă moartă - dar nu se apucă anume să vâneze pradă vie. Prin asta seamănă cu țăranii - toată viața se învârte în jurul strânsului, nu al vânătorii.",
        en: "An ordinary ant has to catch something to feed its family. Messor lives differently. It finds a ripe seed and carries it home, and along a single trail thousands of grains reach the nest in a day. One such seed can be several times heavier than the worker itself, but that doesn't bother the ant. Messor ants don't turn down protein either - they'll pick up a dead insect - but they won't go out of their way to chase live prey. That's what makes them like peasants - their whole life revolves around gathering, not hunting.",
      },
    },
    {
      type: "clip",
      src: clipNestTopdown,
      alt: {
        ru: "Вид сверху на вход в муравейник мессоров, муравьи носят семена и соринки",
        ro: "Vedere de sus a intrării în furnicarul Messor, furnicile cară semințe și fire mărunte",
        en: "Top-down view of the Messor nest entrance, ants carrying seeds and bits of debris",
      },
      caption: {
        ru: "Вид сверху на вход в муравейник. Каждый занят делом - кто-то тащит семя в амбар, кто-то несёт соринку, чтобы укрепить гнездо.",
        ro: "Vedere de sus a intrării în furnicar. Fiecare e prins cu treaba - unul târăște o sămânță spre hambar, altul duce un fir ca să întărească cuibul.",
        en: "Top-down view of the nest entrance. Everyone's busy - one drags a seed to the granary, another carries a bit of debris to reinforce the nest.",
      },
    },
    {
      type: "heading",
      level: 2,
      text: {
        ru: "Как из зерна получается «муравьиный хлеб»",
        ro: "Cum se face din boabe «pâinea furnicilor»",
        en: "How grain becomes «ant bread»",
      },
    },
    {
      type: "paragraph",
      text: {
        ru: "Принести зерно мало, его ещё надо переработать. Сначала рабочие очищают семена от шелухи и уносят в кладовые. Когда приходит время кормить личинок, самые крупные муравьи дробят зёрна мощными челюстями и разжёвывают их во влажную питательную массу. Её так и называют - «муравьиный хлеб».",
        ro: "Nu e de ajuns să aduci bobul, el trebuie și prelucrat. Întâi lucrătoarele curăță semințele de pleavă și le duc în cămări. Când vine vremea să hrănească larvele, cele mai mari furnici sfărâmă boabele cu fălcile puternice și le mestecă într-o pastă umedă și hrănitoare. Așa i se și spune - «pâinea furnicilor».",
        en: "Bringing in the grain isn't enough - it still has to be processed. First the workers clean the husks off the seeds and carry them to the storerooms. When it's time to feed the larvae, the largest ants crush the grains with their powerful jaws and chew them into a moist, nourishing paste. That's exactly what it's called - «ant bread».",
      },
    },
    {
      type: "image",
      src: imgMandibles,
      alt: {
        ru: "Голова муравья-жнеца с мощными челюстями крупным планом",
        ro: "Capul unei furnici-secerătoare cu fălci puternice, în prim-plan",
        en: "Close-up of a harvester ant's head with powerful jaws",
      },
      caption: {
        ru: "Челюсти крупного мессора работают как жернова. Ими он дробит самое твёрдое зерно - то, с которым мелкому рабочему справиться труднее.",
        ro: "Fălcile unei furnici Messor mari lucrează ca niște pietre de moară. Cu ele sfărâmă cel mai tare bob - cel cu care unei lucrătoare mărunte îi vine mai greu.",
        en: "A large Messor's jaws work like millstones. With them it crushes the hardest grain - the kind a small worker has a tougher time with.",
      },
    },
    {
      type: "heading",
      level: 2,
      text: {
        ru: "Разнорабочие и силачи",
        ro: "Bune la toate și voinice",
        en: "All-rounders and strongmen",
      },
    },
    {
      type: "paragraph",
      text: {
        ru: "Как на крестьянском дворе, где кто-то в поле, кто-то у печи, а самую тяжёлую работу тянут самые сильные, у мессоров тоже нет узких профессий. Большинство - обычные рабочие, мастера на все руки. Они и семена собирают, и за расплодом ходят, и порядок в доме наводят. Часть муравьёв рождается крупнее, с большой головой и мощными челюстями - их называют солдатами. Именно они чаще всего дробят самое твёрдое зерно, хотя при случае справится и обычный рабочий. Размер задан от рождения и с годами не меняется. А над всем хозяйством - матка. Она не командует и не работает в поле, её дело - откладывать яйца, из которых выходят новые рабочие и солдаты.",
        ro: "Ca într-o gospodărie țărănească, unde unul e la câmp, altul la cuptor, iar munca cea mai grea o duc cei mai puternici, nici la furnicile Messor nu există meserii înguste. Cele mai multe sunt lucrătoare obișnuite, bune la toate. Și semințe adună, și de puiet au grijă, și fac ordine în casă. O parte dintre furnici se nasc mai mari, cu cap mare și fălci puternice - li se spune soldați. Tocmai ei sfărâmă cel mai des bobul cel mai tare, deși la nevoie se descurcă și o lucrătoare obișnuită. Mărimea e dată de la naștere și nu se schimbă cu anii. Iar deasupra întregii gospodării e regina. Ea nu poruncește și nu muncește la câmp, treaba ei e să depună ouă, din care ies noi lucrătoare și soldați.",
        en: "Just like on a peasant farmstead, where one is in the field, another at the oven, and the heaviest work falls to the strongest, Messor ants have no narrow trades either. Most are ordinary workers, good at everything. They gather seeds, tend the brood and keep the house in order. Some ants are born larger, with a big head and powerful jaws - these are called soldiers. It's they who most often crush the hardest grain, though at a pinch an ordinary worker manages too. Size is set from birth and doesn't change over the years. And above the whole household is the queen. She neither commands nor works the field - her job is to lay eggs, from which new workers and soldiers hatch.",
      },
    },
    {
      type: "row",
      images: [
        {
          src: imgWorker,
          alt: {
            ru: "Рабочий муравей мессор структор крупным планом",
            ro: "Furnică lucrătoare Messor structor în prim-plan",
            en: "A Messor structor worker ant close-up",
          },
          caption: {
            ru: "Рабочий. Голова обычная - такой муравей на все руки.",
            ro: "Lucrătoarea. Cap obișnuit - o furnică bună la toate.",
            en: "A worker. An ordinary head - an ant that turns its hand to anything.",
          },
        },
        {
          src: imgSoldier,
          alt: {
            ru: "Солдат мессор структор с крупной головой крупным планом",
            ro: "Soldat Messor structor cu cap mare, în prim-plan",
            en: "A Messor structor soldier with a large head, close-up",
          },
          caption: {
            ru: "Солдат. Голова заметно крупнее, а челюсти сильнее - ими он и мелет зерно.",
            ro: "Soldatul. Capul e vădit mai mare, iar fălcile mai puternice - cu ele și macină bobul.",
            en: "A soldier. The head is noticeably bigger and the jaws stronger - it's with them that it grinds the grain.",
          },
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      text: {
        ru: "Порядок в подземном доме",
        ro: "Rânduială în casa subterană",
        en: "Order in the underground home",
      },
    },
    {
      type: "paragraph",
      text: {
        ru: "Гнездо мессоров - не случайная россыпь ходов, а продуманное хозяйство. Сухие камеры они отводят под амбары, где зерно не плесневеет и лежит месяцами. Матку и расплод держат в камерах поглубже и повлажнее - личинкам нужна сырость, чтобы расти. А если где-то станет слишком сыро или, наоборот, сухо, муравьи попросту перенесут и зерно, и потомство в более подходящее место. Это уже не слепой инстинкт, а настоящее управление домом.",
        ro: "Cuibul furnicilor Messor nu e o împrăștiere întâmplătoare de galerii, ci o gospodărie chibzuită. Camerele uscate le țin drept hambare, unde bobul nu mucegăiește și stă luni întregi. Regina și puietul le păstrează în camere mai adânci și mai umede - larvele au nevoie de umezeală ca să crească. Iar dacă undeva devine prea umed sau, dimpotrivă, prea uscat, furnicile pur și simplu mută și boabele, și puietul într-un loc mai potrivit. Asta nu mai e instinct orb, ci o adevărată administrare a casei.",
        en: "A Messor nest isn't a random scatter of tunnels but a thought-out household. They set aside the dry chambers as granaries, where the grain doesn't go mouldy and keeps for months. The queen and the brood they keep in deeper, damper chambers - the larvae need moisture to grow. And if somewhere gets too damp or, the other way, too dry, the ants simply move both the grain and the offspring to a more suitable spot. This is no longer blind instinct but real household management.",
      },
    },
    {
      type: "image",
      src: imgMessorSeeds,
      alt: {
        ru: "Муравей мессор структор несёт семя",
        ro: "Furnică Messor structor cărând o sămânță",
        en: "A Messor structor ant carrying a seed",
      },
      caption: {
        ru: "Вот и вся «охота» мессора - найти созревшее семя и утащить его в амбар.",
        ro: "Iată toată «vânătoarea» unei furnici Messor - să găsească o sămânță coaptă și s-o care în hambar.",
        en: "That's the whole of a Messor's «hunt» - to find a ripe seed and haul it off to the granary.",
      },
    },
    {
      type: "callout",
      variant: "note",
      title: {
        ru: "Знаете ли вы?",
        ro: "Știați că?",
        en: "Did you know?",
      },
      text: {
        ru: "Мессоры следят за амбаром не хуже настоящего фермера. Если зерно отсыреет и начнёт прорастать, муравьи выносят пророщенные семена наружу или отгрызают росток, иначе запас пропадёт. А выброшенные зёрна нередко всходят рядом с гнездом, и муравьи, сами того не желая, засевают степь.",
        ro: "Furnicile Messor păzesc hambarul nu mai prost decât un fermier adevărat. Dacă bobul se umezește și începe să încolțească, furnicile scot semințele încolțite afară sau rod colțul, altfel rezerva se pierde. Iar boabele aruncate răsar adesea lângă cuib, și furnicile, fără să vrea, însămânțează stepa.",
        en: "Messor ants watch over their granary no worse than a real farmer. If grain gets damp and starts to sprout, the ants carry the sprouted seeds outside or bite off the shoot, or the store would be lost. And the discarded grains often come up right next to the nest, so the ants, without meaning to, sow the steppe.",
      },
    },
    {
      type: "heading",
      level: 2,
      text: {
        ru: "Но фермеры ли они на самом деле?",
        ro: "Dar sunt oare cu adevărat fermieri?",
        en: "But are they really farmers?",
      },
    },
    {
      type: "paragraph",
      text: {
        ru: "Строго говоря, мессоры не земледельцы. Они не сеют и не выращивают растения нарочно - настоящие «аграрии» среди муравьёв это тропические листорезы, которые разводят под землёй грибные грядки. Мессоры лишь собирают то, что выросло само. Но по повадкам - сбор урожая, обмолот, хранение в амбарах и выпечка «хлеба» - они ближе к крестьянину, чем почти любое другое насекомое.",
        ro: "La drept vorbind, furnicile Messor nu sunt agricultori. Ele nu seamănă și nu cresc plante dinadins - adevărații «agrari» printre furnici sunt furnicile tropicale tăietoare de frunze, care cultivă sub pământ straturi de ciuperci. Messor doar adună ce a crescut de la sine. Dar prin apucături - strânsul recoltei, treieratul, păstrarea în hambare și coptul «pâinii» - sunt mai aproape de țăran decât aproape orice altă insectă.",
        en: "Strictly speaking, Messor ants aren't farmers. They don't sow or grow plants on purpose - the real «agriculturalists» among ants are the tropical leaf-cutters, who tend fungus gardens underground. Messor ants only gather what has grown on its own. But by their habits - reaping the harvest, threshing, storing in granaries and baking «bread» - they're closer to a peasant than almost any other insect.",
      },
    },
    {
      type: "heading",
      level: 2,
      text: {
        ru: "Тихая жизнь по режиму",
        ro: "O viață liniștită, cu program",
        en: "A quiet life on a schedule",
      },
    },
    {
      type: "paragraph",
      text: {
        ru: "Мессоры не суетливы и не агрессивны. Они не жалят - могут разве что легонько цапнуть челюстями, если очень настойчиво их тревожить, и то почти без ощущений. А ещё колонии обязательно нужен отдых. Зимой мессоры впадают в покой на пару месяцев, и без такой зимовки матка живёт меньше, а семья растёт хуже.",
        ro: "Furnicile Messor nu sunt agitate și nici agresive. Ele nu înțeapă - cel mult te pot ciupi ușor cu fălcile, dacă le tot deranjezi cu îndârjire, și chiar și atunci aproape că nu simți. Iar coloniei îi trebuie neapărat odihnă. Iarna, furnicile Messor intră în repaus vreo două luni, și fără o astfel de iernare regina trăiește mai puțin, iar familia crește mai prost.",
        en: "Messor ants are neither fussy nor aggressive. They don't sting - at most they might give a light nip with their jaws if you keep pestering them, and even then you barely feel it. And the colony absolutely needs its rest. In winter Messor ants go dormant for a couple of months, and without such a winter rest the queen lives less and the family grows worse.",
      },
    },
    {
      type: "image",
      src: imgMessorWorkers,
      alt: {
        ru: "Рабочие муравьи-жнецы разного размера крупным планом",
        ro: "Furnici-secerătoare lucrătoare de diferite mărimi, în prim-plan",
        en: "Harvester worker ants of different sizes, close-up",
      },
      caption: {
        ru: "Наблюдать за такой семьёй можно часами - на арене всегда что-то происходит.",
        ro: "O astfel de familie poți s-o urmărești ore în șir - în arenă mereu se întâmplă ceva.",
        en: "You can watch a family like this for hours - there's always something going on in the arena.",
      },
    },
    {
      type: "quote",
      text: {
        ru: "Мессоры не гонятся за добычей и не воюют без нужды. Их сила в другом - в терпеливом труде, запасах и умении пережить и зной, и зиму.",
        ro: "Furnicile Messor nu aleargă după pradă și nu se războiesc fără rost. Puterea lor e în altceva - în munca răbdătoare, în rezerve și în priceperea de a răzbi și arșița, și iarna.",
        en: "Messor ants don't chase prey and don't wage war without need. Their strength lies elsewhere - in patient work, in stores, and in the knack of surviving both the heat and the winter.",
      },
      author: "GoodAntShop",
    },
    {
      type: "heading",
      level: 2,
      text: {
        ru: "Почему мессоров советуют новичкам",
        ro: "De ce furnicile Messor sunt recomandate începătorilor",
        en: "Why Messor ants are recommended for beginners",
      },
    },
    {
      type: "paragraph",
      text: {
        ru: "За такой фермой удивительно интересно наблюдать. Видно, как рабочие тащат семена, как растут амбары, как крупные солдаты мелют зерно, а матка откладывает яйца. Ухаживать просто - горсть семян раз в неделю, сухая арена и спокойная зимовка. Не нужно ни ловить живой корм, ни возиться с добычей - семян хватает, а за белком сойдёт и мёртвое насекомое. Добавьте спокойный нрав и то, что вид живёт в нашем климате, и станет понятно, почему [мессор структор](/ants/messor-structor) считается лучшим выбором для первой колонии.",
        ro: "O astfel de fermă e uimitor de interesant de urmărit. Vezi cum lucrătoarele târăsc semințe, cum cresc hambarele, cum soldații mari macină bobul, iar regina depune ouă. Îngrijirea e simplă - un pumn de semințe o dată pe săptămână, o arenă uscată și o iernare liniștită. Nu trebuie nici să prinzi hrană vie, nici să te chinui cu prada - semințele ajung, iar pentru proteine e bună și o insectă moartă. Adaugă firea liniștită și faptul că specia trăiește în clima noastră, și devine limpede de ce [Messor structor](/ants/messor-structor) e socotită cea mai bună alegere pentru prima colonie.",
        en: "A farm like this is astonishingly interesting to watch. You see the workers hauling seeds, the granaries growing, the big soldiers grinding grain and the queen laying eggs. Care is simple - a handful of seeds once a week, a dry arena and a calm winter rest. You needn't catch live food or fuss with prey - seeds are enough, and a dead insect will do for protein. Add the calm temperament and the fact that the species lives in our climate, and it becomes clear why [Messor structor](/ants/messor-structor) is considered the best choice for a first colony.",
      },
    },
    {
      type: "keytakeaways",
      title: {
        ru: "Коротко о мессорах",
        ro: "Pe scurt despre furnicile Messor",
        en: "Messor ants in brief",
      },
      items: [
        {
          ru: "Степной муравей-жнец, который кормится семенами, а не охотой.",
          ro: "Furnică-secerătoare de stepă, care se hrănește cu semințe, nu cu vânat.",
          en: "A steppe harvester ant that feeds on seeds, not on hunting.",
        },
        {
          ru: "Собирает урожай, хранит его в подземных амбарах и печёт «муравьиный хлеб».",
          ro: "Strânge recolta, o păstrează în hambare subterane și coace «pâinea furnicilor».",
          en: "It reaps the harvest, stores it in underground granaries and bakes «ant bread».",
        },
        {
          ru: "С умом делит гнездо на сухие амбары и влажные комнаты для расплода.",
          ro: "Împarte cu cap cuibul în hambare uscate și camere umede pentru puiet.",
          en: "It wisely splits the nest into dry granaries and damp chambers for the brood.",
        },
        {
          ru: "Спокойный, неприхотливый и живёт в нашем климате.",
          ro: "Liniștită, nepretențioasă și trăiește în clima noastră.",
          en: "Calm, undemanding and lives in our climate.",
        },
        {
          ru: "Арену держат сухой, а зимой дают колонии отдых.",
          ro: "Arena se ține uscată, iar iarna coloniei i se dă odihnă.",
          en: "The arena is kept dry, and in winter the colony is given its rest.",
        },
        {
          ru: "Лучший вид, чтобы впервые завести муравьёв дома.",
          ro: "Cea mai bună specie pentru a începe să crești furnici acasă.",
          en: "The best species for keeping ants at home for the first time.",
        },
      ],
    },
    {
      type: "cta",
      text: {
        ru: "Хотите увидеть муравьиную ферму своими глазами? Мессор структор - самый простой способ начать, а мы поможем на старте и подскажем каждый шаг.",
        ro: "Vrei să vezi o fermă de furnici cu ochii tăi? Messor structor e cel mai simplu mod de a începe, iar noi te ajutăm la start și îți spunem fiecare pas.",
        en: "Want to see an ant farm with your own eyes? Messor structor is the easiest way to start, and we'll help you at the start and guide you through every step.",
      },
      buttonLabel: {
        ru: "Смотреть мессоров",
        ro: "Vezi furnicile Messor",
        en: "See the Messor ants",
      },
      to: "/ants/messor-structor",
    },
  ],

  faq: [
    {
      q: {
        ru: "Мессоры кусаются или жалят?",
        ro: "Furnicile Messor mușcă sau înțeapă?",
        en: "Do Messor ants bite or sting?",
      },
      a: {
        ru: "Не жалят. Мессор может разве что легонько цапнуть челюстями, если очень настойчиво его тревожить, но для человека это почти незаметно.",
        ro: "Nu înțeapă. Cel mult o furnică Messor te poate ciupi ușor cu fălcile, dacă o tot deranjezi cu îndârjire, dar pentru om asta e aproape de neobservat.",
        en: "They don't sting. At most a Messor might give a light nip with its jaws if you keep pestering it, but for a person that's almost unnoticeable.",
      },
    },
    {
      q: {
        ru: "Чем кормить мессоров?",
        ro: "Cu ce se hrănesc furnicile Messor?",
        en: "What do you feed Messor ants?",
      },
      a: {
        ru: "Основа рациона - семена и злаки. Для белка подойдёт и мёртвое насекомое, гоняться за живым кормом мессорам не нужно. В целом это один из самых недорогих в кормлении видов.",
        ro: "Baza hranei sunt semințele și cerealele. Pentru proteine e bună și o insectă moartă, iar după hrană vie furnicile Messor nu au nevoie să alerge. În general, e una dintre cele mai ieftine specii la hrănit.",
        en: "The basis of their diet is seeds and grains. A dead insect works for protein, and Messor ants don't need to chase live food. Overall it's one of the cheapest species to feed.",
      },
    },
    {
      q: {
        ru: "Правда, что мессорам нужна зимовка?",
        ro: "E adevărat că furnicile Messor au nevoie de iernare?",
        en: "Is it true that Messor ants need a winter rest?",
      },
      a: {
        ru: "Да. Пара месяцев прохладного покоя зимой для них норма. Без зимовки матка живёт меньше, а семья развивается хуже.",
        ro: "Da. Câteva luni de repaus răcoros iarna sunt un lucru firesc pentru ele. Fără iernare regina trăiește mai puțin, iar familia se dezvoltă mai prost.",
        en: "Yes. A couple of months of cool rest in winter is normal for them. Without a winter rest the queen lives less and the family develops worse.",
      },
    },
  ],

  relatedProductIds: [44],
  relatedPostIds: [401],
};
