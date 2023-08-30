import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/utility/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { RepairService } from '../services/api/repair.service';
import { ListingComponent } from '../dialogs/listing/listing.component';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  public REPAIRED_TODAY: string = 'repaired_today';
  public REPAIRED: string = 'repaired';
  public isAdmin: boolean = false;
  constructor(
    private router: Router,
    private snackBarService: SnackBarService,
    private listingDialog: MatDialog,
    private repairService: RepairService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.adminService.adminRole == 'admin';
  }

  logout(): void {
    this.router.navigate(['login']);
  }

  viewMachines(status: string): void {
    let queryParams: any = {
      status,
    };

    if (status == this.REPAIRED_TODAY) {
      queryParams.status = this.REPAIRED;
      queryParams.isRepairedToday = true;
    }

    this.repairService
      .fetchAllRepairMachines({ queryParams })
      .subscribe((data) => {
        let finalData: any = [];
        data.data.forEach((value: any) => {
          finalData.push(value.machineRepairCode + ' - ' + value.customer);
        });

        this.listingDialog.open(ListingComponent, {
          data: {
            heading: status.toUpperCase(),
            list: finalData,
          },
          width: '320px',
          height: '700px',
          panelClass: 'custom-mat-dailog',
        });
      });
  }
}
