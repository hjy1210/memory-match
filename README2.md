
## Caution
In section [State Updates May Be Asynchronous](https://facebook.github.io/react/docs/state-and-lifecycle.html) mentioned: react may batch multiple setState() calls into a single update for performance.

The code in onClick(i) call setState() four times, I guess it cause the issue:
`if (this.state.pairs.length===2)...` execute before `let x=[...prevState.pairs,i]`.

## Avoid Reconciliation
// https://facebook.github.io/react/docs/optimizing-performance.html
// Use PureComponent instead Component to avoid unnecessary reconciliation to speed up rendering.
// Key point : don't mutate original state when produce new state.

## second papareter of setState is a call back function

