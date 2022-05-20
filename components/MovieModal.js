import { FirebaseError } from 'firebase/app';
import React, { useState } from 'react';
import { Modal, Text, Button, StyleSheet } from 'react-native';
import Fire from '../Fire';
import CommentForm from './commentaire/CommentForm';
import MovieForm from './MovieForm';


export default function MovieModal(props) {

  const [title, setTitle] = useState(props.movie ? props.movie.title : "");
  const [synopsis, setSynopsis] = useState(props.movie ? props.movie.synopsis : "");
  const [urlImage, setUrlImage] = useState(props.movie ? props.movie.urlImage : "");
  const [comments, setComments] = useState(props.movie ? props.movie.comments :[])

  // Créer des states de Authors et Content qui seront récupérer dans initialisé dans le Map 

  // Ce state me permettra d'afficher le contenu de la movie lors de la modification
  //const [updateMovie, setUpdateMovie] = useState(false)

  function handleSubmit() {

    const firebase = new Fire();

    let newMovie = {
      title: title,
      synopsis: synopsis,
      urlImage: urlImage,
      commments : comments

      
    }


    //CONDITION AJOUT OU DE MODIFICATION
    if (props.movie) {

      newMovie.id = props.movie.id;
      newMovie.comments = props.movie.comments;

      firebase.updateMovie(newMovie);
    } else {

      firebase.addMovie(newMovie);
    }

    props.handleClose(); //Permet de fermer la page de la modale
  }


  return (
    <>

      <Modal visible={props.isVisible} animationType="slide">
        <Text style={styles.title}>{props.contenuTexte}</Text>
        <MovieForm
          title={title}
          synopsis={synopsis}
          urlImage={urlImage}

          // COMMENT SONT UTILISER LES VARIABLES  NEWTITLE, NEWSYNOPSIS, NEWURLIMAGE ,
          handleTitleChange={(newTitle) => setTitle(newTitle)}
          handleSynopsisChange={(newSynopsis) => setSynopsis(newSynopsis)}
          handleUrlImageChange={(newUrlImage) => { setUrlImage(newUrlImage) }}

          onSubmit={() => handleSubmit()}
        />

        {/* FAIRE APPEL AUX COMMENTAIRES MOVIES, CE N'EST PAS LOGIQUE CAR LES VALEURS RENDUES SONT UNDEFINED */}
        {/* <CommentForm
        
        comments = {comments}
        commentPublished = {commentPublished}
        commentAuthor = {commentAuthor}
        commentContent = {commentContent}
        handleCommentsChange={(newCommentaire) => { setComments(newCommentaire) }}
        handleCommentAuthorChange={(newCommentAuthor) => { setCommentAuthor(newCommentAuthor) }}
        handleCommentContentChange={(newCommentContent) => { setCommentContent(newCommentContent) }}
        onSubmit={() => handleSubmit()}
        
        /> */}

        <Button title="Close" onPress={props.handleClose}></Button>
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