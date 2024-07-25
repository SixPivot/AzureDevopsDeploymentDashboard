import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { InitTelemetry } from './telemetry/applicationInsights'
import { Main } from './components/main'

InitTelemetry()

ReactDOM.render(<Main />, document.getElementById('root'))
