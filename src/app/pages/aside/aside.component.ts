import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  /*   @Output() filhoPpai = new EventEmitter() */

  @Input() qdtCard = 0

  constructor() { }

  ngOnInit(): void {
  }


  /*  somar(){
     this.filhoPpai.emit('2')
   } */

}
