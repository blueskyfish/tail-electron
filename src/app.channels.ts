
/**
 * The app channels names
 *
 * * Backend channels, that are recevie in the frontend has the prefix `tail.backend`.
 * * Fronten changels, that are sending to the backend has the prefix `tail.frontend`.
 */
export class AppChannels {

  static readonly CHANNEL_BACKEND_SETTING    = 'tail.backend.setting';

  static readonly CHANNEL_FRONTEND_READY     = 'tail.frontend.ready';
  static readonly CHANNEL_FRONTEND_SETTING   = 'tail.frontend.setting';
}

