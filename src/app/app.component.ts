import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'robobank';
  json_data=[];
  
  constructor(private papa: Papa) {
  }
  public changeListener(files: FileList) {
    if (files && files.length > 0) {
      let file: File = files.item(0);
      console.log(file.type)
      if (file.type === "text/csv" || file.type==="application/vnd.ms-excel") {
        
        let reader: FileReader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
          let csv: any = reader.result;
   
          this.papa.parse(csv, {
            skipEmptyLines: true,
            header: true,
            complete: (results) => {
              for (let i = 0; i < results.data.length; i++) {
                let orderDetails = {
                  First_name: results.data[i]['First name'],
                  sur_name: results.data[i]['Sur name'],
                  issue_count: results.data[i]['Issue count'],
                  Date_of_birth: results.data[i]['Date of birth']
                };
                this.json_data.push(orderDetails);
              }
              console.log(this.json_data);
              console.log('Parsed: k', results.data);
            }
          });
        }
      } else {
        alert("CSV files only allowed")
      }
      //    console.log(file.name);
      //    console.log(file.size);
      //    console.log(file.type);
      //   
    }
  }
}
