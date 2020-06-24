import React from "react"
import { Card, Paragraph, Text } from 'react-native-paper';
import { StyleProp, ViewStyle } from "react-native";

export interface ListItemCardProps {
  id: string,
  title: string,
  subtitle: string,
  content: string,
  src: string,
  style?: StyleProp<ViewStyle>
}

const ListItemCard = ({
  title,
  subtitle,
  content,
  src,
  style
} : ListItemCardProps) => {
  return (
    <Card style={style} accessibilityStates>
      <Card.Cover source={{ uri: src }} accessibilityStates />
      <Card.Title title={title} subtitle={subtitle} accessibilityStates />
      <Card.Content>
        <Paragraph numberOfLines={2}>{content}</Paragraph>
      </Card.Content>
    </Card>
  )
}

export default React.memo(ListItemCard)
