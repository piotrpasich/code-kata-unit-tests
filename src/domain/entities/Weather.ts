export class Weather {
  constructor(
    public readonly location: string,
    public readonly temperature: number,
    public readonly humidity: number,
    public readonly description: string
  ) {}
}
