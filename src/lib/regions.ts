import Region from './region';
import Range from './range';

let regions: Region[] = [
    new Region("Благоевград", new Range(0, 43)),
    new Region("Бургас", new Range(44, 93)),
    new Region("Варна", new Range(94, 139)),
    new Region("Велико Търново", new Range(140, 169)),
    new Region("Видин", new Range(170, 183)),
    new Region("Враца", new Range(184, 217)),
    new Region("Габрово", new Range(218, 233)),
    new Region("Кърджали", new Range(234, 281)),
    new Region("Кюстендил", new Range(282, 301)),
    new Region("Ловеч", new Range(302, 319)),
    new Region("Монтана", new Range(320, 341)),
    new Region("Пазарджик", new Range(342, 377)),
    new Region("Перник", new Range(378, 395)),
    new Region("Плевен", new Range(396, 435)),
    new Region("Пловдив", new Range(436, 501)),
    new Region("Разград", new Range(502, 527)),
    new Region("Русе", new Range(528, 555)),
    new Region("Силистра", new Range(556, 575)),
    new Region("Сливен", new Range(576, 601)),
    new Region("Смолян", new Range(602, 623)),
    new Region("София – град", new Range(624, 721)),
    new Region("София – окръг", new Range(722, 751)),
    new Region("Стара Загора", new Range(752, 789)),
    new Region("Добрич (Толбухин)", new Range(790, 821)),
    new Region("Търговище", new Range(822, 843)),
    new Region("Хасково", new Range(844, 871)),
    new Region("Шумен", new Range(872, 903)),
    new Region("Ямбол", new Range(904, 925)),
    new Region("Друг/Неизвестен", new Range(926, 999)),

]

export default regions;