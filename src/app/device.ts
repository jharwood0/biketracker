import { Uplink } from './uplink';

export class Device {
    _id : string;
    name : string;
    activateTime : Date;
    userId: string;
    devEUI : string;
    uplink : Uplink[];
}
