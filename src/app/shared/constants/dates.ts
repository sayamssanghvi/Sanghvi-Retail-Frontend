export class Dates {

    public DateNames: Map<string, string> = new Map();

    constructor() {
        this.DateNames.set("receivedDate", "Received");
        this.DateNames.set("estimateGivenDate", "Estimate Given");
        this.DateNames.set("inRepairStartDate", "InRepair Start");
        this.DateNames.set("sentToFactoryDate", "Sent To Factory");
        this.DateNames.set("repairedDate", "Repaired");
        this.DateNames.set("deliveryDate", "Delivery");
        this.DateNames.set("canceledDate", "Canceled");
    }
}