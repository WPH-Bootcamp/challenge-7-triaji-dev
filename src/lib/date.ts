import dayjs from 'dayjs';
import 'dayjs/locale/id';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('id');
dayjs.extend(relativeTime);

export const formatDate = (date: string | Date, format = 'DD MMMM YYYY'): string => {
  return dayjs(date).format(format);
};

export const formatTime = (date: string | Date, format = 'HH:mm'): string => {
  return dayjs(date).format(format);
};

export const fromNow = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

export default dayjs;
