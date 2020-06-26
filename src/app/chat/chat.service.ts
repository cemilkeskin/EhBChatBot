import {
  Injectable
} from '@angular/core';
import {
  environment
} from '../../environments/environment';

import {
  ApiAiClient
} from 'api-ai-javascript/es6/ApiAiClient';

import {
  Observable
} from 'rxjs/Observable';
import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';




export class Message {
  constructor(public content: string, public button: any, public sentBy: string) {}
}

@Pipe({ name: 'safe' })

@Injectable({
  providedIn: 'root'
})


export class ChatService implements PipeTransform {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({
    accessToken: this.token
  });

  

  conversation = new BehaviorSubject < Message[] > ([]);

  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  converse(msg: string, btn: string) {
    const userMessage = new Message(msg, btn, 'user');
    this.update(userMessage);

    return this.client.textRequest(msg)
      .then(res => {



        let buttons = [];
        let buttonsValue = {};

        for (let i = 0; i < res.result.fulfillment.messages.length; i++) {
          // const button = messages[i];
          if (res.result.fulfillment.messages[i].payload != undefined) {
            for (let j = 0; j < res.result.fulfillment.messages[i].payload.richContent.length; j++) {

              for (let k = 0; k < res.result.fulfillment.messages[i].payload.richContent[j].length; k++) {

                console.log(res.result.fulfillment.messages[i].payload.richContent[j][k].text);
                let buttonValue = res.result.fulfillment.messages[i].payload.richContent[j][k].text;
                let buttonLink;

                if (res.result.fulfillment.messages[i].payload.richContent[j][k].link != "") { 
                  buttonLink = res.result.fulfillment.messages[i].payload.richContent[j][k].link;
        
                  buttonsValue = {
                    text: buttonValue,
                    link: buttonLink 
                  }

                } else {
                  buttonsValue = {
                    text: buttonValue,
                    link: buttonLink  
                  }
                }
                if (res.result.fulfillment.messages[i].payload.richContent[j][k].video != "" && res.result.fulfillment.messages[i].payload.richContent[j][k].video != undefined ) {
                  let buttonVideo = res.result.fulfillment.messages[i].payload.richContent[j][k].video;
                
                  buttonVideo = this.sanitizer.bypassSecurityTrustResourceUrl(buttonVideo);
  
                  buttonsValue = {
                    text: buttonValue,
                    video: buttonVideo 
                  }

                } else { 
                  buttonsValue = {
                    text: buttonValue,
                    link: buttonLink 
                  }
                }
                buttons.push(buttonsValue);
                console.log(buttons); 
              }
            }
          } else { 

          }

        }

        const speech = res.result.fulfillment.speech;
        const btns = buttons;

        console.log(speech);

        const botMessage = new Message(speech, btns, 'bot');
        this.update(botMessage);
        console.log(res);
      });
  }

  talk() {
    this.client.textRequest('Wat is multec?')
      .then(res => console.log(res));
  }
}
