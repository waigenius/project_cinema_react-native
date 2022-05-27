import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React from 'react'

export default function CommentForm(props) {


    return (
        <View style={styles.container}>
            
                <View style={styles.formulaire}>
                    
                    <Text>Nom de l'auteur</Text>
                    <TextInput
                        style={[styles.textInput, { height: 40 }]}
                        placeholder="Entrer votre prénom"
                        value={props.commentAuthor}
                        onChangeText={props.handleCommentAuthorChange}

                    />
                    <Text>Commentaire</Text>
                    <TextInput
                        style={[styles.textInput, { height: 140 }]}
                        placeholder="Entrer votre commentaire"
                        multiline="true"
                        value={props.commentaire}
                        onChangeText={props.handleCommentContentChange}
                    />
                     <Button title="Valider Commentaire" onPress={props.onSubmitCommentaire}></Button>
                </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        
    },
    formulaire:{
        backgroundColor: '#ffffff',
        padding: '20px',

    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        margin : 10,
        width: "90%",
    }
});