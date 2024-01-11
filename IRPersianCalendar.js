class Infrastructure
{
    #registered = {};

    constructor() { }

    addEventListener(name, callback)
    {
        if (!this.#registered[name])
        {
            this.#registered[name] = [];
        }

        this.#registered[name].push(callback);
    }

    triggerEvent(name, args)
    {
        this.#registered[name]?.forEach(fnc => fnc.apply(this, args));
    }
}

class IRPersianCalendar extends Infrastructure
{
    #persian_month_names = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
    #hijri_month_names = ["محرم", "صفر", "ربیع الاول", "ربیع الثانی", "جمادی الاول", "جمادی الثانیه", "رجب", "شعبان", "رمضان", "شوال", "ذیقعده", "ذیحجه"];
    #gregorian_month_names = ["ژانویه", "فوریه", "مارس", "آپریل", "می", "ژوئن", "جولای", "آگوست", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"];

    #day_names = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];


    #hijri_months_days =
    {
        start_year: 1427,
        start_julian_day: this.#hijriToJulianDay(1427 ,1, 1),

        end_year: 1464,
        end_julian_day: this.#hijriToJulianDay(1465 ,1, 1) - 1,

        days:
        {
            1427: [355, 30, 29, 29, 30, 29, 30, 30, 30, 30, 29, 29, 30],
            1428: [354, 29, 30, 29, 29, 29, 30, 30, 29, 30, 30, 30, 29],
            1429: [354, 30, 29, 30, 29, 29, 29, 30, 30, 29, 30, 30, 29],
            1430: [354, 30, 30, 29, 29, 30, 29, 30, 29, 29, 30, 30, 29],
            1431: [354, 30, 30, 29, 30, 29, 30, 29, 30, 29, 29, 30, 29],
            1432: [355, 30, 30, 29, 30, 30, 30, 29, 29, 30, 29, 30, 29],
            1433: [355, 29, 30, 29, 30, 30, 30, 29, 30, 29, 30, 29, 30],
            1434: [354, 29, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30, 29],
            1435: [355, 29, 30, 29, 30, 29, 30, 29, 30, 30, 30, 29, 30],
            1436: [354, 29, 30, 29, 29, 30, 29, 30, 29, 30, 29, 30, 30],
            1437: [354, 29, 30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30],
            1438: [354, 29, 30, 30, 30, 29, 30, 29, 29, 30, 29, 29, 30],
            1439: [354, 29, 30, 30, 30, 30, 29, 30, 29, 29, 30, 29, 29],
            1440: [355, 30, 29, 30, 30, 30, 29, 30, 30, 29, 29, 30, 29],
            1441: [355, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30, 29, 30],
            1442: [354, 29, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30, 29],
            1443: [354, 29, 30, 30, 29, 29, 30, 29, 30, 30, 29, 30, 29],
            1444: [354, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 29],
            1445: [354, 30, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29, 29],
            1446: [355, 30, 30, 30, 29, 30, 30, 29, 30, 29, 29, 30, 29],
            1447: [355, 29, 30, 29, 30, 30, 30, 29, 30, 30, 29, 29, 30],
            1448: [354, 29, 29, 30, 29, 30, 30, 29, 30, 30, 30, 29, 29],
            1449: [355, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30, 29, 30],
            1450: [354, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30, 29],
            1451: [354, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 29],
            1452: [354, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 29],
            1453: [355, 30, 30, 29, 30, 29, 30, 30, 29, 29, 30, 29, 30],
            1454: [354, 29, 30, 29, 30, 30, 29, 30, 30, 29, 30, 29, 29],
            1455: [355, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 30, 29],
            1456: [355, 29, 30, 29, 29, 30, 29, 30, 30, 29, 30, 30, 30],
            1457: [354, 29, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 30],
            1458: [354, 30, 29, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30],
            1459: [354, 30, 29, 30, 29, 30, 29, 29, 30, 29, 30, 29, 30],
            1460: [354, 30, 29, 30, 30, 29, 30, 29, 29, 30, 29, 30, 29],
            1461: [355, 30, 29, 30, 30, 29, 30, 30, 29, 29, 30, 29, 30],
            1462: [354, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29],
            1463: [355, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30],
            1464: [354/* : 355|354 <- Sum <- */, 30, 29, 29, 30, 29, 29, 30, 29, 30, 30, 29, 30/*: 30|29 -> verify -> true */],
            /*
			  verify = ( (end_julian_day - hijriToJulianDay(end_year, 12, iDoM[end_year][12])) === 0 );
			*/
        }
    };

    #unofficial_world_events =
    [
        { date: [7, 1], title: ['روز جهانی بال مرغ'], is_holiday: false },
        { date: [7, 3], title: ['روز جهانی بدون کیسه پلاستیکی'], is_holiday: false },
        { date: [7, 6], title: ['روز جهانی بوسیدن'], is_holiday: false },
        { date: [7, 7], title: ['روز جهانی شکلات'], is_holiday: false },
        { date: [7, 13], title: ['روز جهانی سنگ'], is_holiday: false },
        { date: [7, 20], title: ['روز جهانی پرش'], is_holiday: false },
        { date: [7, 28], title: ['روز جهانی هپاتیت'], is_holiday: false },
        { date: [7, 13], title: ['روز جهانی سنگ'], is_holiday: false },
        { date: [7, 30], title: ['روز جهانی دوستی'], is_holiday: false },
        { date: [8, 4], title: ['روز جهانی پلنگ ابری'], is_holiday: false },
        { date: [8, 12], title: ['روز جهانی فیل'], is_holiday: false },
        { date: [8, 19], title: ['روز جهانی زنبور عسل'], is_holiday: false },
        { date: [8, 20], title: ['روز جهانی پشه'], is_holiday: false },
        { date: [9, 2], title: ['روز جهانی ریش', 'روز جهانی نارگیل'], is_holiday: false },
        { date: [9, 9], title: ['روز جهانی سودوکو'], is_holiday: false },
        { date: [9, 13], title: ['روز جهانی برنامه‌نویسان'], is_holiday: false },
        { date: [9, 17], title: ['روز جهانی موسیقی کانتری'], is_holiday: false },
        { date: [9, 21], title: ['روز جهانی قدردانی'], is_holiday: false },
        { date: [9, 23], title: ['روز جهانی زبان اشاره'], is_holiday: false },
        { date: [9, 24], title: ['روز جهانی بالیوود', 'روز جهانی رودخانه‌ها'], is_holiday: false },
        { date: [9, 29], title: ['روز جهانی نجوم'], is_holiday: false },
        { date: [9, 30], title: ['روز جهانی لباس توری'], is_holiday: false }
    ]

    #official_world_events =
    [
        { date: [1, 1], title: ['جشن آغاز سال نو میلادی'], is_holiday: false },
        { date: [1, 14], title: ['روز جهانی منطق', 'جشن ولنتاین'], is_holiday: false },
        { date: [1, 24], title: ['روز جهانی آموزش', 'روز جهانی فرهنگ آفریقایی'], is_holiday: false },
        { date: [1, 26], title: ['روز جهانی گمرک'], is_holiday: false },
        { date: [1, 27], title: ['روز جهانی یادبود هولوکاست'], is_holiday: false },
        { date: [2, 11], title: ['روز جهانی زنان و دختران در علم'], is_holiday: false },
        { date: [2, 13], title: ['روز جهانی رادیو'], is_holiday: false },
        { date: [2, 20], title: ['روز جهانی عدالت اجتماعی'], is_holiday: false },
        { date: [2, 21], title: ['روز جهانی زبان مادری'], is_holiday: false },
        { date: [3, 4], title: ['روز جهانی مهندسی برای توسعه پایدار'], is_holiday: false },
        { date: [3, 8], title: ['روز جهانی زن'], is_holiday: false },
        { date: [3, 14], title: ['روز جهانی ریاضیات'], is_holiday: false },
        { date: [3, 20], title: ['روز جهانی شادی', 'روز جهانی فرانکفونی'], is_holiday: false },
        { date: [3, 21], title: ['روز جهانی نوروز', 'روز جهانی شعر', 'روز جهانی رفع تبعیض نژادی'], is_holiday: false },
        { date: [3, 22], title: ['روز جهانی آب'], is_holiday: false },
        { date: [3, 23], title: ['روز جهانی هواشناسی'], is_holiday: false },
        { date: [3, 27], title: ['روز جهانی تئاتر'], is_holiday: false },
        { date: [4, 4], title: ['روز جهانی ضد مین'], is_holiday: false },
        { date: [4, 6], title: ['روز جهانی ورزش برای توسعه و صلح'], is_holiday: false },
        { date: [4, 7], title: ['روز جهانی بهداشت'], is_holiday: false },
        { date: [4, 12], title: ['روز جهانی کیهان نوردی'], is_holiday: false },
        { date: [4, 15], title: ['روز جهانی هنر'], is_holiday: false },
        { date: [4, 22], title: ['روز زمین'], is_holiday: false },
        { date: [4, 23], title: ['روز جهانی کتاب'], is_holiday: false },
        { date: [4, 27], title: ['روز جهانی طراحی و گرافیک'], is_holiday: false },
        { date: [4, 30], title: ['روز جهانی جاز'], is_holiday: false },
        { date: [5, 1], title: ['روز جهانی کارگر'], is_holiday: false },
        { date: [5, 3], title: ['روز جهانی آزادی مطبوعات'], is_holiday: false },
        { date: [5, 5], title: ['روز جهانی ماما', 'روز میراث جهانی آفریقا', 'روز جهانی زبان پرتغالی'], is_holiday: false },
        { date: [5, 8], title: ['روز جهانی صلیب سرخ و هلال احمر'], is_holiday: false },
        { date: [5, 15], title: ['روز جهانی خانواده'], is_holiday: false },
        { date: [5, 16], title: ['روز جهانی نور', 'روز جهانی زندگی با هم در صلح'], is_holiday: false },
        { date: [5, 17], title: ['روز جهانی ارتباطات'], is_holiday: false },
        { date: [5, 18], title: ['روز جهانی موزه و میراث فرهنگی'], is_holiday: false },
        { date: [5, 21], title: ['روز جهانی تنوع فرهنگی برای گفتگو و توسعه'], is_holiday: false },
        { date: [5, 22], title: ['روز جهانی تنوع زیستی'], is_holiday: false },
        { date: [5, 29], title: ['روز جهانی کلاه‌آبی‌های سازمان ملل'], is_holiday: false },
        { date: [5, 31], title: ['روز جهانی بدون دخانیات'], is_holiday: false },
        { date: [6, 4], title: ['روز جهانی کودکان قربانی تجاوز'], is_holiday: false },
        { date: [6, 5], title: ['روز جهانی محیط زیست'], is_holiday: false },
        { date: [6, 8], title: ['روز جهانی اقیانوس‌ها'], is_holiday: false },
        { date: [6, 10], title: ['روز جهانی صنایع دستی'], is_holiday: false },
        { date: [6, 12], title: ['روز جهانی مبارزه با کار کودکان'], is_holiday: false },
        { date: [6, 14], title: ['روز جهانی اهدای خون'], is_holiday: false },
        { date: [6, 17], title: ['روز جهانی مبارزه با بیابان و خشکسالی'], is_holiday: false },
        { date: [6, 20], title: ['روز جهانی پناهندگان'], is_holiday: false },
        { date: [6, 23], title: ['روز جهانی خدمات دولتی'], is_holiday: false },
        { date: [6, 26], title: ['روز جهانی مبارزه با مواد مخدر'], is_holiday: false },
        { date: [7, 11], title: ['روز جهانی جمعیت'], is_holiday: false },
        { date: [7, 18], title: ['روز جهانی نلسون ماندلا'], is_holiday: false },
        { date: [7, 26], title: ['روز جهانی حفاظت از اکوسیستم حرا'], is_holiday: false },
        { date: [8, 1], title: ['روز جهانی شیر مادر'], is_holiday: false },
        { date: [8, 9], title: ['روز جهانی بومیان'], is_holiday: false },
        { date: [8, 12], title: ['روز جهانی جوانان'], is_holiday: false },
        { date: [8, 13], title: ['روز جهانی چپ‌دست‌ها'], is_holiday: false },
        { date: [8, 19], title: ['روز جهانی عکاسی'], is_holiday: false },
        { date: [8, 23], title: ['روز جهانی یادآوری تجارت برده و لفو آن'], is_holiday: false },
        { date: [8, 31], title: ['روز جهانی وبلاگ'], is_holiday: false },
        { date: [9, 8], title: ['روز جهانی سوادآموزی'], is_holiday: false },
        { date: [9, 10], title: ['روز جهانی پیشگیری از خودکشی'], is_holiday: false },
        { date: [9, 15], title: ['روز جهانی مردم سالاری'], is_holiday: false },
        { date: [9, 16], title: ['روز جهانی نگه‌داری از لایه ازن'], is_holiday: false },
        { date: [9, 20], title: ['روز جهانی ورزش دانشگاهی'], is_holiday: false },
        { date: [9, 21], title: ['روز جهانی صلح'], is_holiday: false },
        { date: [9, 27], title: ['روز جهانی جهان‌گردی'], is_holiday: false },
        { date: [9, 28], title: ['روز جهانی دسترسی جهانی به اطلاعات'], is_holiday: false },
        { date: [9, 30], title: ['روز جهانی دریانوردی', 'روز جهانی ناشنوایان'], is_holiday: false },
        { date: [9, 30], title: ['روز جهانی ترجمه و مترجم'], is_holiday: false },
        { date: [10, 1], title: ['روز جهانی سالمندان'], is_holiday: false },
        { date: [10, 4], title: ['آغاز هفته جهانی فضا'], is_holiday: false },
        { date: [10, 5], title: ['روز جهانی آموزگار'], is_holiday: false },
        { date: [10, 8], title: ['روز جهانی کودک'], is_holiday: false },
        { date: [10, 9], title: ['روز جهانی پست'], is_holiday: false },
        { date: [10, 10], title: ['روز جهانی بهداشت روان', 'روز جهانی مبارزه با حکم اعدام'], is_holiday: false },
        { date: [10, 11], title: ['روز جهانی دختر'], is_holiday: false },
        { date: [10, 13], title: ['روز جهانی کاهش بلایا'], is_holiday: false },
        { date: [10, 14], title: ['روز جهانی استاندارد'], is_holiday: false },
        { date: [10, 15], title: ['روز جهانی عصای سفید'], is_holiday: false },
        { date: [10, 16], title: ['روز جهانی غذا'], is_holiday: false },
        { date: [10, 17], title: ['روز جهانی مبارزه با فقر'], is_holiday: false },
        { date: [10, 24], title: ['روز جهانی سارمان ملل', 'روز جهانی اخبار'], is_holiday: false },
        { date: [10, 27], title: ['روز جهانی میراث سمعی و بصری'], is_holiday: false },
        { date: [11, 2], title: ['روز جهانی پایان دادن به مصونیت از مجازات برای جنایات علیه خبرنگاران'], is_holiday: false },
        { date: [11, 5], title: ['روز جهانی زبان رومی', 'روز جهانی آگاهی از سونامی'], is_holiday: false },
        { date: [11, 10], title: ['روز جهانی علم در خدمت صلح و توسعه پایدار'], is_holiday: false },
        { date: [11, 14], title: ['روز جهانی دیابت', 'روز جهانی مبارزه با قاچاق غیرقانونی اموال فرهنگی'], is_holiday: false },
        { date: [11, 16], title: ['روز جهانی مدارا'], is_holiday: false },
        { date: [11, 18], title: ['روز جهانی هنر اسلامی', 'روز جهانی فلسفه'], is_holiday: false },
        { date: [11, 19], title: ['روز جهانی آقایان'], is_holiday: false },
        { date: [11, 21], title: ['روز جهانی تلویزیون'], is_holiday: false },
        { date: [11, 25], title: ['روز جهانی مبارزه با خشونت علیه زنان'], is_holiday: false },
        { date: [11, 26], title: ['روز جهانی درخت زیتون'], is_holiday: false },
        { date: [11, 29], title: ['روز جهانی همبستگی با مردم فلسطین'], is_holiday: false },
        { date: [12, 1], title: ['روز جهانی ایدز'], is_holiday: false },
        { date: [12, 2], title: ['روز جهانی آزادی بردگان'], is_holiday: false },
        { date: [12, 3], title: ['روز جهانی افراد دارای معلولیت'], is_holiday: false },
        { date: [12, 7], title: ['روز جهانی هواپیمایی'], is_holiday: false },
        { date: [12, 10], title: ['روز جهانی حقوق بشر'], is_holiday: false },
        { date: [12, 11], title: ['روز جهانی کوه‌نوردی'], is_holiday: false },
        { date: [12, 18], title: ['روز جهانی مهاجرین', 'روز جهانی زبان عربی'], is_holiday: false },
        { date: [12, 25], title: ['جشن کریسمس'], is_holiday: false },
        { date: [12, 30], title: ['روز جهانی همبستگی انسانی'], is_holiday: false }
    ]

    #persian_events =
    [
        { date: [1, 1], title: ['عید نوروز'], is_holiday: true },
        { date: [1, 2], title: ['عید نوروز'], is_holiday: true },
        { date: [1, 3], title: ['عید نوروز'], is_holiday: true },
        { date: [1, 4], title: ['عید نوروز'], is_holiday: true },
        { date: [1, 6], title: ['ولادت زرتشت'], is_holiday: false },
        { date: [1, 7], title: ['روز هنرهای نمایشی'], is_holiday: false },
        { date: [1, 12], title: ['روز جمهوری اسلامی'], is_holiday: true },
        { date: [1, 13], title: ['روز طبیعت'], is_holiday: true },
        { date: [1, 18], title: ['روز سلامتی'], is_holiday: false },
        { date: [1, 20], title: ['روز ملی فناوری هسته‌ای'], is_holiday: false },
        { date: [1, 25], title: ['روز بزرگداشت عطار نیشابوری'], is_holiday: false },
        { date: [1, 29], title: ['روز ارتش جمهوری اسلامی و نیروی زمینی'], is_holiday: false },
        { date: [2, 1], title: ['روز بزرگداشت سعدی'], is_holiday: false },
        { date: [2, 3], title: ['روز بزرگداشت شیخ بهایی', 'روز معماری'], is_holiday: false },
        { date: [2, 7], title: ['روز ایمنی حمل و نقل'], is_holiday: false },
        { date: [2, 9], title: ['روز شوراها'], is_holiday: false },
        { date: [2, 10], title: ['روز ملی خلیج فارس'], is_holiday: false },
        { date: [2, 15], title: ['روز بزرگداشت شیخ صدوق'], is_holiday: false },
        { date: [2, 18], title: ['روز بیماری‌های خاص و صعب العلاج'], is_holiday: false },
        { date: [2, 19], title: ['روز بزرگداشت شیخ کلینی'], is_holiday: false },
        { date: [2, 25], title: ['روز پاسداشت زبان فارسی و بزرگداشت حکیم ابوالقاسم فردوسی'], is_holiday: false },
        { date: [2, 28], title: ['روز بزرگداشت حکیم عمر خیام'], is_holiday: false },
        { date: [2, 30], title: ['روز ملی جمعیت'], is_holiday: false },
        { date: [2, 31], title: ['روز اهدای عضو', 'اهدای زندگی'], is_holiday: false },
        { date: [3, 1], title: ['روز بهره‌وری و بهینه‌سازی مصرف', 'روز بزرگداشت ملاصدرا'], is_holiday: false },
        { date: [3, 8], title: ['روز فرهنگ پهلوانی و ورزش زورخانه‌ای'], is_holiday: false },
        { date: [3, 14], title: ['رحلت امام خمینی'], is_holiday: true },
        { date: [3, 15], title: ['قیام خونین 15 خرداد'], is_holiday: true },
        { date: [3, 20], title: ['روز صنایع دستی'], is_holiday: false },
        { date: [3, 29], title: ['درگذشت دکتر علی شریعتی'], is_holiday: false },
        { date: [3, 31], title: ['شهادت دکتر مصطفی چمران', 'روز بسیج استادان'], is_holiday: false },
        { date: [4, 1], title: ['روز اصناف'], is_holiday: false },
        { date: [4, 7], title: ['روز قوه قضاییه'], is_holiday: false },
        { date: [4, 8], title: ['روز مبارزه با سلاح‌های شیمیایی و میکروبی'], is_holiday: false },
        { date: [4, 10], title: ['روز صنعت و معدن'], is_holiday: false },
        { date: [4, 14], title: ['روز قلم'], is_holiday: false },
        { date: [4, 18], title: ['روز ادبیات کودکان و نوجوانان'], is_holiday: false },
        { date: [4, 23], title: ['روز گفت‌وگو و تعامل سازنده با جهان'], is_holiday: false },
        { date: [4, 25], title: ['روز بهزیستی و تامین اجتماعی'], is_holiday: false },
        { date: [5, 9], title: ['روز اهدای خون'], is_holiday: false },
        { date: [5, 14], title: ['روز خانواده و تکریم بازنشستگان'], is_holiday: false },
        { date: [5, 17], title: ['روز خبرنگار'], is_holiday: false },
        { date: [5, 21], title: ['روز حمایت از صنایع کوچک'], is_holiday: false },
        { date: [5, 22], title: ['روز تشکل‌ها و مشارکت‌های اجتماعی'], is_holiday: false },
        { date: [5, 23], title: ['روز مقاومت اسلامی'], is_holiday: false },
        { date: [5, 29], title: ['روز تجلیل از اسرا و مفقودان'], is_holiday: false },
        { date: [5, 30], title: ['روز بزرگداشت علامه مجلسی', 'روز جهانی مسجد'], is_holiday: false },
        { date: [6, 1], title: ['روز بزرگداشت ابوعلی سینا', 'روز پزشک'], is_holiday: false },
        { date: [6, 4], title: ['روز کارمند'], is_holiday: false },
        { date: [6, 5], title: ['روز بزرگداشت محمدبن‌زکریا رازی', 'روز داروسازی', 'روز کشتی'], is_holiday: false },
        { date: [6, 8], title: ['روز مبارزه با تروریسم'], is_holiday: false },
        { date: [6, 13], title: ['روز بزرگداشت ابوریحان بیرونی', 'روز تعاون'], is_holiday: false },
        { date: [6, 21], title: ['روز سینما'], is_holiday: false },
        { date: [6, 23], title: ['روز بزرگداشت سلمان فارسی'], is_holiday: false },
        { date: [6, 27], title: ['روز بزرگداشت شهریار', 'روز شعر و ادب فارسی'], is_holiday: false },
        { date: [7, 5], title: ['روز گردشگری'], is_holiday: false },
        { date: [7, 7], title: ['روز آتش‌نشانی و امنیت', 'روز بزرگداشت شمس'], is_holiday: false },
        { date: [7, 8], title: ['روز بزرگداشت مولوی'], is_holiday: false },
        { date: [7, 12], title: ['روز وقف'], is_holiday: false },
        { date: [7, 13], title: ['روز نیروی انتظامی'], is_holiday: false },
        { date: [7, 14], title: ['روز دامپزشکی'], is_holiday: false },
        { date: [7, 15], title: ['روز روستا و عشایر'], is_holiday: false },
        { date: [7, 20], title: ['روز بزرگداشت حافظ'], is_holiday: false },
        { date: [7, 24], title: ['روز ملی پارالمپیک'], is_holiday: false },
        { date: [7, 26], title: ['روز تربیت بدنی و ورزش'], is_holiday: false },
        { date: [7, 29], title: ['روز صادرات'], is_holiday: false },
        { date: [8, 8], title: ['روز نوجوان و بسیج دانشجویی'], is_holiday: false },
        { date: [8, 13], title: ['روز دانش‌آموز'], is_holiday: false },
        { date: [8, 14], title: ['روز فرهنگ عمومی'], is_holiday: false },
        { date: [8, 24], title: ['روز کتاب', 'کتاب‌خوانی و کتابدار'], is_holiday: false },
        { date: [9, 7], title: ['روز نیروی دریایی'], is_holiday: false },
        { date: [9, 9], title: ['روز بزرگداشت شیخ مفید'], is_holiday: false },
        { date: [9, 16], title: ['روز دانشجو'], is_holiday: false },
        { date: [9, 25], title: ['روز پژوهش'], is_holiday: false },
        { date: [9, 27], title: ['روز وحدت حوزه و دانشگاه'], is_holiday: false },
        { date: [9, 30], title: ['شب یلدا'], is_holiday: false },
        { date: [10, 5], title: ['روز ایمنی در برابر زلزله و کاهش اثرات بلایای طبیعی'], is_holiday: false },
        { date: [11, 14], title: ['روز فناوری فضایی'], is_holiday: false },
        { date: [11, 19], title: ['روز نیروی هوایی'], is_holiday: false },
        { date: [11, 22], title: ['پیروزی انقلاب اسلامی'], is_holiday: true },
        { date: [11, 19], title: ['روز اقتصاد مقاومتی و کارآفرینی'], is_holiday: false },
        { date: [11, 22], title: ['پیروزی انقلاب اسلامی'], is_holiday: true },
        { date: [11, 19], title: ['روز اقتصاد مقاومتی و کارآفرینی'], is_holiday: false },
        { date: [12, 5], title: ['روز بزرگداشت خواجه نصیرالدین طوسی', 'روز مهندسی'], is_holiday: false },
        { date: [12, 14], title: ['روز احسان و نیکوکاری', 'روز ترویج فرهنگ قرض‌الحسنه'], is_holiday: false },
        { date: [12, 15], title: ['روز درختکاری'], is_holiday: false },
        { date: [12, 20], title: ['روز راهیان نور'], is_holiday: false },
        { date: [12, 21], title: ['روز بزرگداشت نظامی گنجوی'], is_holiday: false },
        { date: [12, 25], title: ['روز بزرگداشت پروین اعتصامی'], is_holiday: false },
        { date: [12, 29], title: ['روز ملی شدن صنعت نفت'], is_holiday: true }
    ]

    #hijri_events =
    [
        { date: [1, 1], title: ['آغاز سال جدید هجری قمری'], is_holiday: false },
        { date: [1, 9], title: ['تاسوعای حسینی'], is_holiday: true },
        { date: [1, 10], title: ['عاشورای حسینی'], is_holiday: true },
        { date: [1, 12], title: ['شهادت امام سجاد (ع)'], is_holiday: false },
        { date: [2, 20], title: ['اربعین حسینی'], is_holiday: true },
        { date: [2, 28], title: ['رحلت حضرت رسول اکرم (ص)', 'شهادت امام حسن مجتبی (ع)'], is_holiday: true },
        { date: [2, 30], title: ['شهادت امام رضا (ع)'], is_holiday: true },
        { date: [3, 1], title: ['هجرت حضرت رسول اکرم (ص) از مکه به مدینه'], is_holiday: false },
        { date: [3, 8], title: ['شهادت امام حسن عسکری (ع)'], is_holiday: true },
        { date: [3, 19], title: ['ولادت حضرت رسول اکرم (ص) به روایت اهل سنت'], is_holiday: false },
        { date: [3, 17], title: ['ولادت حضرت رسول اکرم (ص)'], is_holiday: true },
        { date: [4, 8], title: ['ولادت امام حسن عسکری (ع)'], is_holiday: false },
        { date: [4, 10], title: ['وفات حضرت معصومه (س)'], is_holiday: false },
        { date: [5, 5], title: ['ولادت حضرت زینب (س)'], is_holiday: false },
        { date: [6, 3], title: ['شهادت حضرت فاطمه (س)'], is_holiday: true },
        { date: [6, 13], title: ['وفات حضرت ام‌البنین (س)'], is_holiday: false },
        { date: [6, 20], title: ['ولادت حضرت فاطمه (س) و روز زن'], is_holiday: false },
        { date: [7, 1], title: ['ولادت امام محمد باقر (ع)'], is_holiday: false },
        { date: [7, 3], title: ['شهادت امام علی نقی (ع)'], is_holiday: false },
        { date: [7, 10], title: ['ولادت امام محمد تقی (ع)'], is_holiday: false },
        { date: [7, 13], title: ['ولادت امام علی (ع)'], is_holiday: true },
        { date: [7, 15], title: ['ارتحال حضرت زینب (س)'], is_holiday: false },
        { date: [7, 25], title: ['شهادت امام موسی کاظم (ع)'], is_holiday: false },
        { date: [7, 27], title: ['مبعث حضرت رسول اکرم (ص)'], is_holiday: true },
        { date: [8, 3], title: ['ولادت امام حسین (ع)'], is_holiday: false },
        { date: [8, 4], title: ['ولادت ابوالفضل عباس (ع)'], is_holiday: false },
        { date: [8, 5], title: ['ولادت امام سجاد (ع)'], is_holiday: false },
        { date: [8, 11], title: ['ولادت علی اکبر (ع)'], is_holiday: false },
        { date: [8, 15], title: ['ولادت حضرت قائم (عجل)'], is_holiday: true },
        { date: [9, 15], title: ['ولادت امام حسن مجتبی (ع)'], is_holiday: false },
        { date: [9, 18], title: ['شب قدر'], is_holiday: false },
        { date: [9, 19], title: ['ضربت خوردن امام علی (ع)'], is_holiday: false },
        { date: [9, 20], title: ['شب قدر'], is_holiday: false },
        { date: [9, 21], title: ['شهادت حضرت علی (ع)'], is_holiday: true },
        { date: [9, 22], title: ['شب قدر'], is_holiday: false },
        { date: [10, 1], title: ['عید فطر'], is_holiday: true },
        { date: [10, 2], title: ['تعطیلات عید فطر'], is_holiday: true },
        { date: [10, 25], title: ['شهادت امام جعفر صادق (ع)'], is_holiday: true },
        { date: [11, 1], title: ['ولادت حضرت معصومه (س)'], is_holiday: false },
        { date: [11, 11], title: ['ولادت امام رضا (ع)'], is_holiday: false },
        { date: [11, 30], title: ['شهادت امام محمد تقی (ع)'], is_holiday: false },
        { date: [12, 1], title: ['سالروز ازدواج امام علی (ع) و حضرت فاطمه (س)'], is_holiday: false },
        { date: [12, 7], title: ['شهادت امام محمد باقر (ع)'], is_holiday: false },
        { date: [12, 9], title: ['روز عرفه'], is_holiday: false },
        { date: [12, 10], title: ['عید قربان'], is_holiday: true },
        { date: [12, 15], title: ['ولادت امام علی نقی (ع)'], is_holiday: false },
        { date: [12, 18], title: ['عید غدیر خم'], is_holiday: true },
        { date: [12, 20], title: ['ولادت امام موسی کاظم (ع)'], is_holiday: false }
    ]


    #option =
    {
        html:
        {
            id: "IR_PersianCalendar",

            daysTitleId: 'irp_day_names',
            dayTitleClass: 'irp-day-name',

            daysId: "irp_days",
            dayClass: "irp-day",

            holidayClass: "holiday",
            fridayClass: "friday",
            disableClass: "disable",
            selectedClass: "selected",
            todayClass: "today",

            disableContent: "."
        },

        config:
        {
            from: undefined,
            to: undefined,

            updateToday: true,
            updateTodayTimeout: 5000,

            selectable: true,

            persianEvent: true,
            hijriEvent: true,
            officialWorldEvent: true,
            unofficialWorldEvent: true
        }
    };

    #today = undefined;
    #today_hijri = undefined;
    #today_gregorian = undefined;

    #selected = undefined;
    #selected_hijri = undefined;
    #selected_gregorian = undefined;

    #intervals = [];

    constructor(option = undefined)
    {
        super();

        this.#initOption(option);
        this.#initBody();
    }


    init()
    {
        return new Promise(async (resolve, reject) =>
        {
            await this.#updateTodayDate();

            if (this.#option.config.updateToday)
            {
                this.#intervals[this.#intervals.length] = setInterval(async () =>
                {
                    await this.#updateTodayDate();
                }, this.#option.config.updateTodayTimeout);
            }

            const from = this.#option.config.from;
            const to = this.#option.config.to;

            if(from !== undefined)
            {
                if(this.#today[0] < from[0] ||
                    (this.#today[0] === from[0] && this.#today[1] < from[1]) ||
                    ((this.#today[0] === from[0] && this.#today[1] === from[1] && this.#today[2] < from[2])))
                {
                    this.#selected = [from[0], from[1], from[2]];
                }
            }

            if(this.#selected === undefined && to !== undefined)
            {
                if(this.#today[0] >= to[0] ||
                    (this.#today[0] === to[0] && this.#today[1] < to[1]) ||
                    ((this.#today[0] === to[0] && this.#today[1] === to[1] && this.#today[2] < to[2])))
                {
                    this.#selected = [to[0], to[1], to[2]];
                }
            }

            if((to === undefined && from === undefined) || this.#selected === undefined)
            {
                this.#selected = this.#today;
            }

            this.#initDays();

            resolve();
        })
    }

    #initOption(option)
    {
        if(!option)
        {
            return;
        }

        let usr_opt_keys = Object.keys(option);
        let opt_keys = Object.keys(this.#option);

        for(let item in usr_opt_keys)
        {
            let index = opt_keys.indexOf(item);

            if(index === -1)
            {
                continue;
            }

            this.#option[item] = option[item];
        }
    }

    #initBody()
    {
        let self = this;
        let body = document.getElementById(this.#option.html.id);

        let day_names_str = "";
        let days_name = document.createElement("div");

        let days_str = "";
        let days = document.createElement("div");

        days_name.id = this.#option.html.daysTitleId;
        days.id = this.#option.html.daysId;

        for(let name of this.#day_names)
        {
            day_names_str += `<div class="${this.#option.html.dayTitleClass}">${name}</div>`;
        }

        for(let index of [1, 2, 3, 4, 5, 6])
        {
            for(let name of this.#day_names)
            {
                days_str += `<div class="${this.#option.html.dayClass}" title="${name}" data-title="${name}"><span>.</span></div>`;
            }
        }

        days_name.innerHTML = day_names_str;
        days.innerHTML = days_str;

        body.append(days_name);
        body.append(days);

        if(this.#option.config.selectable)
        {
            for(let index = 0; index < 42; index++)
            {
                document.querySelectorAll(`#${this.#option.html.id} .${this.#option.html.dayClass}`)[index].addEventListener('click', function(event)
                {
                    if(!event.target.classList.contains(self.#option.html.disableClass))
                    {
                        let day_elements = document.getElementsByClassName(self.#option.html.dayClass);

                        Array.prototype.slice.call(day_elements).forEach(function(element)
                        {
                            element.classList.remove(self.#option.html.selectedClass);
                        })

                        event.target.classList.add(self.#option.html.selectedClass);

                        self.#selected[2] = parseInt(event.target.innerText);
                        let selected_day = self.#getSelectedDayWithEvents();

                        self.triggerEvent("selectDay", [selected_day]);
                    }
                });
            }
        }
    }

    #initDays()
    {
        let day_class = this.#option.html.dayClass;

        let year = this.#selected[0],
            month = this.#selected[1];

        //get first day in week number
        //get day counts in month
        let day_of_week = this.#dayIndexOfWeek(year, month, 1),
            day_count = this.#dayCountInMonth(year, month);

        let cell_count = 42,
            cell_counter = 1,
            week_counter = 1;

        //remove last classes
        for (let i = 0; i < document.getElementsByClassName(day_class).length; i++)
        {
            document.getElementsByClassName(day_class)[i].classList.remove(this.#option.html.todayClass);
            document.getElementsByClassName(day_class)[i].classList.remove(this.#option.html.selectedClass);
            document.getElementsByClassName(day_class)[i].classList.remove(this.#option.html.fridayClass);
            document.getElementsByClassName(day_class)[i].classList.remove(this.#option.html.holidayClass);
            document.getElementsByClassName(day_class)[i].classList.remove(this.#option.html.disableClass);
        }

        const from = this.#option.config.from;
        const to = this.#option.config.to;

        for (let index = 0; index < cell_count; index++)
        {
            if(index >= day_of_week && cell_counter <= day_count)
            {
                //set title
                let title = document.getElementsByClassName(day_class)[index].dataset.title;

                if(this.#today[2] === cell_counter && this.#today[0] === year && this.#today[1] === month)
                {
                    title = "امروز " + title + ` ${this.#today[2]} ${this.persianMonthName(this.#today[1])} سال ${this.#today[0]}`;
                    document.getElementsByClassName(day_class)[index].classList.add(this.#option.html.todayClass);
                }

                //set friday
                if(week_counter === 7)
                {
                    document.getElementsByClassName(day_class)[index].classList.add(this.#option.html.fridayClass);
                }

                //set holiday
                let hijri_date = this.#jalaliToHijri(year, month, cell_counter);

                let is_persian_holiday = this.#persian_events.find(item =>
                {
                    return (item.is_holiday === true && item.date[0] === month && item.date[1] === cell_counter);
                });

                let is_hijri_holiday = this.#hijri_events.find(item =>
                {
                    return (item.is_holiday === true && item.date[0] === hijri_date[1] && item.date[1] === hijri_date[2]);
                });

                if(is_persian_holiday !== undefined || is_hijri_holiday !== undefined)
                {
                    document.getElementsByClassName(day_class)[index].classList.add(this.#option.html.holidayClass);
                }

                //month day element
                document.getElementsByClassName(day_class)[index].title = title;
                document.getElementsByClassName(day_class)[index].innerText = String(cell_counter);
                document.getElementsByClassName(day_class)[index].classList.remove(this.#option.html.disableClass);

                if(from !== undefined)
                {
                    if(year <= from[0] && month >= from[1])
                    {
                        if(!this.#checkLimit(year, month, cell_counter))
                        {
                            document.getElementsByClassName(day_class)[index].classList.add(this.#option.html.disableClass);
                        }
                    }
                }

                if(to !== undefined)
                {
                    if(year >= to[0] && month >= to[1])
                    {
                        if(!this.#checkLimit(year, month, cell_counter))
                        {
                            document.getElementsByClassName(day_class)[index].classList.add(this.#option.html.disableClass);
                        }
                    }
                }

                cell_counter++;
            }
            else
            {
                //disable day element
                document.getElementsByClassName(day_class)[index].title = "";
                document.getElementsByClassName(day_class)[index].innerText = this.#option.html.disableContent;
                document.getElementsByClassName(day_class)[index].classList.add(this.#option.html.disableClass);
            }

            //set week number
            if(week_counter >= 7)
            {
                week_counter = 1;
            }
            else
            {
                week_counter++;
            }
        }

        this.#updateTodayDate();
    }


    setOption(option)
    {
        this.#option = option;

        this.#initOption(option);
    }

    getOption()
    {
        return this.#option;
    }


    #dayIndexOfWeek(year, month, day)
    {
        let date = this.#jalaliToGregorian(year, month, day);

        let gregorian_date = new Date(date[0], date[1] - 1, date[2]).getDay();
        let number = ++gregorian_date;

        if (number === 7)
        {
            number = 0;
        }

        return number;
    }

    #dayCountInMonth(year, month)
    {
        month = month - 1

        if (month < 0)
        {
            return -1;
        }

        if (month < 6)
        {
            return 31;
        }

        if (month < 11)
        {
            return 30;
        }

        let ary = [1, 5, 9, 13, 17, 22, 26, 30];
        let index = year % 33;

        for (let i = 0; i < ary.length; i++)
        {
            if (index === ary[i])
            {
                return 30;
            }
        }

        return 29;
    }


    #jalaliToGregorian(year, month, day)
    {
        let gregorian_year = (year <= 979) ? 621 : 1600;
        year -= (year <= 979) ? 0 : 979;

        let days = (365 * year) +
            (Math.floor(year / 33) * 8) +
            Math.floor((Math.floor(year % 33) + 3) / 4) + 78 + day +
            ((month < 7) ? (month - 1) * 31 : ((month - 7) * 30) + 186);

        gregorian_year += 400 * Math.floor(days / 146097);
        days %= 146097;

        if (days > 36524)
        {
            gregorian_year += 100 * Math.floor(--days / 36524);
            days %= 36524;

            if (days >= 365)
            {
                days++;
            }
        }

        gregorian_year += 4 * Math.floor((days) / 1461);
        days %= 1461;
        gregorian_year += Math.floor((days - 1) / 365);

        if (days > 365)
        {
            days = (days - 1) % 365;
        }

        let gregorian_day = days + 1;
        let day_check = [0, 31, (((gregorian_year % 4 === 0 && gregorian_year % 100 !== 0) || (gregorian_year % 400 === 0)) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let gregorian_month;

        for (gregorian_month = 0; gregorian_month < 13; gregorian_month++)
        {
            let day_count = day_check[gregorian_month];

            if (gregorian_day <= day_count)
            {
                break;
            }

            gregorian_day -= day_count;
        }

        return [gregorian_year, gregorian_month, gregorian_day];
    }

    #jalaliToHijri(year, month, day)
    {
        year += 1595;

        let julian_day =
            1365392 +
            (365 * year) +
            ((~~(year / 33)) * 8) +
            (~~(((year % 33) + 3) / 4)) +
            day +
            ((month < 7) ? (month - 1) * 31 : ((month - 7) * 30) + 186) - 0.5;

        let hijri_year,
            hijri_month,
            hijri_day;

        if (julian_day < this.#hijri_months_days.start_julian_day || julian_day > this.#hijri_months_days.end_julian_day)
        {
            let temp;

            julian_day = ~~(julian_day) + 0.5 + 350823;
            hijri_year = ~~(((30 * (julian_day - 1948439.5)) + 10646) / 10631);

            temp = julian_day - (1948439.5 + ((hijri_year - 1) * 354) + ~~((3 + (11 * hijri_year)) / 30));

            hijri_year -= 990;
            hijri_month = ~~(((temp - 29) / 29.5) + 1.99);

            if (hijri_month > 12)
            {
                hijri_month = 12;
            }

            hijri_day = 1 + temp - ~~((29.5 * (hijri_month - 1)) + 0.5);

            return [hijri_year, hijri_month, hijri_day];
        }

        hijri_day = julian_day - this.#hijri_months_days.start_julian_day + 1;

        for (hijri_year in this.#hijri_months_days.days)
        {
            if (hijri_day > this.#hijri_months_days.days[hijri_year][0])
            {
                hijri_day -= this.#hijri_months_days.days[hijri_year][0];
            }
            else
            {
                for (hijri_month = 1; hijri_month < 13, hijri_day > this.#hijri_months_days.days[hijri_year][hijri_month]; hijri_month++)
                {
                    hijri_day -= this.#hijri_months_days.days[hijri_year][hijri_month];
                }

                break;
            }
        }

        return [+hijri_year, hijri_month, ~~hijri_day];
    }

    #hijriToJulianDay(year, month, day)
    {
        year += 990;

        return (day + ~~((29.5 * (month - 1)) + 0.5) + ((year - 1) * 354) + ~~((3 + (year * 11)) / 30) + 1597615.5);
    }


    persianMonthName(index)
    {
        return this.#persian_month_names[index - 1];
    }

    hijriMonthName(index)
    {
        return this.#hijri_month_names[index - 1];
    }

    gregorianMonthName(index)
    {
        return this.#gregorian_month_names[index - 1];
    }


    async #updateTodayDate()
    {
        let last_date = this.#today;
        let today = new Date()
            .toLocaleDateString('fa-IR-u-nu-latn')
            .split("/")
            .map(item => parseInt(item));

        this.#today = today;
        this.#today_gregorian = this.#jalaliToGregorian(this.#today[0], this.#today[1], this.#today[2]);
        this.#today_hijri = this.#jalaliToHijri(this.#today[0], this.#today[1], this.#today[2]);

        if(last_date !== undefined)
        {
            if(last_date[0] !== today[0] || last_date[1] !== today[1] || last_date[2] !== today[2])
            {
                this.triggerEvent("updateToday");
                this.#initDays();
            }
        }
    }


    getToday()
    {
        return this.#today;
    }

    getSelectedDay()
    {
        return this.#selected;
    }


    #checkLimit(year, month, day)
    {
        const from = this.#option.config.from;
        const to = this.#option.config.to;

        if(from !== undefined)
        {
            if(year < from[0])
            {
                return false;
            }
            
            if(year === from[0] && month < from[1])
            {
                return false;
            }

            if(year === from[0] && month === from[1] && day < from[2])
            {
                return false;
            }
        }

        if(to !== undefined)
        {
            if(year > to[0])
            {
                return false;
            }
            
            if(year === to[0] && month > to[1])
            {
                return false;
            }

            if(year === to[0] && month === to[1] && day > to[2])
            {
                return false;
            }
        }

        return true;
    }


    setYear(year, month = undefined)
    {
        let day_count = this.#dayCountInMonth(year, (month === undefined ? this.#selected[2] : month));

        if(!this.#checkLimit(year, (month === undefined ? this.#selected[2] : month), day_count))
        {
            return;
        }

        this.#selected[0] = year;

        if(month !== undefined)
        {
            this.#selected[1] = month;
        }

        this.#initDays();
    }

    setMonth(month)
    {
        let day_count = this.#dayCountInMonth(this.#selected[1], month);
        
        if(!this.#checkLimit(this.#selected[0], month, day_count))
        {
            return;
        }

        this.#selected[1] = month;

        this.#initDays();
    }


    nextMonth()
    {
        let year = this.#selected[0];
        let month = this.#selected[1];

        if(month === 12)
        {
            year++;
            month = 1;
        }
        else
        {
            month++;
        }

        if(!this.#checkLimit(year, month, 1))
        {
            return this.#selected;
        }

        this.#selected[0] = year;
        this.#selected[1] = month;

        this.#initDays();

        return this.#selected;
    }

    prevMonth()
    {
        let year = this.#selected[0];
        let month = this.#selected[1];

        if(month === 1)
        {
            year--;
            month = 12;
        }
        else
        {
            month--;
        }

        this.#selected[0] = year;
        this.#selected[1] = month;

        this.#initDays();

        return this.#selected;
    }


    nextYear()
    {
        if(!this.#checkLimit(this.#selected[0] + 1, this.#selected[1], 1))
        {
            return this.#selected;
        }

        this.#selected[0]++;

        this.#initDays();

        return this.#selected;
    }

    prevYear()
    {
        let day_count = this.#dayCountInMonth(this.#selected[0] - 1, this.#selected[1]);
        
        if(!this.#checkLimit(this.#selected[0] - 1, this.#selected[1], day_count))
        {
            return this.#selected;
        }

        this.#selected[0]--;
        
        this.#initDays();

        return this.#selected;
    }


    #getSelectedDayWithEvents()
    {
        this.#selected_hijri = this.#jalaliToHijri(this.#selected[0], this.#selected[1], this.#selected[2]);
        this.#selected_gregorian = this.#jalaliToGregorian(this.#selected[0], this.#selected[1], this.#selected[2]);

        let events = this.#getDayEvents(this.#selected, this.#selected_hijri, this.#selected_gregorian);

        let selected_day =
            {
                date: this.#selected,
                hijri_date: this.#selected_hijri,
                gregorian_date: this.#selected_gregorian,

                persian_events: events.persian_events,
                hijri_events: events.hijri_events,
                official_world_events: events.official_world_events,
                unofficial_world_events: events.unofficial_world_events
            };

        return selected_day;
    }


    #getDayInfo(date, is_hijri = false, is_gregorian = false)
    {
        let day_index = this.#dayIndexOfWeek(date[0], date[1], date[2]);

        let month_name = this.persianMonthName(date[1]);
        let day_name = this.#day_names[day_index];

        let content = day_name + " ";

        if(is_hijri === true)
        {
            let hijri_date = this.#jalaliToHijri(date[0], date[1], date[2]);
            content += hijri_date[2] + "ام " + this.hijriMonthName(hijri_date[1]) + " سال " + hijri_date[0] + " هجری قمری ";
        }
        else if(is_gregorian === true)
        {
            let gregorian_date = this.#jalaliToGregorian(date[0], date[1], date[2]);
            content += gregorian_date[2] + "ام " + this.gregorianMonthName(gregorian_date[1]) + " سال " + gregorian_date[0] + " میلادی ";
        }
        else
        {
            content += date[2] + "ام " + month_name + " سال " + date[0] + " شمسی ";
        }

        return content;
    }

    getTodayPersianInfo()
    {
        return this.#getDayInfo(this.#today);
    }

    getSelectedDayPersianInfo()
    {
        return this.#getDayInfo(this.#selected);
    }

    getTodayGregorianInfo()
    {
        return this.#getDayInfo(this.#today, false,  true);
    }

    getSelectedDayGregorianInfo()
    {
        return this.#getDayInfo(this.#selected, false,  true);
    }

    getTodayHijriInfo()
    {
        return this.#getDayInfo(this.#today, true);
    }

    getSelectedDayHijriInfo()
    {
        return this.#getDayInfo(this.#selected, true);
    }


    #getDayEvents(date, hijri_date, gregorian_date)
    {
        let events =
        {
            persian_events: [],
            hijri_events: [],
            official_world_events: [],
            unofficial_world_events: []
        };

        //set persian events
        if(this.#option.config.persianEvent)
        {
            let persian_events = this.#persian_events.find(item => item.date[0] === date[1] && item.date[1] === date[2]);

            if(persian_events !== undefined)
            {
                events.persian_events = persian_events.title;
            }
        }

        //set hijri events
        if(this.#option.config.hijriEvent)
        {
            let hijri_events = this.#hijri_events.find(item => item.date[0] === hijri_date[1] && item.date[1] === hijri_date[2]);

            if(hijri_events !== undefined)
            {
                events.hijri_events = hijri_events.title;
            }
        }

        //set official world events
        if(this.#option.config.officialWorldEvent)
        {
            let official_world_events = this.#official_world_events.find(item => item.date[0] === gregorian_date[1] && item.date[1] === gregorian_date[2]);

            if(official_world_events !== undefined)
            {
                events.official_world_events = official_world_events.title;
            }
        }

        //set unofficial world events
        if(this.#option.config.unofficialWorldEvent)
        {
            let unofficial_world_events = this.#unofficial_world_events.find(item => item.date[0] === gregorian_date[1] && item.date[1] === gregorian_date[2]);

            if(unofficial_world_events !== undefined)
            {
                events.unofficial_world_events = unofficial_world_events.title;
            }
        }

        return events;
    }

    getTodayEvents()
    {
        return this.#getDayEvents(this.#today, this.#today_hijri, this.#today_gregorian);
    }

    getSelectedDayEvents()
    {
        return this.#getDayEvents(this.#selected, this.#selected_hijri, this.#selected_gregorian);
    }
}