import { Uplink } from './uplink';

export class Device {
    _id : string;
    name : string;
    activateTime : Date;
    devEUI : string;
    uplink : Uplink[];
}
