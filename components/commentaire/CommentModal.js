import { View, Text, Modal, Button, StyleSheet, ScrollView } from 'react-native'
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
    const [published, setPublished] = useState("");

    function getCurrentDate() {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        var temps = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
        return temps
    }



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

            newMovie.comments.push({ author, commentaire, published: new Date() })
            firebase.updateMovie(newMovie);

            setIsFormVisible(false)
        }

    }
    //console.log(published)

    return (
        <View style={styles.container}>

            <Modal visible={props.isVisible} animationType="slide">
                {isFormVisible ?
                    <View style={styles.container}>
                        <CommentForm
                            commentAuthor={author}
                            commentaire={commentaire}
                            handleCommentAuthorChange={newCommentAuthor => setAuthor(newCommentAuthor)}
                            handleCommentContentChange={newCommentaire => setCommentaire(newCommentaire)}
                            onSubmitCommentaire={() => { handleSubmitCommentaire() }}
                        />
                        <Button title="Retourner" onPress={() => setIsFormVisible(false)} />
                    </View>
                    :
                    <ScrollView >
                        <View >
                            <Text style={styles.h2}> Liste des Commentaires </Text>
                            {props.listeComments.map(comment => (
                                <Card style={styles.commentaire}>
                                    <Card.Content>
                                        <Title style={styles.auteur}>Auteur : {comment.author} </Title>
                                        <Title>Commentaire </Title>
                                        <Paragraph >{comment.commentaire}</Paragraph>
                                    </Card.Content>
                                    {comment.published && (
                                        <Card.Content>
                                            <Title>Date de publication : {comment.published instanceof Date ? comment.published.toLocaleDateString("fr-FR") : comment.published.toDate().toLocaleDateString("fr-FR")} </Title>
                                        </Card.Content>
                                    )}

                                </Card>
                            ))}
                            <Button title="nouveau commentaire" onPress={() => setIsFormVisible(true)} />


                        </View>
                        <Button title="Fermer" onPress={props.handleClose}></Button>
                    </ScrollView>
                }
            </Modal>
        </View>



    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',

    },

    auteur: {
        fontWeight: 'bold',

    },
    h2: {
        color: "royalblue",
        textAlign: 'center',
        fontSize: 50,
        fontWeight: "500",
        marginBottom: 50,

    },
    commentaire: {

        backgroundColor: "#F7F7F7",
        boxShadow: "5px 5px 15px #ABB2B9",
        marginBottom: 20,
        padding: 10,
        marginRight: 20,
        marginLeft: 20,


    },
})