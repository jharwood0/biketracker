import { Uplink } from './uplink';

export class Device {
    name : string;
    activateTime : Date;
    devEUI : string;
    uplink : Uplink[];
}
