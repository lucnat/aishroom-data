
import React from 'react';
import Page from '../components/Page';
import { IonFab, IonFabButton, IonIcon, IonImg, IonButton, IonButtons, IonLoading, IonGrid, IonRow, IonCol, isPlatform, withIonLifeCycle } from '@ionic/react';
import { add, refresh, refreshOutline, fastFoodOutline } from 'ionicons/icons';
import { Plugins, CameraResultType, FilesystemDirectory } from '@capacitor/core';
import Photo from '../components/Photo';
const { Camera, Filesystem } = Plugins;

class Tab1 extends React.Component {

  state = { photos: [], loading: false }

  async loadPhotos() {
    this.setState({photos: [], loading: true});
    const result = await Filesystem.readdir({
      path: '',
      directory: FilesystemDirectory.Data
    });
    this.setState({
      photos: result.files.sort().reverse(),
      loading: false
    });
  }

  ionViewWillEnter() {
    this.loadPhotos();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: isPlatform('ios'),
      resultType: CameraResultType.Base64
    });
    const actualBase64 = 'data:image/jpeg;base64,'+image.base64String
    let result = await Filesystem.writeFile({
      path: new Date().getTime() + '.jpg',
      data: actualBase64,
      directory: FilesystemDirectory.Data
    }); 
    this.loadPhotos();
  }

  componentDidMount() {
    this.loadPhotos();
    window.updateFeldbuch = this.forceUpdate.bind(this);
  }
  
  render() {
    return (
        <Page menu title="Feldbuch" large renderDirectChildren={() =>       
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={() => this.takePicture()}>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
        </IonFab>}>
        <IonGrid>
          <IonRow style={{textAlign: 'center', color: '#888'}}>
            {this.state.photos.map((p,i) => 
              <IonCol size="6" key={i}>
                <Photo path={p} displayPhotoInfo/>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
        <IonLoading isOpen={this.state.loading}/>
      </Page>
    )
  }

}

export default withIonLifeCycle(Tab1);