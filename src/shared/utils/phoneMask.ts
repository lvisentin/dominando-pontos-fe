import metadata from 'libphonenumber-js/min/metadata';
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';

export const phoneMask = maskitoPhoneOptionsGenerator({ countryIsoCode: 'BR', metadata });

export const cleanPhone = (phone: string): string => {
  return phone.replace("+", "").replace("-", "").replace(" ", "").replace(/\s+/g,'');
}