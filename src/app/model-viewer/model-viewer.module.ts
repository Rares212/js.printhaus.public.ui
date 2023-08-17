import { NgModule } from "@angular/core";
import { MeshStore } from "./stores/mesh.store";
import { MeshProcessingService } from "./services/mesh-processing.service";
import { ModelViewerComponent } from "./components/model-viewer/model-viewer.component";
import { ModelUploadComponent } from "./components/model-upload/model-upload.component";
import { NutCommonModule } from "../common/nut-common.module";
import { PrintDetailsComponent } from "./components/print-details/print-details.component";

@NgModule({
    declarations: [
        ModelViewerComponent,
        ModelUploadComponent,
        PrintDetailsComponent
    ],
    imports: [
        NutCommonModule
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
export class ModelViewerModule {
}
