# Kubernetes Monitor View  [![Build Status](https://travis-ci.org/EXXETA/kubernetes-monitor-view.svg)](https://travis-ci.org/EXXETA/kubernetes-monitor-view)
Angular components to visualize the status of applications installed in kubernetes clusters. The data needs to be collected using the [kubernetes-monitor](https://www.github.com/EXXETA/kubernetes-monitor).

## Components
- application-table - Overview table of all monitored applications
- application-state - Details of a single application instance

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Credits

- EXXETA AG
- See [Contributors](https://www.github.com/EXXETA/kubernetes-monitor-view/graphs/contributors)

## License

Apache License v2.0

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