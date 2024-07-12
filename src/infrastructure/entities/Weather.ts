import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Weather {
  constructor(date: Date, location: string, temperature: number, humidity: number, description: string | null = null) {
    this.date = date;
    this.location = location;
    this.temperature = temperature;
    this.humidity = humidity;
    this.description = description;
  }

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @Column()
  temperature: number;

  @Column()
  humidity: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}
