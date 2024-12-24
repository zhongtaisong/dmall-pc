import mitt from 'mitt';

export interface IEventBus {
  onLanguageChange: IObject;
}

// @ts-ignore
export const eventBus = mitt<IEventBus>();
