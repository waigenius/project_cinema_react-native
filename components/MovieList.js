import { Card, Title, Paragraph, Button } from 'react-native-paper';
import React from 'react'
import { StyleSheet } from 'react-native';
import Fire from '../Fire'
import MovieForm from './MovieForm';


export default function MovieList(props) {

    function handleDelete(movie){

        const firebase = new Fire();
        firebase.deleteMovie(movie)
    }

    return (
        <>
            {props.listeMovies.map(movie => (
                <Card style={styles.containerMovie}>
   
                    <Card.Cover source={{ uri: movie.urlImage }} style={styles.imageUrl} />
                    <Card.Content>
                        <Title style={{fontWeight: 'bold'}}>{movie.title}</Title>
                        <Paragraph style={{textAlign:'justify'}}>{movie.synopsis}</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        
                        {/* POSSIBILITE D'AFFICHER LES VALUES */}
                        <Button onPress={() => props.handlePressUpdate(movie)}>
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

            
        </>

    )



}

const styles = StyleSheet.create({

    containerMovie:{

        backgroundColor : "#F7F7F7",
        boxShadow : "5px 5px 15px #ABB2B9",
        marginBottom: 50,
        padding:10,
        marginRight:20,
        marginLeft:20,


    },
    imageUrl:{

        

    }

})