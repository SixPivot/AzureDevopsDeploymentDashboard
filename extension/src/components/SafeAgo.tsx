import { Ago, IAgoProps } from 'azure-devops-ui/Ago'
import React from 'react'

// Errors thrown by this component are a bit random and very annoying.
export const SafeAgo = (props: IAgoProps) => {
    try {
        return <Ago {...props} />
    } catch (error) {
        console.warn('Ago component threw an error.')
        console.warn(error)
        return <></>
    }
}
