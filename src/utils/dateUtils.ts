
import { News } from "../typings/models/news";

/**
 * Сортирует массив новостей по убыванию даты публикации.
 * Принимает массив объектов News.Docs и возвращает отсортированный массив.
 */
export const sortNewsByDate = (articles: News.Docs[]): News.Docs[] => {
  return articles.sort(
    (a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime()
  );
};

/**
 * Вычисляет предыдущий месяц.
 * Если текущий месяц равен 1, то возвращает декабрь предыдущего года.
 */
export const getPreviousMonth = (currentYear: number, currentMonth: number): { year: number; month: number } => {
  let newMonth = currentMonth - 1;
  let newYear = currentYear;
  if (newMonth < 1) {
    newMonth = 12;
    newYear--;
  }
  return { year: newYear, month: newMonth };
};

/**
 * Преобразует строковое представление даты в объект Date.
 */
export const parseDate = (dateStr: string): Date => {
  return new Date(dateStr);
};


export const groupNewsByDate = (
  news: News.Docs[]
): Record<string, News.Docs[]> => {
  return news.reduce(
    (acc, article) => {
      const date = new Date(article.pub_date).toDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(article);
      return acc;
    },
    {} as Record<string, News.Docs[]>
  );
};



export function formatDate(isoString: string | Date): string {
  // Парсим входную строку в объект Date
  const date = new Date(isoString);
  
  // Проверяем, валидна ли дата
  if (isNaN(date.getTime())) {
    throw new Error("Неверный формат строки даты");
  }

  // Массив с сокращёнными названиями месяцев
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Извлекаем компоненты даты
  const monthName = months[date.getMonth()]; // Название месяца
  const day = date.getDate(); // День
  const year = date.getFullYear(); // Год
  let hours = date.getHours(); // Часы
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Минуты (двухзначные)

  // Преобразуем часы в 12-часовой формат с AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Если 0, то 12
  const formattedHours = hours.toString().padStart(2, "0");

  // Собираем итоговую строку
  return `${monthName} ${day}, ${year}, ${formattedHours}:${minutes} ${ampm}`;
}