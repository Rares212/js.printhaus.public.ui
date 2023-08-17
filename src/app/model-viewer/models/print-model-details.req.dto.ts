import {PrintSettingsDto, SupportedMeshFileTypes } from "@printnuts/common";
import {
  IsDefined, IsEnum,
  IsMongoId,
  IsNotEmpty,
  ValidateNested
} from "class-validator";

export class PrintModelDetailsReqDto {

  // Encoded using gzip
  @IsDefined()
  compressedMeshFile: any;

  @IsDefined()
  @IsEnum(SupportedMeshFileTypes)
  fileType: SupportedMeshFileTypes;

  @IsNotEmpty()
  @IsMongoId()
  materialId: string;

  @IsDefined()
  @ValidateNested()
  printSettings: PrintSettingsDto;

  public toFormData(): FormData {
    const formData = new FormData();
    formData.append('compressedMeshFile', this.compressedMeshFile);
    formData.append('fileType', this.fileType);
    formData.append('materialId', this.materialId);
    formData.append('printSettings', JSON.stringify(this.printSettings));
    return formData;
  }
}
