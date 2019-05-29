import { hello } from '../main';
import { logger } from '@iinfinity/logger';

logger.info(hello('TypeScript template'));

logger.debug('debug');
logger.error('error');
logger.info('info');
logger.warn('warn');
