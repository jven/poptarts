import { Player } from '../player';

export interface TaskObserver {
  notifyShowerComplete(player: Player): void;

  notifyEatPoptart(player: Player): void;
}
