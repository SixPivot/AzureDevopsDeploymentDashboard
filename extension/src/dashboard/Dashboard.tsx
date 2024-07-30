import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { InitTelemetry } from '../telemetry/applicationInsights'
import { Main } from './Main'

// todo: add user settings for this.
// This will become an opt-in for users who want to help us out.
const enableTelemetry = false
InitTelemetry(enableTelemetry)

ReactDOM.render(<Main />, document.getElementById('root'))
