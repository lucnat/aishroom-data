
import React from 'react';
import Page from '../components/Page';
import { IonImg, IonButton, IonSelect, IonList, IonLabel, IonSelectOption, IonItem, IonIcon, isPlatform } from '@ionic/react';
import classes from '../data/classes';
import { useState } from 'react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { useStorage } from '@ionic/react-hooks/storage';
import { cloudDoneOutline } from 'ionicons/icons';
import useForceUpdate from 'use-force-update';
import { base64Path, useFilesystem } from '@ionic/react-hooks/filesystem';


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
var dbx = new Dropbox({ accessToken: 'qCS5xD40AqkAAAAAAAAAAVqN9sMKd6-OWVvzeeltk48woYw7UMUMclGDqhFsjLvu'})

export const Details = (props) => {
  
  const {photos, deletePhoto, updatePhoto} = usePhotoGallery();
  console.log(photos);
  const currentFilepath = props.match.params.filepath
  const photo = photos.filter(p => (p.filepath == currentFilepath))[0]
  console.log(photo);
  const [uploaded, setUploaded] = useState((photo && photo.uploaded) ? photo.uploaded : false)
  const {get, set} = useStorage();
  const { deleteFile, getUri, readFile, writeFile } = useFilesystem();

  const forceUpdate = useForceUpdate();
  if(!photo) return <Page />



  const uploadImage = async () => {
    console.log('starte upload')
    let file;
    let base64data;
    if(isPlatform('hybrid')) {
      console.log('hybrid');
      file = await readFile({
        path: photo.filepath
      });
      base64data = file.data;
      base64data = "data:image/jpeg;base64,"+base64data;
      console.log('base64:')
      console.log(base64data.substring(0,100));
    } else {
      // on desktop 
      base64data = photo.base64
    }
    const filename = photo.category + '/' + localStorage.getItem('username')+'-'+ new Date().getTime() + '.jpg';
    file = dataURLtoFile(base64data,filename);
    dbx.filesUpload({
      path: '/'+filename,
      contents: file,
      autorename: true
    }).then(r => {
      console.log(r);
      photo.uploaded = true;
      updatePhoto(photo);
      forceUpdate();
    });

  }

  return (
    <Page backTo="/tab1">
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
                <IonButton onClick={uploadImage}>In unsere Cloud hochladen</IonButton>  
            }

          </div>
        </div>
    </Page>
  )
}