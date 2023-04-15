import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent {
  dockerCommand =
    'docker run -p 3000:3000 --rm --name mock-srv robmanganelly/akamai-interview-server';
  versionHelp = true;

  constructor(private cpb: Clipboard, private state: StateService) {}

  get serverRequirement() {
    return this.state._serverRequirement;
  }
  set serverRequirement(value) {
    this.state._serverRequirement = value;
  }

  cpCommand() {
    this.cpb.copy(this.dockerCommand);
    alert('Command Copied to clipboard');
  }
}
