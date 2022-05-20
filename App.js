import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AddButton from './components/AddButton';
import { useState, useEffect } from "react";
import MovieModal from './components/MovieModal';
import Fire from './Fire';
import MovieList from './components/MovieList';
import { ActivityIndicator } from 'react-native-paper';
import CommentModal from './components/commentaire/CommentModal';



export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  //Update Partie
  const [selectedMovie, setSelectedMovie] = useState(null)



  //Initilalisation des composants

  useEffect(() => {
    const firebase = new Fire()
    firebase.getMovies(movies => {

      setMovies(movies)
      setLoading(false)

    })

  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>
        Welcome to movies
      </Text>

      {loading === true && <ActivityIndicator></ActivityIndicator>}

      <MovieList
        listeMovies={movies}      
        isVisible={isModalVisible}

        //Permet de rendre visible la Modale pour effectuer une modification 
        //Et une condition pour afficher le formulaire de création de 
        handlePress={(movie) => { setIsModalVisible(true), setSelectedMovie(movie) }}

        handleCommentPress={(movie) => { setIsCommentModalVisible(true), setSelectedMovie(movie) }}
      />

      {/* MODAL POUR LE COMMENTAIRE */}
      {isCommentModalVisible &&
        (
          <CommentModal
            isVisible={isCommentModalVisible}
            movie={selectedMovie}
            listeComments={selectedMovie.comments}
            handleClose={() => { setIsCommentModalVisible(false) }}

          />
        )}


      {isModalVisible && (
        <MovieModal
          //Permet d'afficher le titre dans la modale en fonction de l'action cliquée
          contenuTexte={selectedMovie ? "Modification du film" : "Ajouter un nouveau film"}
          isVisible={isModalVisible}
          movie={selectedMovie}
          isCreateComments={isCommentModalVisible}

          handleClose={() => { setIsModalVisible(false), setSelectedMovie(null) }}
        />

      )}

      <AddButton
        content="add a Movie"
        // le state setIsUpdate permet de signifier qu'il n' y a pas de modification.
        handlePress={() => { setIsModalVisible(true), setSelectedMovie(null) }}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    color: "royalblue",
    fontSize: 50,
    fontWeight: "900"
  },
});