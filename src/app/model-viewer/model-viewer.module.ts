import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MeshStore} from "./stores/mesh.store";
import {MeshProcessingService} from "./services/mesh-processing.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    MeshStore,
    MeshProcessingService
  ]
})
export class ModelViewerModule { }
