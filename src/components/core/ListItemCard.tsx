import React from 'react'
import {Card, Paragraph} from 'react-native-paper'
import {StyleProp, ViewStyle, ImageSourcePropType} from 'react-native'

export interface ListItemCardProps {
  id: string
  title: string
  subtitle: string
  content: string
  src: ImageSourcePropType
  style?: StyleProp<ViewStyle>
}

const ListItemCard = ({
  title,
  subtitle,
  content,
  src,
  style
}: ListItemCardProps) => {
  return (
    <Card style={style} accessibilityStates>
      <Card.Cover source={src} accessibilityStates />
      <Card.Title title={title} subtitle={subtitle} accessibilityStates />
      <Card.Content>
        <Paragraph numberOfLines={2}>{content}</Paragraph>
      </Card.Content>
    </Card>
  )
}

export default React.memo(ListItemCard)
