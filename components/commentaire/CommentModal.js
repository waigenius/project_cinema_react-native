import { View, Text, Modal, Button, StyleSheet } from 'react-native'
import { Card, Title, Paragraph, Button as ButtonPaper } from 'react-native-paper';
import React, { useState } from 'react'
import CommentForm from './CommentForm'
import Fire from '../../Fire';

export default function CommentModal(props) {

    // console.log(props.listeComments); // ok
    // console.log(props.movie);//ok


    const [isFormVisible, setIsFormVisible] = useState(false)
    const [comments, setComments] = useState(props.movie ? props.listeComments : [])
    const [author, setAuthor] = useState("")
    const [commentaire, setCommentaire] = useState("")


    function handleSubmitCommentaire() {

        const firebase = new Fire();

        let newMovie = {
            title: props.movie.title,
            synopsis: props.movie.synopsis,
            urlImage: props.movie.urlImage,
            comments: comments
        }

        if (props.movie) {

            newMovie.id = props.movie.id;
            newMovie.comments = props.movie.comments;
            newMovie.comments.push({author, commentaire})
            firebase.updateMovie(newMovie);
            setIsFormVisible(false)
        }

    }

    return (
        <>

            <Modal visible={props.isVisible} animationType="slide">
                {isFormVisible ?
                    <View>
                        <CommentForm 
                            commentAuthor = {author}
                            commentaire = {commentaire}
                            handleCommentAuthorChange = {newCommentAuthor => setAuthor(newCommentAuthor)}
                            handleCommentContentChange = {newCommentaire => setCommentaire(newCommentaire)}
                            onSubmitCommentaire={() => handleSubmitCommentaire()}
                        />
                        <Button title="Retourner" onPress={() => setIsFormVisible(false)} />
                    </View>
                    :
                    <View>
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
                                    {/* <Paragraph>{comment.published.toDate().toLocaleDateString()}</Paragraph> */}
                                </Card.Content>
                            </Card>
                        ))}
                        <Button title="nouveau commentaire" onPress={() => setIsFormVisible(true)} />
                        <Button title="Fermer Commentaire" onPress={props.handleClose}></Button>

                    </View>
                }
            </Modal>
        </>


    )
}