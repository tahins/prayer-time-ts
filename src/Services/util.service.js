export default class UtilService {

  static getBaseUrl = () => process.env.PUBLIC_URL;

  static capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

  static pluralize = (count, noun, suffix = 's') => `${count} ${noun}${count !== 1 ? suffix : ''}`;

}
