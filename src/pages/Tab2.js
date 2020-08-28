
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Page from '../components/Page';

class Tab2 extends React.Component {
  render() {
    return (
      <Page title="About" large padding>
        <p>Dein username lautet <b>{localStorage.getItem('username')}</b>. <a href="#" onClick={e => {
          e.preventDefault();
          const username = prompt('Username eingeben (mind. 3 Zeichen)');
          if(username.length < 3) alert('zu kurz')
          else localStorage.setItem('username',username);
          this.forceUpdate();
        }} >ändern </a></p>
        <p><b>Wozu diese App? </b></p>
        <p>Um verlässlich Pilze zu erkennen benötigt unser System Bilder von Pilzen. Die App hilft uns, eine Datenbank aufzubauen. </p> 
        
        <p> <b>Wie ist die App zu benützen?</b> </p>
        <p>
          Die Bilder können ohne Internetverbindung gespeichert und einer Kategorie zugewiesen werden. Sobald eine Internetverbindung besteht, können die Bilder auf unseren Server hochgeladen werden.
          </p>

        <p><b>Wo kann ich ein Feedback abgeben?</b></p>
        <p>Feedbacks zur App können an <a href="mailto:luca@naterop.net">Luca</a> gesendet werden. Für Kommentare, Verbesserungsvorschläge sowie Bugmeldungen sind wir sehr dankbar.</p>
        <p> </p>

        <br />

        <i>aishroom-data app v1.0</i>
      </Page>

    )
  }
}

export default Tab2;
