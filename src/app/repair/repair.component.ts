import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import * as _ from "lodash";
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { RepairService } from '../services/api/repair.service';
import { Actions } from '../shared/constants/actions';
import { Messages } from '../shared/constants/messages';
import { RepairMachineStatus } from '../shared/constants/repairMachineStatus';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  screenHeight: number = 0;
  screenWidth: number = 0;
  errors: string="";
  isFetchPartSuccess: boolean = false;
  parts: any = [];
  machineRepairCode:string="";
  MatSnackBarHorizontalPosition: MatSnackBarHorizontalPosition ='center';
  matSnachBarVerticalPosition: MatSnackBarVerticalPosition ='top';
  public actions:Actions=new Actions();
  public messages:Messages=new Messages();

  constructor(private repairService:RepairService,
    private snackBar:MatSnackBar,
    private confirmDialog:MatDialog) { }

  ngOnInit(): void {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  fetchMachineParts():any{
    if(_.isEmpty(this.machineRepairCode))
      return this.errors="Please enter a MachineCode";
    
    let body={machineRepairCode:this.machineRepairCode.toUpperCase()};
    
    this.repairService.fetchRepairMachineParts(body).subscribe((res)=>{
      this.isFetchPartSuccess=true;
      this.parts=res.data;
      _.set(body,'status',new RepairMachineStatus().IN_REPAIR);
      this.repairService.changeStatusToInRepair(body).subscribe((res:any)=>{
        console.log(res);
      },(error)=>{
        console.log(error);
      })
    },(error)=>{
      this.isFetchPartSuccess=false;
      console.log(error);
      this.errors =error.error.error;
    });
  }

  submitParts(){
    let repairParts:any[]=[];
    let payload={
      machineRepairCode:this.machineRepairCode,
      repairParts
    };
    for(let part of this.parts){
      if(part.check)
      {
        if(part.quantity > part.maxQuantity && part.quantityRequired)
          return this.openSnackBar(`Max Quantity of ${part.name} cannot be more than ${part.maxQuantity}`,3000);
        payload.repairParts.push({
          name:part.name,
          quantity:part.quantity,
          _id:part._id
        });
      }
    }

    if(_.isEmpty(repairParts))
      return this.openSnackBar('Please select a part before submitting',3000);

    this.confirmDialog.open(ConfirmDialogComponent,{
      data: {
        "action":"submitRepairParts",
        message:"Are you sure you want to submit parts?",
        button:[this.actions.CONFIRM,this.actions.CANCEL]
      },
      width: "320px",
      height: "200px",
      panelClass: "custom-dialog-light"
    }).afterClosed().subscribe((data:any)=>{
      console.log(data);
      if(data.action==this.actions.CONFIRM){
        // this.repairService.submitRepairParts(payload).subscribe((res)=>{
        //   console.log(res);
        //   let message=this.messages.PARTS_SUBMITTED.replace("{{machineRepairCode}}",this.machineRepairCode);
        //   this.openSnackBar(message,7000);
        //   this.ngOnInit();
        //   location.reload();
        // },(error)=>{
        //   console.log(error);
        //   this.openSnackBar(error.error.error,7000);
        // });
        let message=this.messages.PARTS_SUBMITTED.replace("{{machineRepairCode}}",this.machineRepairCode);
          this.openSnackBar(message,3000,()=>{
            this.isFetchPartSuccess = false;
            this.parts= [];
            this.machineRepairCode = "";
            console.log("Reset");
          });
      }
    });
  }

  onInputFocus(){
    this.errors="";
  }

  onSelectPart(part:any){
    part.check=!part.check;
  }

  //Opens SnackBar
  private openSnackBar(message: string, timeout: number,callback:any=null): void {
    this.snackBar.open(message, '', {
      horizontalPosition: this.MatSnackBarHorizontalPosition,
      verticalPosition: this.matSnachBarVerticalPosition,
      panelClass: ['snackbar'],
      duration:timeout
    }).afterDismissed().subscribe(()=>{
      callback();
    });
  }

}
