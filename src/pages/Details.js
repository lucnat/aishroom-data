
import React from 'react';
import Page from '../components/Page';
import { IonImg, IonButton, IonSelect, IonList, IonLabel, IonSelectOption, IonItem } from '@ionic/react';
import examplePhoto from '../data/photo';
import classes from '../data/classes';
import { useState } from 'react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { useStorage } from '@ionic/react-hooks/storage';

var Dropbox = require('dropbox').Dropbox
var dbx = new Dropbox({ accessToken: 'N_btI-rHDx0AAAAAAAAAARx0SM4Dn0YixAaEbQ8sXbWYsdfgJxyvmaL3PET7izCR' })

export const Details = (props) => {
  
  let photo = props.location.photo;
  if(!photo) photo = examplePhoto;

  console.log(photo);

  const [category, setCategory] = useState(photo.category ? photo.category : classes[0]);
  const {deletePhoto, updatePhoto} = usePhotoGallery();
  const {get, set} = useStorage();

  return (
    <Page title="Details" large>
        <IonImg src={photo.base64 ?? photo.webviewPath} />
        <div style={{padding: 15}}>
          <IonList>
            <IonItem>
              <IonLabel>Kategorie</IonLabel>
              <IonSelect value={category} onIonChange={e => {
                  setCategory(e.target.value);
                  photo.category = e.target.value;
                  updatePhoto(photo);
                }}>
                {classes.map(c => <IonSelectOption key={c} value={c}>{c}</IonSelectOption>)}
              </IonSelect>
            </IonItem>
          </IonList>
          <div style={{padding: 15}}>
            <IonButton onClick={() => {
              deletePhoto(photo);
              props.history.goBack();
            }}>Löschen</IonButton>
            <br />
            <IonButton>Zur Cloud hinzufügen</IonButton>
          </div>
        </div>
    </Page>
  )
}