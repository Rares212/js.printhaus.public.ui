import { NgModule } from '@angular/core';
import {MeshStore} from "./stores/mesh.store";
import {MeshProcessingService} from "./services/mesh-processing.service";
import { ModelViewerComponent } from './components/model-viewer/model-viewer.component';
import { ModelUploadComponent } from "./components/model-upload/model-upload.component";
import {
  TuiAccordionModule, TuiActionModule,
  TuiCheckboxBlockModule, TuiDataListWrapperModule, TuiFieldErrorPipeModule,
  TuiInputFilesModule,
  TuiInputSliderModule, TuiIslandModule, TuiLineClampModule,
  TuiMarkerIconModule, TuiSelectModule, TuiTagModule
} from "@taiga-ui/kit";
import {
  TuiErrorModule,
  TuiHintModule,
  TuiLabelModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import { TuiIsPresentPipeModule } from "@taiga-ui/cdk";
import { NutCommonModule } from "../common/nut-common.module";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiMoneyModule } from "@taiga-ui/addon-commerce";
import { PrintDetailsComponent } from './components/print-details/print-details.component';



@NgModule({
  declarations: [
    ModelViewerComponent,
    ModelUploadComponent,
    PrintDetailsComponent
  ],
  imports: [
    NutCommonModule,
    TuiHintModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiTagModule,
    TuiTextfieldControllerModule,
    TuiLineClampModule,
    TuiActionModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiMoneyModule,
    TuiLabelModule
  ],
  exports: [
    ModelViewerComponent,
    ModelUploadComponent
  ],
  providers: [
    MeshStore,
    MeshProcessingService
  ]
})
export class ModelViewerModule { }
