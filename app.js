// Технические требования:
// 	Некая сеть фастфудов предлагает два вида гамбургеров:
// 	маленький (50 гривен, 20 калорий)большой (100 гривен, 40 калорий)
//
// Гамбургер должен включать одну дополнительную начинку (обязательно):
// сыр (+ 10 гривен, + 20 калорий)
// салат (+ 20 гривен, + 5 калорий)
// картофель (+ 15 гривен, + 10 калорий)
//
// Дополнительно, в гамбургер можно добавить приправу (+ 15 гривен, 0 калорий) и полить майонезом (+ 20 гривен, + 5 калорий).
// Необходимо написать программу, рассчитывающую стоимость и калорийность гамбургера. Обязательно нужно использовать ООП подход (подсказка: нужен класс Гамбургер, константы, методы для выбора опций и рассчета нужных величин).

const toppingListContainer = document.querySelector('#toppingList');

const renderContainer = document.querySelector('#render');

const allToppingsArr = [
    {
        id: 0,
        title: 'cheese',
        cal: 20,
        price: 10
    },
    {
        id: 1,
        title: 'salat',
        cal: 5,
        price: 20
    },
    {
        id: 2,
        title: 'potato',
        cal: 10,
        price: 15
    },
    {
        id: 3,
        title: 'seasoning',
        cal: 0,
        price: 15
    },
    {
        id: 4,
        title: 'mayonnaise',
        cal: 5,
        price: 20
    },
]

toppingListContainer.innerHTML = `${allToppingsArr.map((topping) => {
    return `<li data-id="${topping.id}" onclick="hamburger.addTopping(event)">${topping.title}</li>`
}).join('')
    }`;

const sizeArr = [
    {
        size: 'small',
        price: 50,
        cal: 20
    },
    {
        size: 'large',
        price: 100,
        cal: 40
    },
]

class Hamburger {
    constructor() {
        this.size = null
        this.totalPrice = 0
        this.cal = 0
        this.toppingsArr = []
    }

    setSize(size) {
        this.size = size;
        const sizeObject = size === 'small' ? sizeArr[0] : sizeArr[1];
        this.cal += sizeObject.cal;
        this.totalPrice += sizeObject.price;
        this.size = size;
        this.render();
    }

    addTopping(event) {
        const id = +event.target.dataset.id;
        const currentTopping = allToppingsArr.filter((topping) => {
            return topping.id === id;
        })[0];
        this.toppingsArr.push(currentTopping);
        this.cal += currentTopping.cal;
        this.totalPrice += currentTopping.price;
        this.render()
    }

    render() {
        renderContainer.innerHTML = '';
        renderContainer.innerHTML =
            `<ul>
                <li>
                    size: ${this.size};
                </li>
                <li>
                    price: ${this.totalPrice};
                </li>
                <li>
                    cal: ${this.cal};
                </li>
                <li>
                    ${this.toppingsArr.map((topping) => topping?.title).join(', ')}
                </li>
            </ul>`
    }

    getInfo() {
        if (!this.size) return alert('Choose size first!');
        alert(`size: ${this.size}, price: ${this.totalPrice}, cal: ${this.cal}, toppings: ${this.toppingsArr.join(', ')} `);
    }
}

const hamburger = new Hamburger();