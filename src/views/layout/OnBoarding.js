import React, { useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import "./OnBoarding.css";
import "../../App.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageCrop,FilePondPluginImageResize, FilePondPluginImageTransform,);


export default function OnBoarding() {
  const [files,setFiles] = useState([]);
  return (
    <div className="onboarding-container">
      <div className="onboarding-heading"> 
      <div></div> 
      <div>Choose profile picture</div>
      <div></div>
      </div>
      <div className="add-profile-picture">
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          imagePreviewHeight= "170"
          imageCropAspectRatio= '1=1'
          imageResizeTargetWidth= "200"
          imageResizeTargetHeight= "200"
          stylePanelLayout= 'compact circle'
          styleLoadIndicatorPosition= 'center bottom'
          styleButtonRemoveItemPosition= 'center bottom'
        />
      </div>
      <div className="btn-group">
        <button className="btn btn-secondary">Skip</button>
        <button className="btn btn-primary">Continue</button>
      </div>
    </div>
  )
}
