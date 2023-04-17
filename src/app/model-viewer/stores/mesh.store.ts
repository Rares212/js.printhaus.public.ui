import { Injectable } from '@angular/core';
import {TuiFileLike} from "@taiga-ui/kit";
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  finalize,
  from,
  Observable,
  of,
  Subject,
  switchMap,
  tap
} from "rxjs";
import {isNonNull} from "../../common/util/common.util";
import {Mesh} from "three";
import {MeshProcessingService} from "../services/mesh-processing.service";

@Injectable({
  providedIn: 'root'
})
export class MeshStore {

  private _meshFile: BehaviorSubject<TuiFileLike | null> = new BehaviorSubject<TuiFileLike | null>(null);
  private readonly $meshFile: Observable<TuiFileLike | null> = this._meshFile.asObservable().pipe(
    distinctUntilChanged()
  );
  private readonly $loadingMeshFile: Subject<TuiFileLike | null> = new Subject<TuiFileLike | null>();
  private readonly $mesh: Observable<Mesh | null> = this.$meshFile.pipe(
    switchMap(file => {
      if (!file) {
        return of(null);
      }

      this.$loadingMeshFile.next(file);
      return this.meshProcessingService.parseFile(file).pipe(
        finalize(() => this.$loadingMeshFile.next(null)),
        tap(mesh => console.log(mesh))
      );
    })
  );

  public setFile(file: TuiFileLike | null): void {
    this._meshFile.next(file)
  }

  public getLoadingFileAsObservable(): Observable<TuiFileLike | null> {
    return this.$loadingMeshFile.asObservable();
  }

  public getFileAsObservable(): Observable<TuiFileLike | null> {
    return this.$meshFile;
  }

  public getMeshAsObservable(): Observable<Mesh | null> {
    return this.$mesh;
  }

  constructor(private meshProcessingService: MeshProcessingService) {

  }
}
