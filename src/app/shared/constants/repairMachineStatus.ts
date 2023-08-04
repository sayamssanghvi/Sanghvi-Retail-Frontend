export class RepairMachineStatus {
    public RECEIVED: string = 'RECEIVED';
    public AWAITING_RESPONSE: string = 'AWAITING RESPONSE';
    public IN_REPAIR: string = 'IN REPAIR';
    public IN_FACTORY: string = 'IN FACTORY';
    public REPAIRED: string = 'REPAIRED';
    public DELIVERED: string = 'DELIVERED';
    public CANCELED: string = 'CANCELED';
    public ESTIMATE_SUBMITTED: string = "ESTIMATE SUBMITTED";
    public ESTIMATE_APPROVED: string = "ESTIMATE APPROVED";

    repairMachineStatusList: string[] = [this.RECEIVED, this.AWAITING_RESPONSE, this.IN_REPAIR, this.IN_FACTORY, this.REPAIRED, this.DELIVERED, this.CANCELED];
}