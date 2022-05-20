import { Card, Title, Paragraph, Button } from 'react-native-paper';
import React, {useState} from 'react'
import Fire from '../Fire'
import MovieForm from './MovieForm';


export default function MovieList(props) {
//const [isMovieForm, setIsMovieForm] = useState(true)
    function handleDelete(movie){

        const firebase = new Fire();
        firebase.deleteMovie(movie)
    }

    return (
        <>
            {props.listeMovies.map(movie => (
                <Card>
                    <Card.Content>
                        <Title> {movie.title}</Title>
                    </Card.Content>
                    <Card.Cover source={{ uri: movie.urlImage }} />
                    <Card.Content>
                        <Paragraph>{movie.synopsis}</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        
                        {/* POSSIBILITE D'AFFICHER LES VALUES */}
                        <Button onPress={() => props.handlePress(movie)}>
                            Modifier 
                        </Button>

                        <Button onPress={() => handleDelete(movie)}>
                            Supprimer
                        </Button>
                        
                        <Button onPress={() => props.handleCommentPress(movie)}>
                            Commentaire
                        </Button>
                    </Card.Actions>
                </Card>
            ))}

            {/* <MovieForm isComment = {isComment}/> */}
            
        </>

    )
}