
import React from 'react';
import Page from '../components/Page';
import { IonImg, IonButton, IonSelect, IonList, IonLabel, IonSelectOption, IonItem } from '@ionic/react';
import examplePhoto from '../data/photo';
import classes from '../data/classes';
import { useState } from 'react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { useStorage } from '@ionic/react-hooks/storage';

export const Details = (props) => {
  
  let photo = props.location.photo;
  if(!photo) photo = examplePhoto;

  const [category, setCategory] = useState(classes[0]);
  const {deletePhoto, updatePhoto} = usePhotoGallery();
  const {get, set} = useStorage();

  get('photos').then(e => {
    console.log(JSON.parse(e))
  })

  return (
    <Page title="Details" large>
        <IonImg src={photo.base64 ?? photo.webviewPath} />
        <div style={{padding: 15}}>
          <IonList>
            <IonItem>
              <IonLabel>Kategorie</IonLabel>
              <IonSelect value={category} onIonChange={e => setCategory(e.target.value)}>
                {classes.map(c => <IonSelectOption key={c} value={c}>{c}</IonSelectOption>)}
              </IonSelect>
            </IonItem>
          </IonList>
          <div style={{padding: 15}}>
            <IonButton onClick={() => {
              deletePhoto(photo);
              props.history.goBack();
            }}>Löschen</IonButton>
            <IonButton onClick={() => {
              photo.category = category;
              updatePhoto(photo);
            }}>Kategorie speichern</IonButton>
          </div>
        </div>
    </Page>
  )
}