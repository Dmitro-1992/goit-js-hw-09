// 1. Оголошуємо об'єкт formData з початковими пустими значеннями
const formData = {
  email: '',
  message: '',
};

// 2. Визначаємо ключ для локального сховища
const STORAGE_KEY = 'feedback-form-state';

// 3. Отримуємо посилання на форму
const form = document.querySelector('.feedback-form');

// 4. Завантажуємо збережені дані при відкритті сторінки
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';
    form.email.value = formData.email;
    form.message.value = formData.message;
  } catch (error) {
    console.error('Error parsing saved data:', error);
  }
}

// 5. Додаємо слухача події input для делегування подій
form.addEventListener('input', (event) => {
  const { name, value } = event.target;
  // Оновлюємо відповідне поле у formData
  formData[name] = value.trim(); // trim видаляє пробіли з країв
  // Записуємо formData у localStorage як JSON
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 6. Обробляємо сабміт форми
form.addEventListener('submit', (event) => {
  event.preventDefault(); // зупиняємо стандартну поведінку

  // Перевіряємо, чи всі поля заповнені
  if (!formData.email || !formData.message) {
    alert('Fill please all fields'); // якщо щось пусте, показуємо сповіщення
    return;
  }

  // Якщо всі поля заповнені, виводимо formData в консоль
  console.log(formData);

  // Очищуємо локальне сховище
  localStorage.removeItem(STORAGE_KEY);

  // Очищаємо об'єкт formData
  formData.email = '';
  formData.message = '';

  // Очищаємо поля форми
  form.reset();
});
