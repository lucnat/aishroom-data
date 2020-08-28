
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Page from '../components/Page';

const Tab2 = () => {
  return (
    <Page title="About" large padding>
      <p><b>Wozu diese App? </b></p>
      <p>Um verlässlich Pilze zu erkennen benötigt unser System Bilder von Pilzen. Dazu dient diese App. </p> 
      
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
  );
};

export default Tab2;
