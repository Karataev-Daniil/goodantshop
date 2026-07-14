// ============================================================================
// БЛОГ - данные постов
// ----------------------------------------------------------------------------
// Первый пост заполнен полностью и показывает разные типы блоков (см. рендер в
// SingleBlogPage.jsx). Ниже - три пустых ШАБЛОНА: раскомментируйте и заполните
// (достаточно русского поля `ru` - ro/en автоматически подставят русский, пока
// вы не переведёте).
//
// Тексты мультиязычные: { ru: "…", ro: "…", en: "…" }. Можно заполнять только ru.
// ============================================================================

// Фото берём из центральной библиотеки src/assets/images/library.js - там
// собраны пути ко всем переиспользуемым картинкам сайта.
import {
  antColonyNestEntrance as imgNestEntrance,
  antsTrail as imgTrail,
  antHeadMandibles as imgSoldier,
  antsFeedingOnFly as imgHunt,
  antTendingAphids as imgAphids,
  wingedQueenOnWood as imgQueen,
  redAntsDrinkingWater as imgWaterDrop,
  antEmergingFromHole as imgNestHole,
} from "../assets/images/library";

// Рубрики блога. Список расширяемый - добавляйте новые разделы сюда, и они
// автоматически появятся в фильтре архива и в хлебных крошках статьи.
export const blogCategories = [
  { slug: "beginners", label: { ru: "Новичкам", ro: "Începători", en: "Beginners" } },
  { slug: "care", label: { ru: "Уход и содержание", ro: "Îngrijire", en: "Care" } },
  { slug: "species", label: { ru: "Виды муравьёв", ro: "Specii de furnici", en: "Ant species" } },
  { slug: "formicariums", label: { ru: "Формикарии", ro: "Formicarii", en: "Formicariums" } },
];

export const getBlogCategory = (slug) =>
  blogCategories.find((category) => category.slug === slug) || null;

