import { View, Text, Modal, Button, StyleSheet } from 'react-native'
import { Card, Title, Paragraph, Button as ButtonPaper } from 'react-native-paper';
import React, { useState } from 'react'
import CommentForm from './CommentForm'

export default function CommentModal(props) {

    const [isFormVisible, setIsFormVisible] = useState(false)
    const [authors, setAuthors] = useState("")


    function handleSubmit() {

        const firebase = new Fire();
    
        let newMovie = {
          title: title,
          synopsis: synopsis,
          urlImage: urlImage,
        }

        if (props.listeComments) {
    
          newMovie.id = props.movie.id;
          newMovie.comments = props.movie.comments;
    
          firebase.updateMovie(newMovie);
        } 
    
       
      }

    return (
        <>

            <Modal visible={props.isVisible} animationType="slide">
                {!isFormVisible ? <>

                    <Text style={{ fontSize: 20 }}> Liste des Commentaires </Text>
                    {props.listeComments.map(comment => (
                        <Card>
                            <Card.Content>
                                <Title> Auteur : {comment.author} </Title>
                            </Card.Content>
                            <Card.Content>
                                <Title>Commentaire</Title>
                                <Paragraph>{comment.commentaire}</Paragraph>
                            </Card.Content>
                            <Card.Content>
                                <Title>Date de publication</Title>
                                <Paragraph>{comment.published.toDate().toLocaleDateString()}</Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <ButtonPaper>
                                    Modifier
                                </ButtonPaper>

                                <ButtonPaper>
                                    Supprimer
                                </ButtonPaper>

                            </Card.Actions>

                        </Card>
                    )
                    )}

                    <Button title="Ajouter un nouveau" onPress={() => setIsFormVisible(true)} />
                    <Button title="Fermer" onPress={props.handleClose}></Button>

                </>

                    : <View>
                        
                        <CommentForm  comments = ""
                        
                        />
                        <Button title="Retourner" onPress={() => setIsFormVisible(false)} />

                    </View>

                }


            </Modal>
        </>


    )
}