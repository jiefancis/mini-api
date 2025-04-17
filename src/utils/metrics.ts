import * as client from 'prom-client';

const ApiMetrics = new client.Histogram({
  name: 'mini_api_histogram',
  help: 'mini_api_histogram',
  labelNames: ['api', 'method', 'status', 'code', 'env'],
});

const ConsumerMetrics = new client.Counter({
  name: 'meetcoin_consumer_counter',
  help: 'meetcoin_consumer_counter',
  labelNames: ['event_type', 'env'],
});

function ObserveApi(ctx, seconds) {
  const { url, method, status, body } = ctx;

  const labels = {
    api: url.split('?')[0],
    method: method,
    status: status,
    code: body ? body.code : status,
    env: process.env.NODE_ENV,
  };

  ApiMetrics.observe(labels, seconds);
}

function CountConsumeEvent(event_type) {
  ConsumerMetrics.inc({ event_type, env: process.env.NODE_ENV });
}

async function Metrics() {
  try {
    return client.register.metrics();
  } catch (err) {
    return '';
  }
}
export { ObserveApi, CountConsumeEvent, Metrics };
