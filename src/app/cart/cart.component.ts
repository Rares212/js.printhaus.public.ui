import { Component } from '@angular/core';
import { tuiInputNumberOptionsProvider } from "@taiga-ui/kit";

@Component({
  selector: 'haus-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
    providers: [
        tuiInputNumberOptionsProvider({
            decimal: 'never',
            step: 1,
        }),
    ],
})
export class CartComponent {

}
