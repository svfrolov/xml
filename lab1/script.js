// Глобальные переменные
let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// Функция обновления дисплея
function updateDisplay() {
    const display = document.getElementById('result');
    display.textContent = displayValue;
}

// Функция для ввода цифр
function inputDigit(digit) {
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        // Если на дисплее 0, заменяем его, иначе добавляем цифру
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();
}

// Функция для ввода десятичной точки
function inputDecimal() {
    // Если уже ожидаем второй операнд, начинаем с "0."
    if (waitingForSecondOperand) {
        displayValue = '0.';
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }
    
    // Если точки еще нет, добавляем ее
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

// Обработка операторов
function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);
    
    // Если есть предыдущий оператор и мы ждем второй операнд
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }
    
    // Если это первый операнд
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        // Выполняем вычисление с предыдущим оператором
        const result = performCalculation();
        displayValue = String(result);
        firstOperand = result;
    }
    
    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

// Выполнение вычисления
function performCalculation() {
    const secondOperand = parseFloat(displayValue);
    
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === 'x') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }
    
    return secondOperand;
}

// Сброс калькулятора
function resetCalculator() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

// Изменение знака числа
function changeSign() {
    displayValue = String(-parseFloat(displayValue));
    updateDisplay();
}

// Вычисление процента
function calculatePercentage() {
    displayValue = String(parseFloat(displayValue) / 100);
    updateDisplay();
}

// Функция для кнопки "луна" - расчет времени падения на Луне
function calculateLunarFallTime() {
    const mass = parseFloat(displayValue); // масса в кг (хотя для времени падения масса не важна)
    const height = mass; // интерпретируем введенное число как высоту в метрах
    const lunarGravity = 1.62; // ускорение свободного падения на Луне (м/с²)
    
    // Формула времени падения: t = √(2h/g)
    const fallTime = Math.sqrt((2 * height) / lunarGravity);
    
    // Округляем до 2 знаков после запятой
    displayValue = fallTime.toFixed(2);
    updateDisplay();
}

// Инициализация событий при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Обработчики для цифровых кнопок
    document.getElementById('btn_digit_0').addEventListener('click', () => inputDigit('0'));
    document.getElementById('btn_digit_1').addEventListener('click', () => inputDigit('1'));
    document.getElementById('btn_digit_2').addEventListener('click', () => inputDigit('2'));
    document.getElementById('btn_digit_3').addEventListener('click', () => inputDigit('3'));
    document.getElementById('btn_digit_4').addEventListener('click', () => inputDigit('4'));
    document.getElementById('btn_digit_5').addEventListener('click', () => inputDigit('5'));
    document.getElementById('btn_digit_6').addEventListener('click', () => inputDigit('6'));
    document.getElementById('btn_digit_7').addEventListener('click', () => inputDigit('7'));
    document.getElementById('btn_digit_8').addEventListener('click', () => inputDigit('8'));
    document.getElementById('btn_digit_9').addEventListener('click', () => inputDigit('9'));
    document.getElementById('btn_digit_dot').addEventListener('click', inputDecimal);
    
    // Обработчики для операторов
    document.getElementById('btn_op_plus').addEventListener('click', () => handleOperator('+'));
    document.getElementById('btn_op_minus').addEventListener('click', () => handleOperator('-'));
    document.getElementById('btn_op_mult').addEventListener('click', () => handleOperator('x'));
    document.getElementById('btn_op_div').addEventListener('click', () => handleOperator('/'));
    document.getElementById('btn_op_equal').addEventListener('click', () => {
        if (operator && !waitingForSecondOperand) {
            const result = performCalculation();
            displayValue = String(result);
            firstOperand = result;
            operator = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    });
    
    // Обработчики для специальных функций
    document.getElementById('btn_op_clear').addEventListener('click', resetCalculator);
    document.getElementById('btn_op_sign').addEventListener('click', changeSign);
    document.getElementById('btn_op_percent').addEventListener('click', calculatePercentage);
    
    // Обработчик для кнопки "луна"
    document.getElementById('btn_luna').addEventListener('click', calculateLunarFallTime);
    
    // Инициализация дисплея
    updateDisplay();
});
