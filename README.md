# React.js + MobX boilerplate

## Main features
- React 16.9+
- MobX 5.13+
- React-MobX 6.1+
- Webpack 4.39+
- Babel 7.5+
- React Hot Loader
- Custom reactive and user friendly MobX based router
- Offline mode
- Authorization
- Forms validation helpers
- Real API requests to backend
- Basic layout (auth and main) with dynamic header and footer
- Production build with separate vendors modules and app bundle

### What this example can do?
- Work in offline (uncomment service worker register in index.jsx)
- Sign up page and logic
- Sign in page and logic
- Profile page
- Main page
- Logout


## Rules and basics
1) Use functional components with hooks. Don't use class components in this project.

2) All components must be wrapped into `observer`, this can be imported like this `import { observer } from 'mobx-react';`

3) All components inside functional components must be wrapped into `useWrappedComponent`;

4) All mutations of `observable` objects/arrays must be used `mutateObject` function. MobX is mutable, not immutable. Examples:
  
```
import { observable, action, runInAction } from 'mobx';
import mutateObject from 'helpers/mutateObject';

class SomeState {
    @observable someData = {
        a: 1,
        b: 2
    };
    @observable isFetching = false;
    @observable serverError = null;
    @observable items = [];

    @action
    fetchData = async () => {
        const result = await someApiRequest(); // Fetch items from server
        this.items = result; // BAD
        mutateObject(this.items, result); // GOOD
    };

    @action
    action1 = () => {
        // We need to this.someData = { a: 2 }
        this.someData = { a: 2 }; // BAD
        mutateObject(this.someData, { a: 2 }); // GOOD
    };

    @action
    action2 = () => {
        // We need to modify this.someData and keep properties

        // BAD
        this.someData = {
            ...this.someData,
            a: 2,
            c: 4
        };

        // GOOD
        mutateObject(this.someData, { a: 2, c: 4 }, true);
    };

    @action
    realOptimizedApiRequest = async () => {
        // Before async calls state changes batched by default when wrapped in @action
        this.isFetching = true;

        // After async calls components will be re-render without batching if we
        try {
            const response = await someApiRequest(); // Fetch items from server
            // Batch state changes for call render only once (this need only after async calls)
            runInAction(() => {
                mutateObject(this.items, response.items);
                this.isFetching = false;
            });
        } catch (e) {
            // Batch state changes for call render only once (this need only after async calls)
            runInAction(() => {
                this.serverError = e.message || 'Something went wrong';
                this.isFetching = false;
            });
        }
    }
}
```


## Run
```
npm i -g yarn
yarn install
yarn start
```
Browser will be opened

## Build
```
yarn run build:prod
yarn run build:dev
```