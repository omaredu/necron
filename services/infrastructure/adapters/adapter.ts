import Entity from "@services/domain/entities/entity";

export type EntityFields = keyof Entity;

abstract class Adapter<T extends Entity> {
  abstract adapt(item: unknown): Omit<T, EntityFields>;

  adaptBaseEntity(item: unknown): Entity {
    const { id, createdAt, updatedAt } = item as any;

    return {
      id,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
    };
  }

  perform(item: unknown): T {
    const entity = this.adapt(item);
    const baseEntity = this.adaptBaseEntity(item);

    return { ...entity, ...baseEntity } as T;
  }
}

export default Adapter;
