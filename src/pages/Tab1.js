
import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet } from '@ionic/react';
import { camera, trash, close } from 'ionicons/icons';
import { usePhotoGallery } from '../hooks/usePhotoGallery';

const Tab1 = (props) => {

  const { takePhoto, photos, deletePhoto } = usePhotoGallery();
  const [selectedPhoto, setSelectedPhoto] = useState();

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
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg onClick={() => {
                    props.history.push({
                      pathname: '/details',
                      photo: photo
                    })
                }} 
                src={photo.base64 ?? photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonActionSheet
          isOpen={!!selectedPhoto}
          buttons={[{
            text: 'Löschen',
            role: 'destructive',
            handler: () => {
              if (selectedPhoto) {
                deletePhoto(selectedPhoto);
                setSelectedPhoto(undefined);
              }
            }
          }, {
            text: 'Kategorisieren',
            handler: () => {
              props.history.push({
                pathname: '/details',
                photo: selectedPhoto
              })
            }
          },{
            text: 'Abbrechen',
            role: 'cancel'
          }]}
          onDidDismiss={() => setSelectedPhoto(undefined)}
        />

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
