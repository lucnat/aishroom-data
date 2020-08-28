
import React from 'react';
import Page from '../components/Page';
import { IonImg, IonButton, IonSelect, IonList, IonLabel, IonSelectOption, IonItem, IonIcon } from '@ionic/react';
import classes from '../data/classes';
import { useState } from 'react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { useStorage } from '@ionic/react-hooks/storage';
import { cloudDoneOutline } from 'ionicons/icons';
import useForceUpdate from 'use-force-update';

function dataURLtoFile(dataurl, filename) {
 
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  } 
  return new File([u8arr], filename, {type:mime});
}

var Dropbox = require('dropbox').Dropbox
var dbx = new Dropbox({ accessToken: 'N_btI-rHDx0AAAAAAAAAARx0SM4Dn0YixAaEbQ8sXbWYsdfgJxyvmaL3PET7izCR' })

export const Details = (props) => {
  
  const {photos, deletePhoto, updatePhoto} = usePhotoGallery();
  console.log(photos);
  const currentFilepath = props.match.params.filepath
  const photo = photos.filter(p => (p.filepath == currentFilepath))[0]
  console.log(photo);

  const [uploaded, setUploaded] = useState((photo && photo.uploaded) ? photo.uploaded : false)
  const {get, set} = useStorage();
  const forceUpdate = useForceUpdate();

  if(!photo) return <Page />

  console.log(props);  
  return (
    <Page>
        <IonImg src={photo.base64 ?? photo.webviewPath} />
        <div style={{padding: 15}}>
          <IonList>
            <IonItem>
              <IonLabel>Kategorie</IonLabel>
              <IonSelect value={photo.category} onIonChange={e => {
                  photo.category = e.target.value;
                  updatePhoto(photo);
                  forceUpdate();
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

            {photo.uploaded ? 
                <p> <IonIcon icon={cloudDoneOutline} style={{width: 30, height: 30}}/> <br />Upload erfolgreich</p>
                : 
                <IonButton onClick={() => {
                  const filename = photo.category + '/' + localStorage.getItem('username')+'-'+ new Date().getTime() + '.jpg';
                  const file = dataURLtoFile(photo.base64,filename);
                  console.log(file);
                    dbx.filesUpload({
                      path: '/'+filename,
                      contents: file,
                      autorename: true
                    }).then(r => {
                      photo.uploaded = true;
                      updatePhoto(photo);
                      forceUpdate();
                    });
                  }}>Zur Cloud hinzufügen</IonButton>  
            }

          </div>
        </div>
    </Page>
  )
}