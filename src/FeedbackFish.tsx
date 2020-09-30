import React, { FunctionComponent, ReactElement } from "react"

import { useFeedbackFish } from "./useFeedbackFish"

type Props = {
  projectId: Parameters<typeof useFeedbackFish>[0]
  children?: ReactElement | ((props: object) => ReactElement)
  userId?: string
  metadata?: {
    [key: string]: string
  }
}

export const FeedbackFish: FunctionComponent<Props> = (props) => {
  useFeedbackFish(props.projectId)

  if (!props.children) return null

  const childrenProps = {
    "data-feedback-fish": true,
    "data-feedback-fish-userid": props.userId,
    ...Object.keys(props.metadata || {}).reduce((acc, key) => {
      return {
        ...acc,
        [`data-feedback-fish-${key}`]: props?.metadata?.[key],
      }
    }, {}),
  }

  if (React.isValidElement(props.children)) {
    return React.cloneElement(props.children, childrenProps)
  }

  if (typeof props.children === "function") {
    return props.children(childrenProps)
  }

  return null
}
