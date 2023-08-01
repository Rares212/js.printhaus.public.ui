import { NgModule } from '@angular/core';
import {MeshStore} from "./stores/mesh.store";
import {MeshProcessingService} from "./services/mesh-processing.service";
import { ModelViewerComponent } from './components/model-viewer/model-viewer.component';
import { ModelUploadComponent } from "./components/model-upload/model-upload.component";
import {
  TuiAccordionModule,
  TuiCheckboxBlockModule,
  TuiInputFilesModule,
  TuiInputSliderModule, TuiIslandModule,
  TuiMarkerIconModule
} from "@taiga-ui/kit";
import { TuiHintModule, TuiLoaderModule } from "@taiga-ui/core";
import { TuiIsPresentPipeModule } from "@taiga-ui/cdk";
import { NutCommonModule } from "../common/nut-common.module";
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    ModelViewerComponent,
    ModelUploadComponent
  ],
  imports: [
    NutCommonModule,
    TuiHintModule
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
