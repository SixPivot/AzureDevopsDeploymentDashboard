import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider'

export const data = {
    environments: [
        {
            name: 'Dev',
            pipeline: {
                'Release Pipeline E': {
                    deployment: {
                        id: 370,
                        requestIdentifier: '0b0b645b-0f77-431a-8a98-b885b4a72833.dev.dev',
                        environmentId: 5,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: '0b0b645b-0f77-431a-8a98-b885b4a72833',
                        stageName: 'dev',
                        jobName: 'dev',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=73',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/73',
                                },
                            },
                            id: 73,
                            name: 'Release Pipeline E',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3924',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/3924',
                                },
                            },
                            id: 3924,
                            name: '20240717.1',
                        },
                        result: 2,
                        queueTime: '2024-07-17T05:48:12.330Z',
                        startTime: '2024-07-17T05:48:12.423Z',
                        finishTime: '2024-07-17T05:48:39.270Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/73?revision=2',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=73',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/73?revision=2',
                        id: 73,
                        revision: 2,
                        name: 'Release Pipeline E',
                        folder: '\\Service Group A',
                    },
                },
                ReleaseDashboard: {
                    deployment: {
                        id: 368,
                        requestIdentifier: '7491a830-0f89-40f1-9c2f-ed5f3daed836.dev.dev',
                        environmentId: 5,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: '7491a830-0f89-40f1-9c2f-ed5f3daed836',
                        stageName: 'dev',
                        jobName: 'dev',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=72',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/72',
                                },
                            },
                            id: 72,
                            name: 'ReleaseDashboard',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3923',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/3923',
                                },
                            },
                            id: 3923,
                            name: '20240717.1',
                        },
                        result: 0,
                        queueTime: '2024-07-17T04:24:37.246Z',
                        startTime: '2024-07-17T04:24:37.346Z',
                        finishTime: '2024-07-17T04:25:14.406Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/72?revision=3',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=72',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/72?revision=3',
                        id: 72,
                        revision: 3,
                        name: 'Release Pipeline D',
                        folder: '\\Service Group B',
                    },
                },
                'Release Pipeline B': {
                    deployment: {
                        id: 367,
                        requestIdentifier: '96c8b0c9-7d8b-42fa-87d0-0044bfb1e1b9.dev.dev',
                        environmentId: 5,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: '96c8b0c9-7d8b-42fa-87d0-0044bfb1e1b9',
                        stageName: 'dev',
                        jobName: 'dev',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=69',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/69',
                                },
                            },
                            id: 69,
                            name: 'Release Pipeline B',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3922',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/3922',
                                },
                            },
                            id: 3922,
                            name: '20240717.1',
                        },
                        result: 3,
                        queueTime: '2024-07-17T04:21:00.083Z',
                        startTime: '2024-07-17T04:21:00.210Z',
                        finishTime: '2024-07-17T04:21:16.983Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/69?revision=2',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=69',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/69?revision=2',
                        id: 69,
                        revision: 2,
                        name: 'Release Pipeline B',
                        folder: '\\Service Group A',
                    },
                },
                'Release Pipeline C': {
                    deployment: {
                        id: 363,
                        requestIdentifier: 'c4a9b6ef-3c64-4730-a378-9cff1dfb6b74.dev.dev',
                        environmentId: 5,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: 'c4a9b6ef-3c64-4730-a378-9cff1dfb6b74',
                        stageName: 'dev',
                        jobName: 'dev',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=71',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/71',
                                },
                            },
                            id: 71,
                            name: 'Release Pipeline C',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3915',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/3915',
                                },
                            },
                            id: 3915,
                            name: '20240715.2',
                        },
                        result: 0,
                        queueTime: '2024-07-15T03:36:43.763Z',
                        startTime: '2024-07-15T03:36:43.870Z',
                        finishTime: '2024-07-15T03:37:07.730Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/71?revision=3',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=71',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/71?revision=3',
                        id: 71,
                        revision: 3,
                        name: 'Release Pipeline C',
                        folder: '\\Service Group B\\Critical Services',
                    },
                },
                'Release Pipeline A': {
                    deployment: {
                        id: 356,
                        requestIdentifier: '8005d05a-705b-4412-96b1-314459c370f8.dev.dev',
                        environmentId: 5,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: '8005d05a-705b-4412-96b1-314459c370f8',
                        stageName: 'dev',
                        jobName: 'dev',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=68',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/68',
                                },
                            },
                            id: 68,
                            name: 'Release Pipeline A',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3912',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/3912',
                                },
                            },
                            id: 3912,
                            name: '20240715.1',
                        },
                        result: 0,
                        queueTime: '2024-07-15T03:21:24.883Z',
                        startTime: '2024-07-15T03:21:25.026Z',
                        finishTime: '2024-07-15T03:22:05.226Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/68?revision=2',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=68',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/68?revision=2',
                        id: 68,
                        revision: 2,
                        name: 'Release Pipeline A',
                        folder: '\\Service Group A',
                    },
                },
                'Sample Pipeline 1': {
                    deployment: {
                        id: 132,
                        requestIdentifier: 'a6df6163-2cc7-41bc-83f9-f84fa23d7dbe.dev.dev',
                        environmentId: 5,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: 'a6df6163-2cc7-41bc-83f9-f84fa23d7dbe',
                        stageName: 'dev',
                        jobName: 'dev',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=22',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/22',
                                },
                            },
                            id: 22,
                            name: 'Sample Pipeline 1',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=919',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/919',
                                },
                            },
                            id: 919,
                            name: '20221209.28',
                        },
                        result: 0,
                        queueTime: '2022-12-09T03:04:50.986Z',
                        startTime: '2022-12-09T03:04:51.080Z',
                        finishTime: '2022-12-09T03:06:59.406Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/22?revision=4',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=22',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/22?revision=4',
                        id: 22,
                        revision: 4,
                        name: 'Sample Pipeline 1',
                        folder: '\\',
                    },
                },
            },
        },
        {
            name: 'Preprod',
            pipeline: {
                'Release Pipeline C': {
                    deployment: {
                        id: 364,
                        requestIdentifier: 'c4a9b6ef-3c64-4730-a378-9cff1dfb6b74.preprod.preprod',
                        environmentId: 17,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: 'c4a9b6ef-3c64-4730-a378-9cff1dfb6b74',
                        stageName: 'preprod',
                        jobName: 'preprod',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=71',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/71',
                                },
                            },
                            id: 71,
                            name: 'Release Pipeline C',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3915',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/3915',
                                },
                            },
                            id: 3915,
                            name: '20240715.2',
                        },
                        result: 0,
                        queueTime: '2024-07-15T03:37:09.210Z',
                        startTime: '2024-07-15T03:37:09.280Z',
                        finishTime: '2024-07-15T03:37:22.430Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/71?revision=3',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=71',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/71?revision=3',
                        id: 71,
                        revision: 3,
                        name: 'Release Pipeline C',
                        folder: '\\Service Group B\\Critical Services',
                    },
                },
            },
        },
        {
            name: 'Prod',
            pipeline: {
                'Release Pipeline C': {
                    deployment: {
                        id: 366,
                        requestIdentifier: 'c4a9b6ef-3c64-4730-a378-9cff1dfb6b74.prod.prod',
                        environmentId: 7,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: 'c4a9b6ef-3c64-4730-a378-9cff1dfb6b74',
                        stageName: 'prod',
                        jobName: 'prod',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=71',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/71',
                                },
                            },
                            id: 71,
                            name: 'Release Pipeline C',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3915',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/3915',
                                },
                            },
                            id: 3915,
                            name: '20240715.2',
                        },
                        result: 0,
                        queueTime: '2024-07-15T03:41:21.650Z',
                        startTime: '2024-07-15T03:41:21.740Z',
                        finishTime: '2024-07-15T03:41:36.970Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/71?revision=3',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=71',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/71?revision=3',
                        id: 71,
                        revision: 3,
                        name: 'Release Pipeline C',
                        folder: '\\Service Group B\\Critical Services',
                    },
                },
                OldDashboard: {
                    deployment: {
                        id: 89,
                        requestIdentifier: '54c03ded-a0de-4393-93c4-3fdfa86faed8.prod.prod',
                        environmentId: 7,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: '54c03ded-a0de-4393-93c4-3fdfa86faed8',
                        stageName: 'prod',
                        jobName: 'prod',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=23',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/23',
                                },
                            },
                            id: 23,
                            name: 'OldDashboard',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=879',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/879',
                                },
                            },
                            id: 879,
                            name: '20221209.2',
                        },
                        result: 0,
                        queueTime: '2022-12-09T00:13:08.496Z',
                        startTime: '2022-12-09T00:13:08.620Z',
                        finishTime: '2022-12-09T00:13:23.486Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/23?revision=1',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=23',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/23?revision=1',
                        id: 23,
                        revision: 1,
                        name: 'OldDashboard',
                        folder: '\\',
                    },
                },
                'Sample Pipeline 1': {
                    deployment: {
                        id: 80,
                        requestIdentifier: 'da6664e7-60e6-4c29-8f46-09f56e40c26e.prod',
                        environmentId: 7,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: 'da6664e7-60e6-4c29-8f46-09f56e40c26e',
                        stageName: '__default',
                        jobName: 'prod',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=22',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/22',
                                },
                            },
                            id: 22,
                            name: 'Sample Pipeline 1',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=873',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/873',
                                },
                            },
                            id: 873,
                            name: '20221209.3',
                        },
                        result: 0,
                        queueTime: '2022-12-08T23:53:07.070Z',
                        startTime: '2022-12-08T23:53:07.173Z',
                        finishTime: '2022-12-08T23:53:23.136Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/22?revision=4',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=22',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/22?revision=4',
                        id: 22,
                        revision: 4,
                        name: 'Sample Pipeline 1',
                        folder: '\\',
                    },
                },
            },
        },
        {
            name: 'Test',
            pipeline: {
                'Release Pipeline B': {
                    deployment: {
                        id: 359,
                        requestIdentifier: 'f5ce82cb-efee-44cb-9d92-8ab2731b7941.test.test',
                        environmentId: 6,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: 'f5ce82cb-efee-44cb-9d92-8ab2731b7941',
                        stageName: 'test',
                        jobName: 'test',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=69',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/69',
                                },
                            },
                            id: 69,
                            name: 'Release Pipeline B',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3913',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/3913',
                                },
                            },
                            id: 3913,
                            name: '20240715.1',
                        },
                        result: 0,
                        queueTime: '2024-07-15T03:22:29.676Z',
                        startTime: '2024-07-15T03:22:29.793Z',
                        finishTime: '2024-07-15T03:23:17.250Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/69?revision=2',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=69',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/69?revision=2',
                        id: 69,
                        revision: 2,
                        name: 'Release Pipeline B',
                        folder: '\\Service Group A',
                    },
                },
                'Release Pipeline A': {
                    deployment: {
                        id: 358,
                        requestIdentifier: '8005d05a-705b-4412-96b1-314459c370f8.test.test',
                        environmentId: 6,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: '8005d05a-705b-4412-96b1-314459c370f8',
                        stageName: 'test',
                        jobName: 'test',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=68',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/68',
                                },
                            },
                            id: 68,
                            name: 'Release Pipeline A',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3912',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/3912',
                                },
                            },
                            id: 3912,
                            name: '20240715.1',
                        },
                        result: 0,
                        queueTime: '2024-07-15T03:22:06.550Z',
                        startTime: '2024-07-15T03:22:06.616Z',
                        finishTime: '2024-07-15T03:22:52.186Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/68?revision=2',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=68',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/68?revision=2',
                        id: 68,
                        revision: 2,
                        name: 'Release Pipeline A',
                        folder: '\\Service Group A',
                    },
                },
                'Sample Pipeline 1': {
                    deployment: {
                        id: 133,
                        requestIdentifier: 'a6df6163-2cc7-41bc-83f9-f84fa23d7dbe.test.test',
                        environmentId: 6,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: 'a6df6163-2cc7-41bc-83f9-f84fa23d7dbe',
                        stageName: 'test',
                        jobName: 'test',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=22',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/22',
                                },
                            },
                            id: 22,
                            name: 'Sample Pipeline 1',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=919',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/919',
                                },
                            },
                            id: 919,
                            name: '20221209.28',
                        },
                        result: 0,
                        queueTime: '2022-12-09T03:07:00.763Z',
                        startTime: '2022-12-09T03:07:00.853Z',
                        finishTime: '2022-12-09T03:08:30.663Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/22?revision=4',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=22',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/22?revision=4',
                        id: 22,
                        revision: 4,
                        name: 'Sample Pipeline 1',
                        folder: '\\',
                    },
                },
                OldDashboard: {
                    deployment: {
                        id: 88,
                        requestIdentifier: '54c03ded-a0de-4393-93c4-3fdfa86faed8.test.test',
                        environmentId: 6,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: '54c03ded-a0de-4393-93c4-3fdfa86faed8',
                        stageName: 'test',
                        jobName: 'test',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=23',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/23',
                                },
                            },
                            id: 23,
                            name: 'OldDashboard',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=879',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/879',
                                },
                            },
                            id: 879,
                            name: '20221209.2',
                        },
                        result: 0,
                        queueTime: '2022-12-09T00:12:31.800Z',
                        startTime: '2022-12-09T00:12:31.910Z',
                        finishTime: '2022-12-09T00:12:59.960Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/23?revision=1',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=23',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/23?revision=1',
                        id: 23,
                        revision: 1,
                        name: 'OldDashboard',
                        folder: '\\',
                    },
                },
            },
        },
        {
            name: 'UAT',
            pipeline: {
                ReleaseDashboard: {
                    deployment: {
                        id: 369,
                        requestIdentifier: '7491a830-0f89-40f1-9c2f-ed5f3daed836.uat.uat',
                        environmentId: 15,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: '7491a830-0f89-40f1-9c2f-ed5f3daed836',
                        stageName: 'uat',
                        jobName: 'uat',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=72',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/72',
                                },
                            },
                            id: 72,
                            name: 'ReleaseDashboard',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3923',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/3923',
                                },
                            },
                            id: 3923,
                            name: '20240717.1',
                        },
                        result: 2,
                        queueTime: '2024-07-17T04:36:04.700Z',
                        startTime: '2024-07-17T04:36:04.793Z',
                        finishTime: '2024-07-17T04:36:31.850Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/72?revision=3',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=72',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/72?revision=3',
                        id: 72,
                        revision: 3,
                        name: 'Release Pipeline D',
                        folder: '\\Service Group B',
                    },
                },
                'Release Pipeline C': {
                    deployment: {
                        id: 365,
                        requestIdentifier: 'c4a9b6ef-3c64-4730-a378-9cff1dfb6b74.uat.uat',
                        environmentId: 15,
                        serviceOwner: '00025394-6065-48ca-87d9-7f5672854ef7',
                        scopeId: '058870c3-3e26-462c-95d6-15749bcea90e',
                        planType: 'Build',
                        planId: 'c4a9b6ef-3c64-4730-a378-9cff1dfb6b74',
                        stageName: 'uat',
                        jobName: 'uat',
                        stageAttempt: 1,
                        jobAttempt: 1,
                        definition: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=71',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Definitions/71',
                                },
                            },
                            id: 71,
                            name: 'Release Pipeline C',
                        },
                        owner: {
                            _links: {
                                web: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3915',
                                },
                                self: {
                                    href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/build/Builds/3915',
                                },
                            },
                            id: 3915,
                            name: '20240715.2',
                        },
                        result: 0,
                        queueTime: '2024-07-15T03:37:09.210Z',
                        startTime: '2024-07-15T03:37:09.280Z',
                        finishTime: '2024-07-15T03:37:48.856Z',
                    },
                    pipeline: {
                        _links: {
                            self: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/71?revision=3',
                            },
                            web: {
                                href: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=71',
                            },
                        },
                        url: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_apis/pipelines/71?revision=3',
                        id: 71,
                        revision: 3,
                        name: 'Release Pipeline C',
                        folder: '\\Service Group B\\Critical Services',
                    },
                },
            },
        },
    ],
    pipelines: [
        {
            key: 'Release Pipeline E',
            name: 'Release Pipeline E',
            environments: {
                Dev: {
                    value: '20240717.1',
                    finishTime: new Date(1721014642430),
                    result: 2,
                    folder: '\\Service Group A',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3924',
                },
            },
            uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=73',
        },
        {
            key: 'ReleaseDashboard',
            name: 'Release Pipeline D',
            environments: {
                Dev: {
                    value: '20240717.1',
                    finishTime: new Date(1721014642430),
                    result: 0,
                    folder: '\\Service Group B',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3923',
                },
                UAT: {
                    value: '20240717.1',
                    finishTime: new Date(1721014642430),
                    result: 2,
                    folder: '\\Service Group B',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3923',
                },
            },
            uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=72',
        },
        {
            key: 'Release Pipeline B',
            name: 'Release Pipeline B',
            environments: {
                Dev: {
                    value: '20240717.1',
                    finishTime: new Date(1721014642430),
                    result: 3,
                    folder: '\\Service Group A',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3922',
                },
                Test: {
                    value: '20240715.1',
                    finishTime: new Date(1721014642430),
                    result: 0,
                    folder: '\\Service Group A',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3913',
                },
            },
            uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=69',
        },
        {
            key: 'Release Pipeline C',
            name: 'Release Pipeline C',
            environments: {
                Dev: {
                    value: '20240715.2',
                    finishTime: new Date(1721014642430),
                    result: 0,
                    folder: '\\Service Group B\\Critical Services',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3915',
                },
                Preprod: {
                    value: '20240715.2',
                    finishTime: new Date(1721014642430),
                    result: 0,
                    folder: '\\Service Group B\\Critical Services',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3915',
                },
                Prod: {
                    value: '20240715.2',
                    finishTime: new Date(1721014642430),
                    result: 0,
                    folder: '\\Service Group B\\Critical Services',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3915',
                },
                UAT: {
                    value: '20240715.2',
                    // finishTime is undefined because deployment can be in progress.
                    result: 0,
                    folder: '\\Service Group B\\Critical Services',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3915',
                },
            },
            uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=71',
        },
        {
            key: 'Release Pipeline A',
            name: 'Release Pipeline A',
            environments: {
                Dev: {
                    value: '20240715.1',
                    finishTime: new Date(1721014642430),
                    result: 0,
                    folder: '\\Service Group A',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3912',
                },
                Test: {
                    value: '20240715.1',
                    finishTime: new Date(1721014642430),
                    result: 0,
                    folder: '\\Service Group A',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=3912',
                },
            },
            uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=68',
        },
        {
            key: 'Sample Pipeline 1',
            name: 'Sample Pipeline 1',
            environments: {
                Dev: {
                    value: '20221209.28',
                    finishTime: new Date(1721014642430),
                    result: 0,
                    folder: '\\',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=919',
                },
                Prod: {
                    value: '20221209.3',
                    finishTime: new Date(1721014642430),
                    result: 0,
                    folder: '\\',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=873',
                },
                Test: {
                    value: '20221209.28',
                    finishTime: new Date(1721014642430),
                    result: 0,
                    folder: '\\',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=919',
                },
            },
            uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=22',
        },
        {
            key: 'OldDashboard',
            name: 'OldDashboard',
            environments: {
                Prod: {
                    value: '20221209.2',
                    finishTime: new Date(1721014642430),
                    result: 0,
                    folder: '\\',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=879',
                },
                Test: {
                    value: '20221209.2',
                    finishTime: new Date(1721014642430),
                    result: 0,
                    folder: '\\',
                    uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/results?buildId=879',
                },
            },
            uri: 'https://dev.azure.com/sixpivot/058870c3-3e26-462c-95d6-15749bcea90e/_build/definition?definitionId=23',
        },
    ],
    isLoading: false,
    project: 'ReleaseDashboard',
    organisation: 'sixpivot',
}
