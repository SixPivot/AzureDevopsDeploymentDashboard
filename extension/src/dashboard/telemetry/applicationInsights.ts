import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { Config } from '../config'

export const InitTelemetry = () => {
    const appInsights = new ApplicationInsights({
        config: {
            connectionString: Config.applicationInsightsConnectionString,
        },
    })
    appInsights.loadAppInsights()
}
