
import React from 'react';
import Page from '../components/Page';
import Photo from '../components/Photo';
import { IonButton, IonLoading, IonList, IonItem, IonLabel, IonSelectOption, IonSelect, IonIcon } from '@ionic/react';
import files from '../components/files';
import classes from '../data/classes';
import { cloudDoneOutline, trash, trashOutline, cloudOutline } from 'ionicons/icons';

var Dropbox = require('dropbox').Dropbox
var dbx = new Dropbox({ accessToken: 'qCS5xD40AqkAAAAAAAAAAVqN9sMKd6-OWVvzeeltk48woYw7UMUMclGDqhFsjLvu'})

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

export default class extends React.Component {

  state = {
    loading: false,
    base64: false
  }

  constructor(props) {
    super(props);
    this.image = React.createRef();
  }


  async delete() {
    if(!window.confirm('sicher?')) return;
    const path = this.props.match.params.path;
    files.filesystem.deleteFile({
      path: path,
      directory: files.dataDirectory
    });
    this.props.history.goBack();
  }

  async upload() {

    const path = this.props.match.params.path;
    const photoInfo = JSON.parse(localStorage.getItem(path));
    if(!photoInfo || !photoInfo.category) { alert('Bitte Kategorie wählen'); return; }

    if(!localStorage.getItem('username')) {
      const username = prompt('Username eingeben (mind. 3 Zeichen, einmalig):');
      if(!username || username.length < 3) { alert('zu kurz');return;} 
      localStorage.setItem('username',username);
    }

    this.setState({loading: true});
    
    const actualBase64 = 'data:image/jpeg;base64,'+this.state.base64;
    dbx.filesUpload({
      path: '/'+photoInfo.category + '/'+localStorage.getItem('username')+'-'+path,
      contents: dataURLtoFile(actualBase64,path),
      autorename: true
    }).then(r => {
      alert('Uplaod erfolgreich');
      this.setState({loading: false});
      photoInfo.uploaded = true;
      localStorage.setItem(path, JSON.stringify(photoInfo));
      this.forceUpdate();
    });

  }

  renderCategorySelection() {
    const path = this.props.match.params.path;
    let photoInfo = JSON.parse(localStorage.getItem(path));
    if(!photoInfo) photoInfo = {};

    return (
      <IonList style={{marginRight: 20}}>
        <IonItem>
          <IonLabel>Kategorie</IonLabel>
          <IonSelect value={photoInfo.category} onIonChange={e => {
            photoInfo.category = e.target.value;
            localStorage.setItem(path, JSON.stringify(photoInfo));
          }}>
            {classes.map(c => <IonSelectOption key={c}>{c}</IonSelectOption>)}
          </IonSelect>
        </IonItem>
      </IonList>
    );
  }

  render() {
    const path = this.props.match.params.path;
    const photoInfo = JSON.parse(localStorage.getItem(path));
    const isUploaded = photoInfo && photoInfo.uploaded;
    return (
      <Page title="Kategorie zuweisen" large backTo="/fieldbook">
        {this.renderCategorySelection()}
        <br />
        <Photo onLoaded={base64 => { this.setState({base64})}} ref={this.image} path={path}/>
        <IonLoading isOpen={this.state.loading} /> 
        <div style={{display: 'flex', padding: 15}}>
          <div style={{flex: 1}}>
          {isUploaded ? 
            <div style={{color: 'var(--ion-color-primary)'}}><IonIcon icon={cloudDoneOutline} style={{width: 30, height: 30}} /> <br /> Upload erfolgreich</div>  :
            <IonButton onClick={this.upload.bind(this)}>Bild Hochladen</IonButton>
            }
          </div>
          <div style={{display: 'inline-block'}}>
            <IonButton slot="end" color="danger" onClick={this.delete.bind(this)}>
              <IonIcon icon={trashOutline}/>
            </IonButton>
          </div>

        </div>
      </Page>
    )
  }

}

