import Region from './region';
import Interval from './interval';

let regions: Region[] = [
    new Region("Благоевград", new Interval(0, 43)),
    new Region("Бургас", new Interval(44, 93)),
    new Region("Варна", new Interval(94, 139)),
    new Region("Велико Търново", new Interval(140, 169)),
    new Region("Видин", new Interval(170, 183)),
    new Region("Враца", new Interval(184, 217)),
    new Region("Габрово", new Interval(218, 233)),
    new Region("Кърджали", new Interval(234, 281)),
    new Region("Кюстендил", new Interval(282, 301)),
    new Region("Ловеч", new Interval(302, 319)),
    new Region("Монтана", new Interval(320, 341)),
    new Region("Пазарджик", new Interval(342, 377)),
    new Region("Перник", new Interval(378, 395)),
    new Region("Плевен", new Interval(396, 435)),
    new Region("Пловдив", new Interval(436, 501)),
    new Region("Разград", new Interval(502, 527)),
    new Region("Русе", new Interval(528, 555)),
    new Region("Силистра", new Interval(556, 575)),
    new Region("Сливен", new Interval(576, 601)),
    new Region("Смолян", new Interval(602, 623)),
    new Region("София – град", new Interval(624, 721)),
    new Region("София – окръг", new Interval(722, 751)),
    new Region("Стара Загора", new Interval(752, 789)),
    new Region("Добрич (Толбухин)", new Interval(790, 821)),
    new Region("Търговище", new Interval(822, 843)),
    new Region("Хасково", new Interval(844, 871)),
    new Region("Шумен", new Interval(872, 903)),
    new Region("Ямбол", new Interval(904, 925)),
    new Region("Друг/Неизвестен", new Interval(926, 999)),

]

export default regions;