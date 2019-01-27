import { Location } from '../location';
import { Player } from '../player';
import { TaskObserver } from '../tasks/taskobserver';
import { Item } from './item';

export interface ItemStateMachine {
    move(location: Location): void;
    update(timeDelta: number): void;
    interact(player: Player): void;
    getLocation(): Location;
}

enum SHOWER_STATES {
    SHOWER_OFF = 'shower_off',
    SHOWER_IN_USE = 'shower_in_user'
}

export class Shower implements ItemStateMachine {
    private state: SHOWER_STATES;
    private item: Item;
    private taskObserver: TaskObserver;
    private showerDuration: number;
    private lastPlayerToUseShower: Player | null;

    constructor(item: Item, taskObserver: TaskObserver) {
        this.state = SHOWER_STATES.SHOWER_OFF;
        this.item = item;
        this.taskObserver = taskObserver;
        this.showerDuration = 0;
        this.lastPlayerToUseShower = null;
    }

    move(location: Location): void {}

    update(timeDelta: number): void {
        if (this.state === SHOWER_STATES.SHOWER_IN_USE) {
            this.showerDuration += timeDelta;
            if (this.showerDuration > 3000) {
                this.taskObserver.notifyShowerComplete(
                    this.lastPlayerToUseShower!);
            }
        }
    }

    interact(player: Player): void {
        if (player.item === null
            && this.state === SHOWER_STATES.SHOWER_OFF) {
                this.lastPlayerToUseShower = player;
                player.immobilize();
                player.item = this;
                this.state = SHOWER_STATES.SHOWER_IN_USE;
                console.log('shower on');
        } else {
            if (player.item === this) {
                player.mobilize();
                player.item = null;
                this.state = SHOWER_STATES.SHOWER_OFF;
                this.showerDuration = 0;
                console.log(SHOWER_STATES.SHOWER_OFF);
            }
        }
    }

    getLocation(): Location {
        return this.item.getLocation();
    }
}

enum COOKABLE_STATE {
    NOT_HEATING = 'not_cooking',
    COOKED = 'cooked',
    OVER_COOKED = 'over_cooked'
}

export class Cookable implements ItemStateMachine {
    private state: COOKABLE_STATE;
    public cookTime: number;
    public ignitionTime: number;
    private item: Item;
    private taskObserver: TaskObserver;
    private wasEaten: boolean;

    constructor(cookTime: number,
        ignitionTime: number,
        item: Item,
        taskObserver: TaskObserver) {
        this.state = COOKABLE_STATE.NOT_HEATING;
        this.cookTime = cookTime;
        this.ignitionTime = ignitionTime;
        this.item = item;
        this.taskObserver = taskObserver;
        this.wasEaten = false;
    }

    isEaten() {
        return this.wasEaten;
    }

    cooked() {
        this.state = COOKABLE_STATE.COOKED;
    }

    ignite() {
        this.state = COOKABLE_STATE.OVER_COOKED;
    }

    eat() {
        this.wasEaten = true;
        this.item.destroy();
    }

    move(location: Location) {
        this.item.move(location);
    }

    update(timeDelta: number) {}

    interact(player: Player): void {
        if (player.item === null) {
            if (this.state === COOKABLE_STATE.COOKED) {
                this.taskObserver.notifyEatPoptart(player);
                this.item.destroy();
                console.log('Player ate food');
            } else if (this.state === COOKABLE_STATE.OVER_COOKED) {
                console.log('player looks sadly at charred remains of \
                poptart');
            } else if (this.state === COOKABLE_STATE.NOT_HEATING) {
                console.log('Player picked up food');
                player.item = this;
            }
        } else if (player.item === this) {
            console.log('Player dropped food');
            player.item = null;
        }
    }

    getLocation() {
        return this.item.getLocation();
    }
}

enum COOK_STATE {
    NOT_COOKING = 'not_cooking',
    COOKING = 'cooking',
    IGNITED = 'ignited',
}

export class Cookware implements ItemStateMachine {
    private state: COOK_STATE;
    private timeCooking: number;
    private cookingItem: Cookable | null;
    private item: Item;

    constructor(item: Item) {
        this.state = COOK_STATE.NOT_COOKING;
        this.timeCooking = 0;
        this.cookingItem = null;
        this.item = item;
    }

    update(timeDelta: number) {
        if (this.cookingItem !== null && this.cookingItem.isEaten()) {
            this.cookingItem = null;
            this.state = COOK_STATE.NOT_COOKING;
        }

        switch (this.state) {
            case COOK_STATE.NOT_COOKING: {
                this.timeCooking = 0;
                return;
            }
            case COOK_STATE.IGNITED: {
                return;
            }
            case COOK_STATE.COOKING: {
                this.timeCooking += timeDelta;
                const cookItem = this.cookingItem!;
                if (this.timeCooking > cookItem.ignitionTime) {
                    console.log('fire');
                    cookItem.ignite();
                    this.state = COOK_STATE.IGNITED;
                } else if (this.timeCooking > cookItem.cookTime) {
                    console.log('cooked');
                    cookItem.cooked();
                }
                return;
            }
        }
    }

    move(location: Location) {}

    getLocation() {
        return this.item.getLocation();
    }

    interact(player: Player): void {
        if (this.cookingItem === null) {
            if (player.item instanceof Cookable) {
                this.cookingItem = player.item;
                player.item = null;
                this.state = COOK_STATE.COOKING;
                console.log('cooking food');
            }
        } else {
            this.cookingItem.interact(player);

            this.cookingItem = null;
            this.state = COOK_STATE.NOT_COOKING;
            console.log('item removed from toaster');
        }
    }
}
