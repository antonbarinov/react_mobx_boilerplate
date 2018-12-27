import { observable } from 'mobx';
import { fetch } from 'whatwg-fetch';

const perPage = 30;

const sleep = (ms) => new Promise(resolve => setTimeout(() => resolve(), ms));

class State {
    @observable tabs = [];
    tabNextId = 1;
    tabTypes = {
        Users: 'Users',
        Repositories: 'Repositories',
    };

    newTab(tabType) {
        if (this.tabTypes[tabType] === undefined) throw 'Invalid tab type';

        for (const tab of this.tabs) {
            tab.active = false;
        }

        const tab = {
            id: this.tabNextId,
            tabData: {
                searchQuery: '',
                filtersData: {},
                isDataFetching: false,
                actualFetchDataIndex: 0,
                data: [],
            },
            pagination: {
                page: 1,
                pages: 1,
                itemsCount: 0,
            },
            active: true,
            isTabVirgin: true,
            tabType,
        };
        this.tabs.push(tab);

        //this.getDataForTab(this.tabNextId).catch(console.error);

        this.tabNextId++;
    }

    switchTab(tabId) {
        for (const tab of this.tabs) {
            tab.active = tab.id === tabId;
        }
    }

    getTabFilters(tabId) {
        return this.tabs.filter(tab => tab.id === tabId)[0].tabData.filtersData;
    }

    async updateTabFilters(tabId, filtersData) {
        for (let tab of this.tabs) {
            if (tab.id === tabId) {
                tab.tabData.filtersData = filtersData;
                tab.pagination.page = 1;
                await this.getDataForTab(tabId);

                break;
            }
        }
    }

    async updateTabSearchQuery(tabId, searchQuery) {
        for (let tab of this.tabs) {
            if (tab.id === tabId) {
                tab.tabData.searchQuery = searchQuery;
                tab.pagination.page = 1;
                await this.getDataForTab(tabId);

                break;
            }
        }
    }

    async getDataForTab(tabId) {
        for (let tab of this.tabs) {
            if (tab.id === tabId) {
                const { filtersData } = tab.tabData;
                let filters = [];
                let val, basicUrl;

                /**
                 * Repositories
                 */
                if (tab.tabType === this.tabTypes.Repositories) {
                    val = filtersData.minStars;
                    if (val && val.length && val >= 0) {
                        filters.push(`stars:>=${val}`);
                    } else {
                        filters.push(`stars:>=0`); // Because of github bug if choose only "fork" filter
                    }

                    val = filtersData.minForks;
                    if (val && val.length && val >= 0) {
                        filters.push(`forks:>=${val}`);
                    }

                    val = filtersData.forks;
                    if (val === 'yes') {
                        filters.push(`fork:only`);
                    } else if (val === 'no') {
                        filters.push(`fork:false`);
                    }
                    else if (val === 'all') {
                        filters.push(`fork:true`);
                    }

                    basicUrl = 'https://api.github.com/search/repositories?q=';
                }
                /**
                 * Users
                 */
                else if (tab.tabType === this.tabTypes.Users) {
                    val = filtersData.minRepos;
                    if (val && val.length && val >= 0) {
                        filters.push(`repos:>=${val}`);
                    } else {
                        filters.push(`repos:>=0`);
                    }

                    val = filtersData.minFollowers;
                    if (val && val.length && val >= 0) {
                        filters.push(`followers:>=${val}`);
                    }

                    basicUrl = 'https://api.github.com/search/users?q=';
                }


                // Send request
                let queryString = '';
                if (tab.tabData.searchQuery) queryString += tab.tabData.searchQuery;
                if (filters.length) {
                    if (queryString.length > 0) queryString += ' ';
                    queryString += filters.join(' ');
                }

                const { page } = tab.pagination;
                queryString += `&page=${page}&per_page=${perPage}`;

                const actualFetchDataIndex = ++tab.tabData.actualFetchDataIndex;

                tab.tabData.isDataFetching = true;

                await sleep(500); // Send request only after 500ms delay on last filter change
                if (actualFetchDataIndex !== tab.tabData.actualFetchDataIndex) break;

                let response = await fetch(basicUrl + queryString);
                if (response.status === 200) {
                    // In case if we send multiple requests in progress
                    if (actualFetchDataIndex === tab.tabData.actualFetchDataIndex) {
                        const resultJson = await response.json();
                        tab.tabData.data = resultJson.items;
                        tab.pagination.itemsCount = resultJson.total_count;
                        tab.pagination.pages = Math.ceil(resultJson.total_count / perPage);
                    }
                } else {
                    alert(`Github api error`);
                }

                // In case if we send multiple requests in progress
                if (actualFetchDataIndex === tab.tabData.actualFetchDataIndex) {
                    tab.tabData.isDataFetching = false;
                }

                tab.isTabVirgin = false;

                break;
            }
        }
    }

    changePage(tabId, page) {
        for (let tab of this.tabs) {
            if (tab.id === tabId) {
                tab.pagination.page = page;
                this.getDataForTab(tabId).catch(console.error);

                break;
            }
        }
    }

    removeTab(tabId) {
        if (this.tabs.length === 1) {
            this.tabs = [];
        } else if (this.tabs.length > 1) {
            let index = 0;
            let tabIndex = 0;
            let isTabActive = false;
            for (const tab of this.tabs) {
                if (tab.id === tabId) {
                    tabIndex = index;
                    isTabActive = tab.active;
                    break;
                }
                index++;
            }

            if (isTabActive) {
                if (tabIndex === 0) {
                    this.tabs[1].active = true;
                } else {
                    this.tabs[tabIndex - 1].active = true;
                }
            }

            this.tabs.splice(tabIndex, 1);
        }
    }
}

export default new State();
