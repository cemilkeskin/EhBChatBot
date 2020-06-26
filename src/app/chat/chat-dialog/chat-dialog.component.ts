import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/scan';
import { scan } from 'rxjs/operators';
import { TemplateRef, ViewChild, AfterViewInit, Inject, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { OpleidingenComponent } from '../../opleidingen/opleidingen.component';


  
@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  changeText:boolean=false;
  changeTextInschrijven:boolean=false; 
  changeTextButton:boolean=false; 
  isShow = true;
  isShowTags = true;
  isShowOpleiding = true;
  isShowOpleidingMultec = true;
  isShowOpleidingDigx = true;
  now: string;
  dataSource = [];
  counter: number = 0;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  toggleDisplayTags() {
    this.isShowTags = !this.isShowTags;
  }
  toggleOpleiding() { 
    this.isShowOpleiding = !this.isShowOpleiding;
  }
  toggleOpleidingMultec() { 
    this.isShowOpleidingMultec = !this.isShowOpleidingMultec;
   
  }
  toggleOpleidingDigx() {  
    this.isShowOpleidingDigx = !this.isShowOpleidingDigx;

  }


 
  appendOpleidingen() {
    this.counter++;
    console.log(this.counter);
 }

  messages: Observable<Message[]>;
  formValue: string;
  btnValue: string;

  @ViewChild('appenHere',{read : ViewContainerRef}) target: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  
  constructor(private chat: ChatService, private resolver: ComponentFactoryResolver) {

    setInterval(() => {
      this.now = new Date().toString().split(' ')[4];
    });

   }
   
   addNewComponent() { 
    let childComponent = this.resolver.resolveComponentFactory(OpleidingenComponent);
    this.componentRef = this.target.createComponent(childComponent); // <-- here it's throws an error!
    console.log(this.componentRef);
  }   

  showOpleidingen(){

  }

  ngOnInit(): void { 

    // this.messages = this.chat.conversation.asObservable().pipe()
    //     .scan((acc, val) => acc.concat(val));
    
    this.messages = this.chat.conversation.asObservable().pipe(scan((acc,val)=>acc.concat(val)));
    
    // this.messages.subscribe(res => {
    //     let temp = [];
    //     res.forEach(message => {
    //       message.content = JSON.parse(message.content);
    //       temp.push(message);
    //     });
    //     this.resultaten = temp;
    //     console.log(res);
    //     console.log(this.resultaten);
    // });
    // this.chat.conversation.subscribe(res => this.messages = JSON.parse(res.['content'])); 

  }

    sendMessage() {
      if(this.formValue != undefined && this.formValue != ""){
        this.chat.converse(this.formValue, this.btnValue);
        this.formValue = '';
        this.btnValue = '';
        console.log(this.formValue);
      }
      else{

      }
     
    }

    sendMessageButton(value: any) {
      console.log(value);
      this.formValue = '';
      this.btnValue = value; 
      this.chat.converse(this.btnValue, this.formValue );
    }
}
