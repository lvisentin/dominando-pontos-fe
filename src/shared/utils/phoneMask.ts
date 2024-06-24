import metadata from 'libphonenumber-js/min/metadata';
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';

export const phoneMask = maskitoPhoneOptionsGenerator({ countryIsoCode: 'BR', metadata });