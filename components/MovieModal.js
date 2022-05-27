import React, { useState } from 'react';
import { Modal, Text, Button, StyleSheet } from 'react-native';
import Fire from '../Fire';
import MovieForm from './MovieForm';


export default function MovieModal(props) {

  const [title, setTitle] = useState(props.movie ? props.movie.title : "");
  const [synopsis, setSynopsis] = useState(props.movie ? props.movie.synopsis : "");
  const [urlImage, setUrlImage] = useState(props.movie ? props.movie.urlImage : "");


  function handleSubmit() {

    const firebase = new Fire();

    let newMovie = {
      title: title,
      synopsis: synopsis,
      urlImage: urlImage,
      comments : []      
    }

    if (props.movie) {

      newMovie.id = props.movie.id;
      newMovie.comments = props.movie.comments;
      firebase.updateMovie(newMovie);

    } else {

      firebase.addMovie(newMovie);
    }

    props.handleClose(); 
  }


  return (
    <>

      <Modal visible={props.isVisible} animationType="slide">
        <Text style={styles.title}>{props.contenuTexte}</Text>
        <MovieForm
          title={title}
          synopsis={synopsis}
          urlImage={urlImage}
          handleTitleChange={(newTitle) => setTitle(newTitle)}
          handleSynopsisChange={(newSynopsis) => setSynopsis(newSynopsis)}
          handleUrlImageChange={(newUrlImage) => { setUrlImage(newUrlImage) }}
          onSubmit={() => handleSubmit()}
        />

        <Button title="Fermer" onPress={props.handleClose}></Button>
      </Modal>
    </>
  )
}


const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold"
  },
});