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
import { FormControl, FormLabel, Input, FormErrorMessage, useToast } from "@chakra-ui/core";
import { Formik, Form, Field } from 'formik'
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import { storage, firebase, auth } from "../../config/firebaseConfig";
import shortid from "shortid";
import Progress from './../../components/Progress'



// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginImageResize, FilePondPluginImageTransform,);

function OnBoarding({
  onRequestSave,
  onRequestClear,
  defaultFiles = [],
}) {
  const setUpdateData = useStoreActions(actions => actions.user.setUpdateData);
  const updateData = useStoreState(state => state.user.updateData);
  const toast = useToast();

  const server = {
    // this uploads the image using firebase
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      // create a unique id for the file
      const id = shortid.generate()

      // upload the image to firebase
      const task = storage.child('profile/' + id).put(file, {
        contentType: 'image/jpeg',
      })

      // monitor the task to provide updates to FilePond
      task.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snap => {
          // provide progress updates
          progress(true, snap.bytesTransferred, snap.totalBytes)
        },
        err => {
          // provide errors
          error(err.message)
        },
        () => {
          task.snapshot.ref.getDownloadURL().then(function (url) {
            console.log('File available at', url);
            setUpdateData({ "photoURL": url });
          });
        })
    },
  }
  const [files, setFiles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const validationSchema = yup.object({
    fullName: yup
      .string()
      .required("Full name is required to proceed")
  });
  let browserHistory = useHistory();

  return (
    <div className="onboarding-container">
      <Progress isAnimating={isLoading} />
      <div className="onboarding-heading">
        <div></div>
        <div>Choose profile picture</div>
        <div></div>
      </div>
      <div className="add-profile-picture">
        <FilePond
          maxFiles={1}
          files={files}
          onupdatefiles={fileItems => {
            if (fileItems.length === 0) {
              onRequestClear()
            }
            setFiles(fileItems.map(fileItem => fileItem.file))
          }}
          server={server}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          imagePreviewHeight="170"
          imageCropAspectRatio='1=1'
          imageResizeTargetWidth="300"
          imageResizeTargetHeight="300"
          stylePanelLayout='compact circle'
          styleProgressIndicatorPosition='center bottom'
          styleLoadIndicatorPosition='center bottom'
          styleButtonRemoveItemPosition='center bottom'
          styleButtonProcessItemPosition='center bottom'
        />
      </div>
      <div className="fullname-form">
        <Formik
          validateOnChange={true}
          initialValues={{ fullName: "" }}
          validationSchema={validationSchema}
          onSubmit={({ fullName }, { setSubmitting }) => {
            setLoading(true);
            updateData.displayName = fullName;
            auth.currentUser.updateProfile(updateData).then(function () {
              setLoading(false);
              browserHistory.push("/");
            }).catch(function (error) {
              toast({
                title: "An error occurred.",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            });

          }}>
          {() => (
            <Form>
              <Field name="fullName">
                {({ field, form }) => {
                  return (
                    <FormControl isInvalid={form.errors.fullName && form.touched.fullName} isRequired>
                      <FormLabel htmlFor="fullName">Full Name</FormLabel>
                      <Input {...field} id="fullName" placeholder="Eg. Saheb Giri" focusBorderColor="purple.500" />
                      <FormErrorMessage>{form.errors.fullName}</FormErrorMessage>
                    </FormControl>
                  )
                }}
              </Field>
              <button type="submit" className="btn btn-primary btn-continue">Continue</button>
            </Form>
          )}
        </Formik>
      </div>

    </div>
  )

}

export default OnBoarding;
