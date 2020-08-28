
import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet, IonLabel, IonButton } from '@ionic/react';
import { camera, trash, close, cloudDoneOutline } from 'ionicons/icons';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import classes from '../data/classes';
import useForceUpdate from 'use-force-update';


const Tab1 = (props) => {

  const { takePhoto, photos, deletePhoto } = usePhotoGallery();
  const [selectedPhoto, setSelectedPhoto] = useState('whatever');
  const forceUpdate = useForceUpdate();

  console.log('PHOTOS RETURNED:');
  console.log(photos);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Feldbuch</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Feldbuch</IonTitle>
          </IonToolbar>
        </IonHeader>

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
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
