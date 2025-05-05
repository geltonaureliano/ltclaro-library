import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

export async function setupOpenTelemetry() {
  const serviceName = process.env.SERVICE_NAME ?? 'library';
  
  const prometheusExporter = new PrometheusExporter({
    port: parseInt(process.env.METRICS_PORT ?? '9464'),
  });

  const traceExporter = new OTLPTraceExporter({
    url: process.env.OTLP_ENDPOINT ?? 'http://localhost:4318/v1/traces',
  });

  const sdk = new NodeSDK({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      [SemanticResourceAttributes.SERVICE_VERSION]: process.env.npm_package_version ?? '1.0.0',
      environment: process.env.NODE_ENV ?? 'development',
    }),
    traceExporter,
    metricReader: prometheusExporter,
    instrumentations: [
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': { enabled: false },
        '@opentelemetry/instrumentation-http': { enabled: true },
        '@opentelemetry/instrumentation-express': { enabled: true },
        '@opentelemetry/instrumentation-nestjs-core': { enabled: true },
      }),
    ],
  });

  try {
    await sdk.start();
    console.log('OpenTelemetry initialized successfully');
    
    process.on('SIGTERM', () => {
      sdk.shutdown()
        .then(() => console.log('SDK shut down successfully'))
        .catch((error) => console.log('Error shutting down SDK', error))
        .finally(() => process.exit(0));
    });
    
    return sdk;
  } catch (error) {
    console.error('Error initializing OpenTelemetry', error);
    throw error;
  }
} 