## Keep account state up to date

Use REST to submit orders and private WebSocket subscriptions to follow what happens next. Order, fill, balance and position events update your application's account state as changes occur.

1. Connect the private streams and watch for subscription acknowledgements or errors before submitting orders. Load any starting state the streams do not provide, and account for events received while that data loads.
2. Submit the order through REST. Save the returned IDs and inspect the response for errors or immediate results. An acknowledgement alone does not establish the order's later state.
3. Apply matching WebSocket events to local state. Use order and fill events to track execution, and balance or position updates for the account changes your application needs. These events can arrive separately.
4. Use REST to fill a specific gap: startup data, updates missed during a disconnect, conflicting events, or an outcome that neither the response nor the stream has resolved. Once account state is current, continue applying WebSocket updates.

Do not query REST after every submission or poll it while the required streams are healthy and complete. A quiet stream can mean nothing has changed. Check connection and subscription health separately from account activity.

### Trigger follow-up work from position changes

Where the exchange and market provide position updates, they are useful triggers for follow-up logic. For example, when a position opens or increases, use its updated size to place or adjust stop-loss and take-profit (SL/TP) orders. Compare the previous and current position state; receiving another position message does not necessarily mean the position changed.

For signed position sizes, compare absolute exposure within the same direction and handle a direction change separately. Also resize or cancel obsolete protection when exposure shrinks or the position closes.

Debounce bursts of partial-fill updates to reduce API calls, and set a maximum wait so continuous updates cannot postpone adjustments indefinitely. Choose the debounce delay and maximum wait to fit the exchange's rate limits and the delay your strategy can tolerate.

When applying an adjustment:

- Check stream health and use the latest reconciled position and order state.
- Process changes for the same position sequentially and skip adjustments that are already satisfied.
- Pause dependent adjustments while recovering account state.
- Include the account, market and position side in state keys where applicable.

### Recover after a connection gap

Use the SDK's reconnect lifecycle events to mark affected state as stale when connection recovery starts and to trigger REST reconciliation when the socket reopens. The event names differ by SDK; see the recovery section below. A reopened socket does not prove that authentication, subscriptions or account-state recovery are complete.

Confirm the required streams are healthy, load any missed order, fill, balance or position state, and account for updates received during those reads. Then compare current positions and open orders with the intended state and create, amend or cancel orders only where needed, including SL/TP orders. Resolve uncertain requests before submitting replacements so recovery does not create duplicates. Resume dependent actions once their required state is current.

See [Account State](https://siebly.io/reference/glossary#accountstate) for the full workflow. The [private stream guide](/guides/private-streams) shows how to receive updates; the examples print events rather than maintain a complete account-state store.
