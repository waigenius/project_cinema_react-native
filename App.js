import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
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
  const [selectedMovie, setSelectedMovie] = useState(null) //Update Partie


  //Initilalisation des composants
  useEffect(() => {
    const firebase = new Fire()
    firebase.getMovies(movies => {

      setMovies(movies)
      setLoading(false)

    })

  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.h1}>
          Welcome to movies
        </Text>

        {loading === true && <ActivityIndicator></ActivityIndicator>}

        {isModalVisible && (
          <MovieModal
            contenuTexte={selectedMovie ? "Modification du film" : "Ajouter d'un nouveau film"}
            isVisible={isModalVisible}
            movie={selectedMovie}
            isCreateComments={isCommentModalVisible}
            handleClose={() => { setIsModalVisible(false), setSelectedMovie(null) }}
          />

        )}
        <MovieList
          listeMovies={movies}
          isVisible={isModalVisible}
          handlePressUpdate={(movie) => { setIsModalVisible(true), setSelectedMovie(movie) }}
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


        <AddButton
          content="Ajouter un film"
          handlePressAdd={() => { setIsModalVisible(true), setSelectedMovie(null) }}
        />

        <StatusBar style="auto" />
      </View>
    </ScrollView>
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