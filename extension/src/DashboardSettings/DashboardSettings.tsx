/// <reference types="vss-web-extension-sdk" />
import * as React from 'react'
import ReactDOM from 'react-dom'
import * as SDK from 'azure-devops-extension-sdk'
import { CustomHeader, HeaderDescription, HeaderTitle, HeaderTitleArea, HeaderTitleRow, TitleSize } from 'azure-devops-ui/Header'
//import { Page } from 'azure-devops-ui/Page'

export class DashboardSettings extends React.Component<{}> {
    public async componentDidMount() {
        await SDK.init()
    }

    public render(): JSX.Element {
        return (
            <CustomHeader className="bolt-header-with-commandbar">
                <HeaderTitleArea>
                    <HeaderTitleRow>
                        <HeaderTitle ariaLevel={3} className="text-ellipsis" titleSize={TitleSize.Large}>
                            Deployment Dashboard Settings
                        </HeaderTitle>
                    </HeaderTitleRow>
                    <HeaderDescription>Customise deployment dashboard</HeaderDescription>
                </HeaderTitleArea>
            </CustomHeader>
        )
    }
}

ReactDOM.render(<DashboardSettings />, document.getElementById('root'))
