class IncomingPart{
    public part: object;
    public quantity: number;
    public _id: any;
}

class Part{

    public partName: string;
    public quantity: number;
    public quantityRequired: boolean;
    public maxQuantity: number;
    public price: number;
    public machineName: string;

    constructor(indiPart: any) {
        this.partName = indiPart.part.name;
        this.machineName = indiPart.part.machineName;
        this.quantity = indiPart.quantity;
        this.maxQuantity = indiPart.part.maxQuantity;
        this.price = indiPart.part.price;
        this.quantityRequired = indiPart.part.quantityRequired;
    }
}


export class Parts{
    public parts: Part[]=[];

    constructor(obj: IncomingPart[]) {
        for (let value of obj) {
            this.parts.push(new Part(value));
        }
    }
}