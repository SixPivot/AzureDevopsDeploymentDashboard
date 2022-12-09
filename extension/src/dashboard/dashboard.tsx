import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SDK from "azure-devops-extension-sdk";
import { Header } from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";

class Dashboard extends React.Component<{}> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    SDK.init();
  }

  public render(): JSX.Element {
    return (
      <Page className="flex-grow">
        <Header
          title="Deployment Dashboard"
        />
        <table>
          <tr>
            <th>&nbsp;</th>
            <th>Dev</th>
            <th>Staging</th>
            <th>Prod</th>
          </tr>
          <tr>
            <td>Rhipe</td>
            <td>v1.0.5</td>
            <td>v1.0.3</td>
            <td>v1.0.1</td>
          </tr>
          <tr>
            <td>Azure</td>
            <td>v2.1.0</td>
            <td>v1.5.0</td>
            <td>v1.5.0</td>
          </tr>
          <tr>
            <td>Amazon</td>
            <td>v3.0.7</td>
            <td>v2.2.1</td>
            <td>v2.2.0</td>
          </tr>
        </table>
      </Page>
    );
  }
}

ReactDOM.render(<Dashboard />, document.getElementById("root"));
