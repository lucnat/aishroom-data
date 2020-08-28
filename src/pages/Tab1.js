
import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet, IonLabel, IonButton, IonButtons } from '@ionic/react';
import { camera, trash, close, cloudDoneOutline, refresh } from 'ionicons/icons';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import classes from '../data/classes';
import useForceUpdate from 'use-force-update';
import Page from '../components/Page';


const Tab1 = (props) => {

  const { takePhoto, photos, deletePhoto } = usePhotoGallery();
  const [selectedPhoto, setSelectedPhoto] = useState('whatever');
  const forceUpdate = useForceUpdate();

  console.log('PHOTOS RETURNED:');
  console.log(photos);
  
  return (
    <Page title="Feldbuch" large renderButtonsRight={() =>     
      <IonButton slot="end" onClick={() => {
        window.location.href = window.location.href
      }}>
        <IonIcon icon={refresh}/>
      </IonButton>
    } >
        <IonGrid>
          <IonRow style={{textAlign: 'center', color: '#888'}}>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg onClick={() => {
                    setSelectedPhoto(Math.random())
                    props.history.push({
                      pathname: '/details/'+photo.filepath,
                      photo: photo
                    })
                }} 
                src={photo.base64 ?? photo.webviewPath} />
                <div style={{color: 'var(--ion-color-primary)'}}>{photo.category} {photo.uploaded && <IonIcon icon={cloudDoneOutline}/>}</div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>

        <p>{selectedPhoto}</p>

      <IonButton onClick={() => {setSelectedPhoto(null)}}>update</IonButton>
    </Page>
  );
};

export default Tab1;
