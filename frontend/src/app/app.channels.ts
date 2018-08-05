
/**
 * The app channels names
 *
 * * Backend channels, that are recevie in the frontend has the prefix `elan.backend`.
 * * Fronten changels, that are sending to the backend has the prefix `elan.frontend`.
 */
export class AppChannels {

  static readonly CHANNEL_BACKEND_SETTING    = 'elan.backend.setting';

  static readonly CHANNEL_FRONTEND_READY     = 'elan.frontend.ready';
  static readonly CHANNEL_FRONTEND_SETTING   = 'elan.frontend.setting';
}

