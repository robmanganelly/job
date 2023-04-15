import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent {

  dockerCommand = 'docker run -p 3000:3000 --rm --name mock-srv robmanganelly/akamai-interview-server'
  serverRequirement = false;
  versionHelp = true;

  constructor(private cpb: Clipboard) { }

  cpCommand(){
    this.cpb.copy(this.dockerCommand);
    alert('Command Copied to clipboard');
  }
}
