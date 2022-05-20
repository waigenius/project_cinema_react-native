import { Button } from 'react-native'
import React from 'react'

export default function AddButton(props) {
  return (
      <Button title={props.content} onPress={props.handlePress}> </Button>
  )
}