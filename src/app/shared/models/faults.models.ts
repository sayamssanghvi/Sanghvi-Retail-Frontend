export class FaultsRR {
    public faults: Map<string, Boolean>;

    constructor() {
        let fault = ["Full Check", "Wirecord", "T/Handle", "B/Handle", "R/G Bulb", "LampBox", "LampBox Set", "Shock", "Check Heat", "Broken Plate", "Rivit", "Check Alignment", "T/Coating", "B/Coating"];
        let map = new Map<string, any>();
        for (let i = 0; i < fault.length; i++) {

            map.set(fault[i], false);
        }
        this.faults = map;
    }
}