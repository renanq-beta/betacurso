import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
class Courses{

  @PrimaryColumn()
  id: string;
  
  @Column()
  name: string;
  
  @Column()
  description: string;
  
  @Column()
  views: number;
  
  @Column()
  video: string;
  
  @Column()
  duration: string;
  
  @Column()
  created_at: Date;

}

export default Courses;