import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "stocks" })
export class Stock {
  @PrimaryColumn()
  public name: string = "";
  @Column()
  public price: string = "";
  @Column()
  public date: number = Date.now();
}

export class Stocks {
  [key: string]: Stock;
}