export const blogPosts = [
  // ==========================================================================
  // ПОСТ №1 - «манифест» для тех, кто ещё не знает о хобби.
  // ==========================================================================
  {
    id: 401,
    slug: "why-ants-are-fascinating",
    category: "beginners",

    title: {
      ru: "Муравьи - единый механизм, где каждый винтик делает колонию сильнее",
      ro: "Furnicile - un mecanism unic, în care fiecare rotiță face colonia mai puternică",
      en: "Ants - a single mechanism where every cog makes the colony stronger",
    },
    excerpt: {
      ru: "Тысячи крошечных насекомых складываются в один живой организм, где каждый на своём месте. Рассказываем, чем муравьиная колония так восхищает и почему за ней можно наблюдать часами.",
      ro: "Mii de insecte minuscule se unesc într-un singur organism viu, în care fiecare e la locul lui. Îți povestim de ce colonia de furnici fascinează atât de mult și de ce o poți urmări ore în șir.",
      en: "Thousands of tiny insects come together as one living organism where everyone has their place. We explain why an ant colony is so captivating and why you can watch it for hours.",
    },
    seoTitle: {
      ru: "Чем удивительны муравьи: жизнь колонии изнутри | GoodAntShop",
      ro: "Prin ce sunt uimitoare furnicile: viața coloniei din interior | GoodAntShop",
      en: "What makes ants amazing: colony life from the inside | GoodAntShop",
    },
    seoDescription: {
      ru: "Муравьи как сверхорганизм: роли и профессии в колонии, охота, «скот» из тли, обучение молодняка, язык феромонов и почему королева не главная. Гид для новичков.",
      ro: "Furnicile ca supraorganism: roluri și profesii în colonie, vânătoare, «turme» de afide, instruirea tinerelor, limbajul feromonilor și de ce regina nu conduce. Ghid pentru începători.",
      en: "Ants as a superorganism: roles and jobs in the colony, hunting, aphid «livestock», teaching the young, the language of pheromones and why the queen isn't in charge. A beginner's guide.",
    },

    cover: {
      src: imgNestEntrance,
      alt: {
        ru: "Колония муравьёв у входа в гнездо в земле",
        ro: "Colonie de furnici la intrarea în cuib, în pământ",
        en: "Ant colony at the nest entrance in the ground",
      },
      width: 1200,
      height: 630,
    },

    datePublished: "2026-07-14",
    dateModified: "2026-07-14",
    author: { name: "GoodAntShop", url: "/about" },
    readingTime: 7,

    content: [
      {
        type: "lead",
        text: {
          ru: "Мало кто задумывается, насколько удивительные создания эти муравьи. По отдельности они крошечные и почти беспомощные, но сообща складываются в слаженный живой механизм, который строит подземные города, ведёт войны, пасёт «скот» и даже обучает молодёжь. Каждый занят своим делом, а вместе они способны на то, что немыслимо в одиночку. Заглянем в этот мир поближе, а в конце покажем, как наблюдать за ним прямо у себя дома.",
          ro: "Puțini se gândesc cât de uimitoare sunt furnicile. Separat sunt minuscule și aproape neajutorate, dar împreună formează un mecanism viu bine pus la punct, care construiește orașe subterane, poartă războaie, crește «animale» și chiar învață tinerele. Fiecare își face treaba, iar împreună reușesc ceea ce e de neconceput pentru una singură. Hai să privim mai atent această lume, iar la final îți arătăm cum s-o urmărești chiar la tine acasă.",
          en: "Few people realize how amazing ants are. On their own they are tiny and almost helpless, but together they form a well-tuned living mechanism that builds underground cities, wages wars, keeps «livestock» and even teaches the young. Each one does its job, and together they achieve what is unthinkable alone. Let's take a closer look at this world, and at the end we'll show how to watch it right at home.",
        },
      },
      {
        type: "heading",
        level: 2,
        text: {
          ru: "Пример идеального социума",
          ro: "Un exemplu de societate ideală",
          en: "An example of a perfect society",
        },
      },
      {
        type: "paragraph",
        text: {
          ru: "Муравьи - один из ярчайших примеров коллективного интеллекта в природе. Одна особь знает немного, но тысячи вместе решают, где заложить гнездо, куда идти за едой и кого отправить на охоту. Колонию даже называют «сверхорганизмом», ведь она действует как одно большое существо, а отдельные муравьи в ней словно клетки одного тела.",
          ro: "Furnicile sunt unul dintre cele mai strălucite exemple de inteligență colectivă din natură. O singură furnică știe puțin, dar mii împreună decid unde să sape cuibul, încotro să meargă după hrană și pe cine să trimită la vânătoare. Colonia e numită chiar «supraorganism», pentru că se comportă ca o singură ființă mare, iar furnicile din ea sunt ca celulele unui singur corp.",
          en: "Ants are one of the brightest examples of collective intelligence in nature. A single ant knows little, but thousands together decide where to build the nest, where to go for food and whom to send hunting. The colony is even called a «superorganism», because it acts like one large creature, and the individual ants in it are like the cells of a single body.",
        },
      },
      {
        type: "image",
        src: imgTrail,
        alt: {
          ru: "Муравьиная тропа по земле",
          ro: "Cărare de furnici pe pământ",
          en: "Ant trail on the ground",
        },
        caption: {
          ru: "Колонна тянется от гнезда к добыче, а вся колония действует как единое целое.",
          ro: "Coloana se întinde de la cuib spre pradă, iar întreaga colonie acționează ca un tot unitar.",
          en: "The column stretches from the nest to the prey, while the whole colony acts as one.",
        },
      },
      {
        type: "heading",
        level: 2,
        text: {
          ru: "У каждого своя роль в механизме",
          ro: "Fiecare are rolul său în mecanism",
          en: "Everyone has a role in the mechanism",
        },
      },
      {
        type: "paragraph",
        text: {
          ru: "В муравейнике нет безработных. Каждый муравей появляется на свет под свою задачу, а у крупных видов есть даже отдельные «касты» со своей внешностью и обязанностями. Вот лишь несколько профессий, которые можно встретить в колонии.",
          ro: "În furnicar nu există șomeri. Fiecare furnică se naște pentru o anumită sarcină, iar la speciile mari există chiar «caste» separate, cu înfățișare și îndatoriri proprii. Iată doar câteva profesii pe care le poți întâlni în colonie.",
          en: "There are no idlers in an anthill. Every ant is born for a specific task, and large species even have separate «castes» with their own looks and duties. Here are just a few of the jobs you can find in a colony.",
        },
      },
      {
        type: "image",
        src: imgSoldier,
        alt: {
          ru: "Голова муравья с мощными челюстями крупным планом",
          ro: "Capul unei furnici cu mandibule puternice, în prim-plan",
          en: "Close-up of an ant's head with powerful jaws",
        },
        caption: {
          ru: "Солдаты вооружены мощными челюстями - ими можно и защищаться, и дробить твёрдую пищу.",
          ro: "Soldații sunt înarmați cu mandibule puternice - cu ele pot și să se apere, și să spargă hrana tare.",
          en: "Soldiers are armed with powerful jaws - they can both defend and crush hard food with them.",
        },
      },
      {
        type: "deflist",
        items: [
          {
            q: {
              ru: "Солдаты - защитники границ",
              ro: "Soldații - apărătorii granițelor",
              en: "Soldiers - border guards",
            },
            a: {
              ru: "Крупные особи с массивными челюстями. У одних видов они охраняют гнездо и границы, у других той же силой дробят твёрдые семена.",
              ro: "Indivizi mari, cu mandibule masive. La unele specii apără cuibul și granițele, la altele, cu aceeași forță, sparg semințe tari.",
              en: "Large individuals with massive jaws. In some species they guard the nest and borders, in others they use the same strength to crush hard seeds.",
            },
          },
          {
            q: {
              ru: "Жнецы - пекари муравейника",
              ro: "Secerătoarele - brutarii furnicarului",
              en: "Harvesters - the anthill's bakers",
            },
            a: {
              ru: "Собирают семена и перемалывают их в «муравьиный хлеб» - питательную массу, которой выкармливают личинок.",
              ro: "Adună semințe și le macină în «pâinea furnicilor» - o masă hrănitoare cu care hrănesc larvele.",
              en: "They gather seeds and grind them into «ant bread» - a nutritious paste used to feed the larvae.",
            },
          },
          {
            q: {
              ru: "Живые бочки - хранилища еды",
              ro: "Butoaie vii - depozite de hrană",
              en: "Living barrels - food stores",
            },
            a: {
              ru: "У некоторых видов есть муравьи-хранилища, которые запасают еду прямо в собственном теле и делятся ею с колонией в голодные дни.",
              ro: "La unele specii există furnici-depozit, care păstrează hrana chiar în propriul corp și o împart cu colonia în zilele de foamete.",
              en: "Some species have storage ants that keep food right inside their own body and share it with the colony on hungry days.",
            },
          },
          {
            q: {
              ru: "Скотоводы - пастухи тли",
              ro: "Crescătorii - păstorii afidelor",
              en: "Herders - aphid shepherds",
            },
            a: {
              ru: "Многие муравьи «пасут» тлю, защищая её от врагов ради сладкой жидкости, которую она выделяет, совсем как фермеры со своим стадом.",
              ro: "Multe furnici «pasc» afide, apărându-le de dușmani pentru lichidul dulce pe care îl secretă, întocmai ca fermierii cu turma lor.",
              en: "Many ants «herd» aphids, protecting them from enemies for the sweet liquid they secrete, just like farmers with their herd.",
            },
          },
          {
            q: {
              ru: "Няньки и разведчики",
              ro: "Doici și cercetașe",
              en: "Nurses and scouts",
            },
            a: {
              ru: "Няньки ухаживают за яйцами и личинками, а разведчики находят еду и приводят к ней остальных.",
              ro: "Doicile îngrijesc ouăle și larvele, iar cercetașele găsesc hrana și le conduc pe celelalte spre ea.",
              en: "Nurses tend the eggs and larvae, while scouts find food and lead the others to it.",
            },
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        text: {
          ru: "Организм, идеально приспособленный к суровым условиям",
          ro: "Un organism perfect adaptat la condiții aspre",
          en: "An organism perfectly adapted to harsh conditions",
        },
      },
      {
        type: "paragraph",
        text: {
          ru: "Жизнь колонии куда сложнее, чем кажется. Муравьи охотятся сообща и нападают даже на добычу гораздо больше себя. А ещё они поддерживают в гнезде порядок и с умом распределяют камеры, отводя сухие под запасы еды, а влажные оставляя для расплода.",
          ro: "Viața coloniei e mult mai complexă decât pare. Furnicile vânează împreună și atacă chiar și pradă mult mai mare decât ele. În plus, mențin ordinea în cuib și împart cu grijă camerele, lăsând pe cele uscate pentru rezervele de hrană, iar pe cele umede pentru puiet.",
          en: "A colony's life is far more complex than it seems. Ants hunt together and even attack prey much larger than themselves. They also keep order in the nest and wisely divide the chambers, using dry ones for food stores and leaving damp ones for the brood.",
        },
      },
      {
        type: "row",
        images: [
          {
            src: imgHunt,
            alt: {
              ru: "Муравьи всей группой одолевают крупную добычу на листе",
              ro: "Furnicile, în grup, doboară o pradă mare pe o frunză",
              en: "A group of ants overpowering large prey on a leaf",
            },
            caption: {
              ru: "Вместе муравьи одолевают добычу в десятки раз крупнее себя.",
              ro: "Împreună, furnicile doboară pradă de zeci de ori mai mare decât ele.",
              en: "Together, ants overpower prey dozens of times their own size.",
            },
          },
          {
            src: imgAphids,
            alt: {
              ru: "Муравей ухаживает за тлёй на ветке",
              ro: "O furnică îngrijește afidele pe o ramură",
              en: "An ant tending aphids on a branch",
            },
            caption: {
              ru: "Тлю муравьи охраняют, как домашний скот, ради сладкой жидкости, которую она выделяет.",
              ro: "Furnicile păzesc afidele ca pe niște animale de casă, pentru lichidul dulce pe care îl secretă.",
              en: "Ants guard aphids like livestock, for the sweet liquid they secrete.",
            },
          },
        ],
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
          ru: "Молодых охотников муравьи учат прямо в деле. Взрослые придерживают полумёртвую добычу и дают новичкам её добить - так молодёжь набирается боевого опыта, ничем не рискуя.",
          ro: "Furnicile își învață tinerii vânători direct în acțiune. Adultele țin prada pe jumătate moartă și le lasă pe cele tinere s-o termine - așa capătă experiență de luptă fără niciun risc.",
          en: "Ants train their young hunters right in the field. Adults hold down half-dead prey and let the youngsters finish it off - that way the young gain combat experience without any risk.",
        },
      },
      {
        type: "heading",
        level: 2,
        text: {
          ru: "Никакой диктатуры",
          ro: "Nicio dictatură",
          en: "No dictatorship",
        },
      },
      {
        type: "paragraph",
        text: {
          ru: "Вопреки названию, королева не управляет муравейником. Её задача - откладывать яйца и давать жизнь новым поколениям. А куда переселяться, где искать еду, когда нападать, а когда обороняться, колония решает вместе, без командиров. Власть здесь не у одного, а у всех сразу.",
          ro: "În ciuda numelui, regina nu conduce furnicarul. Sarcina ei e să depună ouă și să dea viață noilor generații. Iar unde să se mute, unde să caute hrană, când să atace și când să se apere, colonia decide împreună, fără comandanți. Puterea aici nu e la unul, ci la toți deodată.",
          en: "Despite the name, the queen doesn't run the anthill. Her job is to lay eggs and give life to new generations. Where to move, where to look for food, when to attack and when to defend - the colony decides together, without commanders. Power here belongs not to one, but to all at once.",
        },
      },
      {
        type: "image",
        src: imgQueen,
        alt: {
          ru: "Крылатая молодая королева муравья на дереве",
          ro: "O regină tânără înaripată de furnică, pe lemn",
          en: "A young winged ant queen on wood",
        },
        caption: {
          ru: "Молодая крылатая королева. После брачного полёта она сбросит крылья и основает новую колонию.",
          ro: "O regină tânără înaripată. După zborul nupțial își va lepăda aripile și va întemeia o nouă colonie.",
          en: "A young winged queen. After the nuptial flight she'll shed her wings and found a new colony.",
        },
      },
      {
        type: "heading",
        level: 2,
        text: {
          ru: "Язык прикосновений",
          ro: "Limbajul atingerilor",
          en: "The language of touch",
        },
      },
      {
        type: "paragraph",
        text: {
          ru: "Муравьи «разговаривают» без слов, запахами-феромонами и лёгкими постукиваниями усиками. Так они поднимают тревогу, зовут на помощь и метят дорогу к еде. Никакого голосования у них нет - обычно инициативу берут самые активные особи, а удачный след быстро подхватывает вся колония, выходя на лучший маршрут.",
          ro: "Furnicile «vorbesc» fără cuvinte, prin mirosuri-feromoni și atingeri ușoare cu antenele. Așa dau alarma, cheamă ajutor și marchează drumul spre hrană. Nu există niciun vot - de obicei inițiativa o iau cele mai active furnici, iar o urmă reușită e preluată repede de toată colonia, care ajunge astfel pe cel mai bun traseu.",
          en: "Ants «talk» without words, through pheromone scents and light taps of their antennae. That's how they raise the alarm, call for help and mark the way to food. There's no voting - usually the most active ants take the initiative, and a successful trail is quickly picked up by the whole colony, leading it onto the best route.",
        },
      },
      {
        type: "image",
        src: imgWaterDrop,
        alt: {
          ru: "Муравьи пьют каплю воды",
          ro: "Furnicile beau o picătură de apă",
          en: "Ants drinking a drop of water",
        },
        caption: {
          ru: "Даже за глотком воды муравьи приходят вместе.",
          ro: "Chiar și după o gură de apă, furnicile vin împreună.",
          en: "Even for a sip of water, ants come together.",
        },
      },
      {
        type: "quote",
        text: {
          ru: "В муравейнике интересы колонии всегда выше собственных. При опасности рабочие без колебаний закрывают собой королеву и потомство.",
          ro: "În furnicar, interesele coloniei sunt mereu mai presus de cele proprii. La pericol, lucrătoarele își apără fără ezitare regina și puietul cu propriul corp.",
          en: "In an anthill, the colony's interests always come before one's own. In danger, workers unhesitatingly shield the queen and the brood with their own bodies.",
        },
        author: "GoodAntShop",
      },
      {
        type: "heading",
        level: 2,
        text: {
          ru: "И всё это можно наблюдать дома",
          ro: "Și toate acestea le poți urmări acasă",
          en: "And you can watch all this at home",
        },
      },
      {
        type: "paragraph",
        text: {
          ru: "Самое удивительное - за этой жизнью можно следить прямо у себя дома, за прозрачными стенками [формикария](/formicariums). Колония не шумит, не пахнет и занимает совсем немного места, а наблюдать за ней интересно и детям, и взрослым. На ваших глазах семья из [одной матки](/ants) постепенно разрастётся до настоящего города, и вы застанете весь этот путь своими глазами. Это как маленький живой мир на вашем столе.",
          ro: "Cel mai uimitor e că poți urmări această viață chiar la tine acasă, prin pereții transparenți ai [formicariului](/formicariums). Colonia nu face zgomot, nu miroase și ocupă foarte puțin loc, iar urmărirea ei e interesantă și pentru copii, și pentru adulți. Sub ochii tăi, o familie pornită de la [o singură regină](/ants) crește treptat până la un oraș adevărat, și vei prinde tot acest drum cu ochii tăi. E ca o mică lume vie pe masa ta.",
          en: "The most amazing part is that you can follow this life right at home, through the clear walls of a [formicarium](/formicariums). The colony makes no noise, has no smell and takes up very little space, and watching it is interesting for kids and adults alike. Before your eyes, a family started from [a single queen](/ants) gradually grows into a real city, and you'll witness the whole journey yourself. It's like a tiny living world on your desk.",
        },
      },
      {
        type: "image",
        src: imgNestHole,
        alt: {
          ru: "Муравей выходит из входа в подземное гнездо",
          ro: "O furnică iese din intrarea cuibului subteran",
          en: "An ant coming out of the underground nest entrance",
        },
        caption: {
          ru: "Вход в гнездо - отсюда начинается целый подземный мир.",
          ro: "Intrarea în cuib - de aici începe o întreagă lume subterană.",
          en: "The nest entrance - a whole underground world begins here.",
        },
      },
      {
        type: "keytakeaways",
        title: {
          ru: "Почему это затягивает",
          ro: "De ce te prinde",
          en: "Why it's so addictive",
        },
        items: [
          {
            ru: "Целый живой «сверхорганизм» прямо у вас дома.",
            ro: "Un întreg «supraorganism» viu chiar la tine acasă.",
            en: "A whole living «superorganism» right in your home.",
          },
          {
            ru: "Тихо, чисто и компактно.",
            ro: "Liniștit, curat și compact.",
            en: "Quiet, clean and compact.",
          },
          {
            ru: "Захватывает и детей, и взрослых.",
            ro: "Captivează și copiii, și adulții.",
            en: "Fascinates kids and adults alike.",
          },
          {
            ru: "За колонией можно следить годами - она растёт и меняется на глазах.",
            ro: "Colonia poate fi urmărită ani de zile - crește și se schimbă sub ochii tăi.",
            en: "You can watch a colony for years - it grows and changes before your eyes.",
          },
        ],
      },
      {
        type: "cta",
        text: {
          ru: "Хотите увидеть это вживую? Начните с простой колонии с маткой, а мы поддержим вас на старте и подскажем каждый шаг.",
          ro: "Vrei să vezi asta pe viu? Începe cu o colonie simplă cu regină, iar noi te susținem la start și îți spunem fiecare pas.",
          en: "Want to see it live? Start with a simple queen-right colony, and we'll support you at the start and guide every step.",
        },
        buttonLabel: {
          ru: "Выбрать колонию",
          ro: "Alege o colonie",
          en: "Choose a colony",
        },
        to: "/ants",
      },
    ],

    faq: [
      {
        q: {
          ru: "Муравьи опасны для дома?",
          ro: "Sunt furnicile periculoase pentru casă?",
          en: "Are ants dangerous to keep at home?",
        },
        a: {
          ru: "Нет. Колония живёт в закрытом формикарии, откуда муравьи не выбираются. Виды для новичков не агрессивны и не пахнут.",
          ro: "Nu. Colonia trăiește într-un formicariu închis, din care furnicile nu ies. Speciile pentru începători nu sunt agresive și nu miros.",
          en: "No. The colony lives in a closed formicarium the ants can't escape from. Beginner species are not aggressive and have no smell.",
        },
      },
      {
        q: {
          ru: "С какого вида лучше начать?",
          ro: "Cu ce specie e mai bine să începi?",
          en: "Which species is best to start with?",
        },
        a: {
          ru: "Новичку подойдёт [Messor Structor](/ants/messor-structor) - спокойный зерноядный вид, за которым удобно наблюдать и просто ухаживать.",
          ro: "Începătorului i se potrivește [Messor Structor](/ants/messor-structor) - o specie granivoră liniștită, ușor de urmărit și de îngrijit.",
          en: "A good choice for beginners is [Messor Structor](/ants/messor-structor) - a calm seed-eating species that's easy to watch and care for.",
        },
      },
    ],

    relatedProductIds: [],
    relatedPostIds: [], // напр. [402] - заполнится, когда появятся другие посты
  },

  // ==========================================================================
  // ШАБЛОНЫ ДЛЯ НОВЫХ ПОСТОВ
  // Раскомментируйте объект, поменяйте id/slug/category, впишите тексты (можно
  // только `ru:`), подставьте свои картинки и добавьте URL поста в public/sitemap.xml.
  //
  // Типы блоков content: lead · heading(level 2/3) · paragraph · image ·
  // row (фото в ряд) · list(ordered?) · steps · deflist · accordion ·
  // callout(tip/note/warning) · quote · keytakeaways · video · cta(to: "/ants").
  // ==========================================================================

  // --- Шаблон 1: рубрика «Уход и содержание» ---
  // {
  //   id: 402,
  //   slug: "",                    // латиницей через дефис, напр. "feeding-basics"
  //   category: "care",
  //   tags: [],
  //   title: { ru: "" },
  //   excerpt: { ru: "" },
  //   seoTitle: { ru: "" },        // можно оставить пустым - возьмётся title
  //   seoDescription: { ru: "" },  // можно оставить пустым - возьмётся excerpt
  //   cover: { src: imgTrail, alt: { ru: "" }, width: 1200, height: 630 },
  //   datePublished: "2026-07-14",
  //   dateModified: "2026-07-14",
  //   author: { name: "GoodAntShop", url: "/about" },
  //   readingTime: 5,
  //   // video: { embedUrl: "https://www.youtube.com/embed/…", thumbnail: imgTrail, name: { ru: "" }, description: { ru: "" }, uploadDate: "2026-07-14", duration: "PT3M00S" },
  //   content: [
  //     { type: "lead", text: { ru: "" } },
  //     { type: "heading", level: 2, text: { ru: "" } },
  //     { type: "paragraph", text: { ru: "" } },
  //     { type: "image", src: imgSoldier, alt: { ru: "" }, caption: { ru: "" } },
  //     { type: "list", ordered: false, items: [ { ru: "" }, { ru: "" } ] },
  //     { type: "callout", variant: "tip", title: { ru: "Совет" }, text: { ru: "" } },
  //   ],
  //   faq: [ { q: { ru: "" }, a: { ru: "" } } ],
  //   relatedProductIds: [44],
  //   relatedPostIds: [401],
  // },

  // --- Шаблон 2: рубрика «Виды муравьёв» ---
  // {
  //   id: 403,
  //   slug: "",
  //   category: "species",
  //   tags: [],
  //   title: { ru: "" },
  //   excerpt: { ru: "" },
  //   seoTitle: { ru: "" },
  //   seoDescription: { ru: "" },
  //   cover: { src: imgSoldier, alt: { ru: "" }, width: 1200, height: 630 },
  //   datePublished: "2026-07-14",
  //   dateModified: "2026-07-14",
  //   author: { name: "GoodAntShop", url: "/about" },
  //   readingTime: 6,
  //   content: [
  //     { type: "lead", text: { ru: "" } },
  //     { type: "heading", level: 2, text: { ru: "" } },
  //     { type: "paragraph", text: { ru: "" } },
  //     { type: "row", images: [ { src: imgHunt, alt: { ru: "" } }, { src: imgAphids, alt: { ru: "" } } ] },
  //     { type: "quote", text: { ru: "" }, author: "GoodAntShop" },
  //     { type: "keytakeaways", title: { ru: "Коротко" }, items: [ { ru: "" }, { ru: "" } ] },
  //     { type: "cta", text: { ru: "" }, buttonLabel: { ru: "Смотреть в каталоге" }, to: "/ants" },
  //   ],
  //   relatedProductIds: [],
  //   relatedPostIds: [401],
  // },

  // --- Шаблон 3: рубрика «Формикарии» ---
  // {
  //   id: 404,
  //   slug: "",
  //   category: "formicariums",
  //   tags: [],
  //   title: { ru: "" },
  //   excerpt: { ru: "" },
  //   seoTitle: { ru: "" },
  //   seoDescription: { ru: "" },
  //   cover: { src: imgNestHole, alt: { ru: "" }, width: 1200, height: 630 },
  //   datePublished: "2026-07-14",
  //   dateModified: "2026-07-14",
  //   author: { name: "GoodAntShop", url: "/about" },
  //   readingTime: 5,
  //   content: [
  //     { type: "lead", text: { ru: "" } },
  //     { type: "heading", level: 2, text: { ru: "" } },
  //     { type: "paragraph", text: { ru: "" } },
  //     { type: "steps", items: [ { title: { ru: "" }, text: { ru: "" } } ] },
  //     { type: "accordion", items: [ { q: { ru: "" }, a: { ru: "" } } ] },
  //     { type: "cta", text: { ru: "" }, buttonLabel: { ru: "Выбрать формикарий" }, to: "/formicariums" },
  //   ],
  //   relatedProductIds: [202, 203],
  //   relatedPostIds: [401],
  // },
];
