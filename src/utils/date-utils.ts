import { format, formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formatDate(date: Date): string {
  return format(date, 'dd LLL yyyy', {
    locale: ptBR,
  });
}

export function since(date: Date): string {
  return formatDistance(new Date(), date, {
    addSuffix: true,
    locale: ptBR,
  });
}
