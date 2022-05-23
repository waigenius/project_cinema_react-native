import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React from 'react'

export default function CommentForm(props) {

    // Affichage du nom de l'auteur
    console.log(props.commentAuthor);

    return (
        <View>
            <View>
                <View>
                    
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
          
                </View>

                <Button title="Valider Commentaire" onPress={props.onSubmitCommentaire}></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        width: "90%",
    }
});