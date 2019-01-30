# Problem

Can't use back button on browser. See https://github.com/supasate/connected-react-router/issues/36 and https://github.com/supasate/connected-react-router/issues/41 for explanation.

# How to fix

In `node_modules/connected-react-router/esm/ConnectedRouter.js`, change the line

```
// If we do time travelling, the location in store is changed but location in history is not changed
if (pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInHistory !== hashInStore) { <-- this line
  this.inTimeTravelling = true
```

to

```
// If we do time travelling, the location in store is changed but location in history is not changed
if (false && (pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInHistory !== hashInStore)) {
  this.inTimeTravelling = true
```
