export class StringUtils {

  static camelToKebabCase(text: string): string {
    return text.replace(/[A-Z]/g, (letter: string) => `-${letter.toLowerCase()}`);
  }
  
}
