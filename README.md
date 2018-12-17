# Kubernetes Monitor View

## How to use

<kubernetesMonitor [domainConfig]="domainConfig" hideRegions="true"></kubernetesMonitor>

### domainConfig Example:
```json
domainConfig: any = [
    {
      name: "Projekt1",
      status: "good",
      timestamp: "",
      url: "http://localhost:8080/rest/rest/Projekt1",
      stages: [
        { 'name': 'Any', 'stages': ['DEV'] },
        { 'name': 'ECE', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
        { 'name': 'AMAP', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
        { 'name': 'CHINA', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] }
      ]
    }, {
      name: "Projekt2",
      status: "warning",
      url: "http://localhost:8080/rest/rest/Projekt2",
      stages: [
        { 'name': 'Any', 'stages': ['DEV'] },
        { 'name': 'ECE', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
        { 'name': 'AMAP', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
        { 'name': 'CHINA', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] }
      ]
    }, {
      name: "Projekt3",
      status: "danger",
      url: "http://localhost:8080/rest/rest/Projekt3",
      stages: [
        { 'name': 'Any', 'stages': ['DEV'] },
        { 'name': 'ECE', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
        { 'name': 'AMAP', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] },
        { 'name': 'CHINA', 'stages': ['INT', 'PREPROD', 'MAINT', 'PROD'] }
      ]
    }
  ]
  ```