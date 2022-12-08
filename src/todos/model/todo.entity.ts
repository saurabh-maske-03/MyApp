import { UserEntity } from '../../users/model/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class TodoEntity {
    [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  completed: boolean;
  
  
public laserMode: boolean;

  //many tods can belongs to single user

  @ManyToOne(()=>UserEntity,(user)=>user.todos)
  user:UserEntity;
    
}
