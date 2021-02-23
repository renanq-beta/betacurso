import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
class Users{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  rules: string;

  @Column()
  created_at: Date;

  @Column()
  password: string;

  @Column()
  actived: string;

  @Column()
  password_recovery: string;
}

export default Users;