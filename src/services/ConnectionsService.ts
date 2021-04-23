import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate{
  admin_id?: string,
  user_id: string,
  socket_id: string,
  id?: string,
}

class ConnectionsService {
  private connectionsService: Repository<Connection>

  constructor(){
    this.connectionsService = getCustomRepository(ConnectionsRepository);
  }

  async create({ admin_id, user_id, socket_id, id } : IConnectionCreate){
    const connection = this.connectionsService.create({
      admin_id,
      user_id,
      socket_id,
      id,
    })

    await this.connectionsService.save(connection);

    return connection;
  }

  async findByUserId( user_id: string ){
    const connection = this.connectionsService.findOne({
      user_id,
    })

    return connection;
  }
}

export { ConnectionsService };