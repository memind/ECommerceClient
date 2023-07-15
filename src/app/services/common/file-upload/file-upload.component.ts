import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  AlertifyService,
  MessagePosition,
  MessageType,
} from '../../admin/alertify.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../ui/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import {
  FileUploadDialogComponent,
  FileUploadDialogState,
} from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerName } from 'src/app/base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private alertify: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) {}

  public files: NgxFileDropEntry[] = [];
  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerName.BallAtom)
        this.httpClientService
          .post(
            {
              controller: this.options.controller,
              action: this.options.action,
              queryString: this.options.queryString,
              headers: new HttpHeaders({ responseType: 'blob' }),
            },
            fileData
          )
          .subscribe(
            (data) => {
              const message: string = 'Files are uploaded successfuly!';
              
              this.spinner.hide(SpinnerName.BallAtom)
  
              if (this.options.isAdminPage) {
                this.alertify.message(message, {
                  dismissOthers: true,
                  messageType: MessageType.Success,
                  position: MessagePosition.TopRight,
                });
              } else {
                this.customToastrService.message(message, 'Upload', {
                  messageType: ToastrMessageType.Success,
                  position: ToastrPosition.TopRight,
                })
              }
            },
            (errorResponse: HttpErrorResponse) => {
              const message: string = 'An error occured!';

              this.spinner.hide(SpinnerName.BallAtom)
  
              if (this.options.isAdminPage) {
                this.alertify.message(message, {
                  dismissOthers: true,
                  messageType: MessageType.Error,
                  position: MessagePosition.TopRight,
                });
              } else {
                this.customToastrService.message(message, 'Upload', {
                  messageType: ToastrMessageType.Error,
                  position: ToastrPosition.TopRight,
                })
              }
            }
          );
      }
    });
  }
  // openDialog(afterClose: any): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     width: '250px',
  //     data: FileUploadDialogState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result == FileUploadDialogState.Yes) {
  //       afterClose();
  //     }
  //   });
  // }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
