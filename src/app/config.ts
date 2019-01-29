export class Config {
   static baseUrl = 'https://www.xinrong.com';
   static url(original: string): string {
      return Config.baseUrl + original;
   }
}
