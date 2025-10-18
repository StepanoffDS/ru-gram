import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import 'dayjs/locale/ru';

// Подключаем плагин для относительного времени
dayjs.extend(relativeTime);

// Устанавливаем русскую локаль
dayjs.locale('ru');

/**
 * Форматирует время в красивый относительный формат
 * @param date - дата для форматирования
 * @returns отформатированная строка времени
 */
export function formatTimeAgo(date: string | Date): string {
  const now = dayjs();
  const postDate = dayjs(date);
  const diffInMinutes = now.diff(postDate, 'minute');
  const diffInHours = now.diff(postDate, 'hour');
  const diffInDays = now.diff(postDate, 'day');

  return getTimeAgoText(diffInMinutes, diffInHours, diffInDays, postDate);
}

/**
 * Возвращает текст для отображения времени
 */
function getTimeAgoText(
  diffInMinutes: number,
  diffInHours: number,
  diffInDays: number,
  postDate: dayjs.Dayjs,
): string {
  if (diffInMinutes < 1) return 'Только что';
  if (diffInMinutes < 60) return formatMinutes(diffInMinutes);
  if (diffInHours < 24) return formatHours(diffInHours);
  if (diffInDays < 7) return formatDays(diffInDays);

  return postDate.format('DD.MM.YYYY');
}

/**
 * Форматирует минуты
 */
function formatMinutes(minutes: number): string {
  if (minutes === 1) return 'Минуту назад';
  if (minutes < 5) return `${minutes} минуты назад`;
  return `${minutes} минут назад`;
}

/**
 * Форматирует часы
 */
function formatHours(hours: number): string {
  if (hours === 1) return 'Час назад';
  if (hours < 5) return `${hours} часа назад`;
  return `${hours} часов назад`;
}

/**
 * Форматирует дни
 */
function formatDays(days: number): string {
  if (days === 1) return 'Вчера';
  if (days < 5) return `${days} дня назад`;
  return `${days} дней назад`;
}
