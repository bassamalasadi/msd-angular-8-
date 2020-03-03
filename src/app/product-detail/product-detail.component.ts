import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../api.service";
import { Product } from "../product";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
  product: Product = {
    _id: "",
    prod_name: "",
    prod_desc: "",
    prod_price: null,
    updated_at: null
  };
  isLoadingResults = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProductDetails(this.route.snapshot.params["_id"]);
  }

  getProductDetails(_id: any) {
    this.api.getProduct(_id).subscribe((data: any) => {
      this.product = data;
      console.log(this.product);
      this.isLoadingResults = false;
    });
  }

  deleteProduct(_id: any) {
    this.isLoadingResults = true;
    this.api.deleteProduct(_id).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(["/products"]);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
