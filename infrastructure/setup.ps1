az group create --name "azure-devops-dashboard-rg" --location "australia east"

az monitor app-insights component create --app "azure-devops-dashboard-ai" --location "australia east" --resource-group "azure-devops-dashboard-rg" --application-type web