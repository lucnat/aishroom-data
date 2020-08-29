
import React from 'react';
import { IonImg, IonButton, IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import files from './files';
import { trashBinSharp, cloudDone, cloudDoneOutline } from 'ionicons/icons';

export default class extends React.Component {

  state = {
    base64: null,
    photoInfo: null
  }

  async componentDidMount(){
    // register event listener

    window.addEventListener('storage',e => {
      console.log(e);
    })

    let photoInfo = JSON.parse(localStorage.getItem(this.props.path));
    this.setState({photoInfo});
    const content = await files.filesystem.readFile({
      path: this.props.path,
      directory: files.dataDirectory
    });
    this.setState({base64: content.data});
    if(this.props.onLoaded) {
      this.props.onLoaded(content.data);
    }
  }

  renderPhotoInfo() {
    if(!this.props.displayPhotoInfo) return;
    if(!this.state.photoInfo) return;
    return (
      <div style={{display: 'flex'}}>
        <label style={{textDecorationColor: 'transparent', flex: 1, fontSize: 12}}>{this.state.photoInfo.category}</label>
        {this.state.photoInfo.uploaded && <span style={{position: 'absolute'}}><IonIcon icon={cloudDoneOutline}/></span>}
      </div>
    );

  }

  render() {
    return (
      <div>
        <Link to={'/details/'+this.props.path}>
          <IonImg src={'data:image/jpeg;base64,'+this.state.base64}/>
        </Link>
        {this.renderPhotoInfo()}
      </div>
    )
  }
  
}